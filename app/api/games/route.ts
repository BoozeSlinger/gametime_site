import { NextResponse } from 'next/server';

const LEAGUE_IDS = {
  NFL: '4391',
  NBA: '4387',
  MLB: '4424',
  NHL: '4380',
};

export interface GameData {
  strHomeTeam: string;
  strAwayTeam: string;
  dateEvent: string;
  strTime: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  idEvent?: string;
}

export interface SportsGamesResponse {
  sport: string;
  games: GameData[];
}

// ISR: revalidate every hour (3600 seconds)
export const revalidate = 3600;

export async function GET() {
  try {
    const sports = Object.entries(LEAGUE_IDS);

    const results = await Promise.all(
      sports.map(async ([sport, leagueId]) => {
        const url = `https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=${leagueId}`;

        try {
          const response = await fetch(url, {
            next: { revalidate: 3600 },
          });

          if (!response.ok) {
            console.warn(`Failed to fetch ${sport} games: ${response.status}`);
            return {
              sport,
              games: [],
            };
          }

          const data = await response.json();

          // Handle different response formats
          const games = (Array.isArray(data) ? data : data.results || []).filter(
            (g: GameData) => g.strHomeTeam && g.strAwayTeam && g.dateEvent
          );

          return {
            sport,
            games,
          };
        } catch (error) {
          console.error(`Error fetching ${sport} games:`, error);
          return {
            sport,
            games: [],
          };
        }
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching sports games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}
