import { NextResponse } from 'next/server';

export const revalidate = 300; // cache 5 minutes

interface Game {
  id: string;
  sport: string;
  league: string;
  teams: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: string | null;
  awayScore: string | null;
  time: string;
  status: 'scheduled' | 'live' | 'final';
  statusDetail: string;
  channel: string;
  date: string;
}

const LEAGUES = [
  { sport: 'NFL',  path: 'football/nfl',       label: 'NFL' },
  { sport: 'NBA',  path: 'basketball/nba',      label: 'NBA' },
  { sport: 'MLB',  path: 'baseball/mlb',        label: 'MLB' },
  { sport: 'NHL',  path: 'hockey/nhl',          label: 'NHL' },
  { sport: 'EPL',  path: 'soccer/eng.1',        label: 'Premier League' },
  { sport: 'MLS',  path: 'soccer/usa.1',        label: 'MLS' },
  { sport: 'CFB',  path: 'football/college-football', label: 'College Football' },
  { sport: 'NCAAM', path: 'basketball/mens-college-basketball', label: 'College Basketball' },
];

async function fetchLeague(path: string, sportLabel: string): Promise<Game[]> {
  try {
    const url = `https://site.api.espn.com/apis/site/v2/sports/${path}/scoreboard`;
    const res = await fetch(url, {
      next: { revalidate: 300 },
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    if (!res.ok) return [];
    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.events || []).map((event: any): Game => {
      const comp = event.competitions?.[0] ?? {};
      const competitors: { team: { displayName: string; abbreviation: string }; score: string; homeAway: string }[] =
        comp.competitors ?? [];
      const home = competitors.find((c) => c.homeAway === 'home');
      const away = competitors.find((c) => c.homeAway === 'away');
      const homeTeam = home?.team?.abbreviation ?? home?.team?.displayName ?? '?';
      const awayTeam = away?.team?.abbreviation ?? away?.team?.displayName ?? '?';

      const statusType: string = event.status?.type?.name ?? '';
      const statusDetail: string = event.status?.type?.shortDetail ?? '';

      let status: Game['status'] = 'scheduled';
      if (statusType.includes('IN_PROGRESS') || statusType.includes('HALFTIME')) status = 'live';
      else if (statusType.includes('FINAL') || statusType.includes('COMPLETE')) status = 'final';

      // Parse broadcast
      const broadcasts: string[] = comp.broadcasts?.[0]?.names ?? comp.broadcasts?.[0]?.market?.names ?? [];
      const channel = broadcasts[0] ?? comp.broadcasts?.[0]?.names?.[0] ?? '—';

      // Format time
      const eventDate = new Date(event.date);
      const timeStr = status === 'live'
        ? statusDetail
        : status === 'final'
        ? `Final${statusDetail.replace('Final', '').trim() ? ` (${statusDetail.replace('Final', '').trim()})` : ''}`
        : eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short', hour12: true });

      return {
        id: event.id,
        sport: sportLabel,
        league: sportLabel,
        teams: `${awayTeam} @ ${homeTeam}`,
        homeTeam,
        awayTeam,
        homeScore: status !== 'scheduled' ? (home?.score ?? null) : null,
        awayScore: status !== 'scheduled' ? (away?.score ?? null) : null,
        time: timeStr,
        status,
        statusDetail,
        channel,
        date: event.date,
      };
    });
  } catch {
    return [];
  }
}

export async function GET() {
  const results = await Promise.all(
    LEAGUES.map((l) => fetchLeague(l.path, l.sport))
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const all = results.flat().filter((g) => {
    const d = new Date(g.date);
    return d >= today && d <= weekEnd;
  });

  // Sort: live first, then by date
  all.sort((a, b) => {
    const order = { live: 0, scheduled: 1, final: 2 };
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return NextResponse.json({
    games: all,
    lastUpdated: new Date().toISOString(),
    count: all.length,
  });
}
