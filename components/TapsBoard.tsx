'use client';

import { useEffect, useState, useCallback } from 'react';
import { useVibe } from '@/context/VibeContext';

// ─── TAPS (static) ───────────────────────────────────────────────────────────
interface TapItem {
  name: string;
  brewery: string;
  style: string;
  abv: string;
}

const TAPS: TapItem[] = [
  { name: 'CHAMPION IPA',  brewery: 'Local Craft Co.',   style: 'IPA',       abv: '6.8%' },
  { name: 'GOLDEN LAGER',  brewery: 'Sunrise Brewing',   style: 'Lager',     abv: '4.5%' },
  { name: 'DARK STOUT',    brewery: 'Iron Barrel',       style: 'Stout',     abv: '7.2%' },
  { name: 'WHEAT HAZE',    brewery: 'Valley Hop Works',  style: 'Wheat',     abv: '5.1%' },
  { name: 'RED RYDER ALE', brewery: 'Red Rock Brew',     style: 'Amber Ale', abv: '5.8%' },
  { name: 'SESSION LIGHT', brewery: 'City Lager Co.',    style: 'Light',     abv: '3.9%' },
  { name: 'SOUR KETTLE',   brewery: 'East End Brewing',  style: 'Sour',      abv: '6.1%' },
  { name: 'PORTER #12',    brewery: 'Oak & Smoke',       style: 'Porter',    abv: '6.5%' },
];

// ─── SCHEDULE TYPES ──────────────────────────────────────────────────────────
interface Game {
  id: string;
  sport: string;
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

const SPORT_COLORS: Record<string, string> = {
  NFL:  '#C8102E',
  NBA:  '#1D428A',
  MLB:  '#002D72',
  NHL:  '#0033A0',
  EPL:  '#3D195B',
  MLS:  '#005293',
  CFB:  '#8B1020',
  NCAAM:'#C8102E',
};

const DAY_LABELS = ['Today', 'Tomorrow', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() -
     new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) /
    86400000
  );
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// ─── FLIP CHAR ───────────────────────────────────────────────────────────────
function FlipChar({ char }: { char: string }) {
  return (
    <span
      className="flip-char"
      style={{
        fontFamily: "'Anton', monospace",
        fontSize: '0.9rem',
        color: 'white',
        minWidth: '0.6em',
        display: 'inline-flex',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  );
}

function FlipText({ text }: { text: string }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {text.split('').map((ch, i) => <FlipChar key={i} char={ch} />)}
    </span>
  );
}

// ─── GAME ROW ─────────────────────────────────────────────────────────────────
function GameRow({ game, index }: { game: Game; index: number }) {
  const isLive = game.status === 'live';
  const isFinal = game.status === 'final';
  const sportColor = SPORT_COLORS[game.sport] ?? '#C8102E';

  return (
    <div
      className="game-item"
      style={{
        padding: '12px 18px',
        borderBottom: '1px solid #161616',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: isLive ? 'rgba(200,16,46,0.04)' : 'transparent',
        transition: 'background 0.2s ease',
        animationDelay: `${index * 0.075}s`,
      }}
    >
      {/* Sport badge */}
      <span
        style={{
          background: sportColor,
          color: 'white',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.5rem',
          fontWeight: 800,
          letterSpacing: '0.1em',
          padding: '2px 6px',
          borderRadius: 2,
          flexShrink: 0,
          minWidth: 36,
          textAlign: 'center',
        }}
      >
        {game.sport}
      </span>

      {/* Teams */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {game.homeScore !== null ? (
          // Score layout
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.85rem', color: 'white', letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {game.awayTeam}
            </span>
            <span style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.85rem', color: '#C8102E', flexShrink: 0 }}>
              {game.awayScore} – {game.homeScore}
            </span>
            <span style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.85rem', color: 'white', letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {game.homeTeam}
            </span>
          </div>
        ) : (
          <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.85rem', color: 'white', letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {game.teams}
          </p>
        )}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', color: '#444', marginTop: 2 }}>
          {game.channel}
        </p>
      </div>

      {/* Time / status */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        {isLive ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 700, color: '#22c55e', letterSpacing: '0.06em' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'livePulse 1.5s ease-in-out infinite', display: 'inline-block', flexShrink: 0 }} />
            {game.statusDetail || 'LIVE'}
          </span>
        ) : isFinal ? (
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: '#555', letterSpacing: '0.06em' }}>FINAL</span>
        ) : (
          <span style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.75rem', color: '#888' }}>{game.time}</span>
        )}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function TapsBoard() {
  const { isAfterHours } = useVibe();
  const [hoveredTap, setHoveredTap] = useState<number | null>(null);

  // Schedule state
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string>('Today');
  const [activeSport, setActiveSport] = useState<string>('All');

  const fetchSchedule = useCallback(async () => {
    try {
      const res = await fetch('/api/schedule');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setGames(data.games ?? []);
      setLastUpdated(data.lastUpdated);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule();
    // Auto-refresh every 5 minutes
    const id = setInterval(fetchSchedule, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchSchedule]);

  // Build day tabs from available games
  const dayGroups: Record<string, Game[]> = {};
  games.forEach((g) => {
    const label = getDayLabel(g.date);
    if (!dayGroups[label]) dayGroups[label] = [];
    dayGroups[label].push(g);
  });
  const days = Object.keys(dayGroups);

  // Available sports for active day
  const dayGames = dayGroups[activeDay] ?? games.filter((g) => getDayLabel(g.date) === 'Today');
  const sports = ['All', ...Array.from(new Set(dayGames.map((g) => g.sport)))];
  const filtered = activeSport === 'All' ? dayGames : dayGames.filter((g) => g.sport === activeSport);
  const liveCount = filtered.filter((g) => g.status === 'live').length;

  return (
    <section
      id="taps"
      style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        background: isAfterHours ? '#0a0005' : '#0f0f0f',
        transition: 'background 0.6s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <p className="quarter-label">3rd Quarter</p>
          <h2 style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1, marginBottom: 8 }}>
            TAPS &amp; GAMES
          </h2>
          <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: '#C8102E', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
            Live Tonight
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>

          {/* ── DRAFT BOARD ── */}
          <div>
            <div style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderTop: '3px solid #C8102E', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#111', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.85rem', letterSpacing: '0.2em', color: '#C8102E' }}>◼ ON TAP NOW</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#444', textTransform: 'uppercase' }}>{TAPS.length} Drafts</span>
              </div>

              {TAPS.map((tap, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredTap(i)}
                  onMouseLeave={() => setHoveredTap(null)}
                  style={{
                    padding: '12px 18px',
                    borderBottom: i < TAPS.length - 1 ? '1px solid #161616' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: hoveredTap === i ? 'rgba(200,16,46,0.06)' : 'transparent',
                    transition: 'background 0.2s ease',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.6rem', color: '#C8102E', minWidth: 18, opacity: 0.6 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.88rem', color: 'white', letterSpacing: '0.05em' }}>
                        {tap.name}
                      </p>
                      {hoveredTap === i && (
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', color: '#666', marginTop: 2 }}>
                          {tap.brewery} · {tap.style}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="abv-pill">{tap.abv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── GAMES SCHEDULE ── */}
          <div>
            <div style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderTop: '3px solid #C8102E', borderRadius: 8, overflow: 'hidden' }}>

              {/* Board header */}
              <div style={{ padding: '12px 18px', background: '#111', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.85rem', letterSpacing: '0.2em', color: '#C8102E' }}>
                  ◼ SCHEDULE
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {liveCount > 0 && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', color: '#22c55e', fontWeight: 600, letterSpacing: '0.08em' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'livePulse 1.5s ease-in-out infinite', display: 'inline-block' }} />
                      {liveCount} LIVE
                    </span>
                  )}
                  {lastUpdated && (
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', color: '#333', letterSpacing: '0.06em' }}>
                      Updated {new Date(lastUpdated).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </span>
                  )}
                  <button
                    onClick={fetchSchedule}
                    title="Refresh schedule"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#444', fontSize: '0.75rem', padding: '2px 4px', lineHeight: 1, transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C8102E'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#444'; }}
                  >
                    ↻
                  </button>
                </div>
              </div>

              {/* Day tabs */}
              {days.length > 1 && (
                <div style={{ padding: '8px 18px', borderBottom: '1px solid #1a1a1a', display: 'flex', gap: 6, overflowX: 'auto' }}>
                  {days.slice(0, 5).map((day) => (
                    <button
                      key={day}
                      onClick={() => { setActiveDay(day); setActiveSport('All'); }}
                      style={{
                        background: activeDay === day ? '#C8102E' : 'transparent',
                        border: `1px solid ${activeDay === day ? '#C8102E' : '#2a2a2a'}`,
                        color: activeDay === day ? 'white' : '#666',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: 3,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                        flexShrink: 0,
                      }}
                    >
                      {day}
                      <span style={{ marginLeft: 4, opacity: 0.6 }}>({dayGroups[day]?.length ?? 0})</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Sport filter */}
              {sports.length > 2 && (
                <div style={{ padding: '6px 18px', borderBottom: '1px solid #1a1a1a', display: 'flex', gap: 4, overflowX: 'auto' }}>
                  {sports.map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveSport(s)}
                      style={{
                        background: activeSport === s ? 'rgba(200,16,46,0.15)' : 'transparent',
                        border: `1px solid ${activeSport === s ? 'rgba(200,16,46,0.4)' : '#1e1e1e'}`,
                        color: activeSport === s ? '#C8102E' : '#555',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.55rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        padding: '3px 8px',
                        borderRadius: 2,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                        flexShrink: 0,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Games list */}
              <div style={{ maxHeight: 380, overflowY: 'auto' }}>
                {loading ? (
                  <div style={{ padding: 32, textAlign: 'center' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Loading schedule…
                    </p>
                  </div>
                ) : error ? (
                  <div style={{ padding: 24, textAlign: 'center' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#555', marginBottom: 12 }}>
                      Unable to load schedule
                    </p>
                    <button onClick={fetchSchedule} className="btn-outline" style={{ fontSize: '0.65rem', padding: '8px 16px' }}>
                      Retry <span className="btn-arrow">→</span>
                    </button>
                  </div>
                ) : filtered.length === 0 ? (
                  <div style={{ padding: 32, textAlign: 'center' }}>
                    <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                      No Games
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#333' }}>
                      Check back soon or try another day
                    </p>
                  </div>
                ) : (
                  filtered.map((game, index) => <GameRow key={game.id} game={game} index={index} />)
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
