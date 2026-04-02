'use client';

import { useState, useEffect } from 'react';
import GameScheduleSkeleton from './GameScheduleSkeleton';

interface Game {
  strHomeTeam: string;
  strAwayTeam: string;
  dateEvent: string;
  strTime: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  idEvent?: string;
}

interface SportGames {
  sport: string;
  games: Game[];
}

const SPORTS = ['NFL', 'NBA', 'MLB', 'NHL'];

/**
 * Format game time from UTC to PT timezone
 * @param dateStr - "2026-04-02" format
 * @param timeStr - "18:00:00" format in UTC
 */
const formatGameTime = (dateStr: string, timeStr: string = '00:00:00'): string => {
  try {
    const utc = new Date(`${dateStr}T${timeStr}Z`);
    return utc.toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return 'Time TBA';
  }
};

/**
 * Get today and 7 days from now
 */
const getNextSevenDays = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  return { today, nextWeek };
};

/**
 * Filter games to only those in the next 7 days
 */
const filterGamesToWeek = (games: Game[]): Game[] => {
  const { today, nextWeek } = getNextSevenDays();
  return games.filter((game) => {
    const gameDate = new Date(game.dateEvent);
    gameDate.setHours(0, 0, 0, 0);
    return gameDate >= today && gameDate <= nextWeek;
  });
};

/**
 * Team logo with fallback to emoji
 */
const TeamLogo: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <span className="text-lg">🏆</span>;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={24}
      height={24}
      onError={() => setImageError(true)}
      className="rounded object-contain"
    />
  );
};

/**
 * Single game row
 */
const GameRow: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-neutral-800 py-4 px-4 md:gap-4 md:px-6 hover:bg-neutral-800/50 transition-colors">
      {/* Home Team */}
      <div className="flex items-center gap-2 flex-1 min-w-0 md:gap-3">
        <TeamLogo src={game.strHomeTeamBadge} alt={game.strHomeTeam} />
        <span className="text-sm font-medium truncate text-neutral-100 md:text-base">
          {game.strHomeTeam}
        </span>
      </div>

      {/* VS */}
      <span className="text-xs text-neutral-500 flex-shrink-0 uppercase tracking-wide">
        vs
      </span>

      {/* Away Team */}
      <div className="flex items-center gap-2 flex-1 min-w-0 justify-end md:gap-3">
        <span className="text-sm font-medium truncate text-neutral-100 text-right md:text-base">
          {game.strAwayTeam}
        </span>
        <TeamLogo src={game.strAwayTeamBadge} alt={game.strAwayTeam} />
      </div>

      {/* Time */}
      <div className="text-xs text-neutral-400 flex-shrink-0 text-right whitespace-nowrap md:text-sm font-medium">
        {formatGameTime(game.dateEvent, game.strTime)}
      </div>
    </div>
  );
};

/**
 * Main GameSchedule Widget
 * Displays upcoming games for NFL, NBA, MLB, NHL
 * Auto-updates every hour via ISR
 */
export default function GameSchedule() {
  const [allGames, setAllGames] = useState<SportGames[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSport, setActiveSport] = useState('NFL');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/games');

        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }

        const data: SportGames[] = await response.json();
        setAllGames(data);
      } catch (err) {
        setError('Unable to load games. Please try again later.');
        console.error('GameSchedule fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();

    // Optional: Set up auto-refresh interval (e.g., every 30 minutes)
    const interval = setInterval(fetchGames, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Get games for active sport, filter to 7 days
  const activeGames = allGames.find((sg) => sg.sport === activeSport)?.games || [];
  const filteredGames = filterGamesToWeek(activeGames);

  if (loading) {
    return <GameScheduleSkeleton />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden shadow-xl">
      {/* Sport Tab Navigation */}
      <div className="flex gap-2 border-b border-neutral-800 bg-neutral-950 p-3 md:p-4">
        {SPORTS.map((sport) => (
          <button
            key={sport}
            onClick={() => setActiveSport(sport)}
            className={`px-3 py-2 md:px-4 md:py-2.5 rounded-md text-xs md:text-sm font-semibold transition-all duration-200 ${
              activeSport === sport
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Games List Container */}
      <div className="overflow-y-auto max-h-96">
        {error && (
          <div className="p-6 text-center text-red-400 text-sm font-medium bg-red-950/20 border-b border-neutral-800">
            {error}
          </div>
        )}

        {!error && filteredGames.length === 0 && (
          <div className="p-8 md:p-12 text-center text-neutral-500 text-sm">
            <p className="text-neutral-400 font-medium mb-1">No games scheduled</p>
            <p className="text-xs">Check back later for upcoming {activeSport} games</p>
          </div>
        )}

        {!error && filteredGames.length > 0 && (
          <div className="divide-y divide-neutral-800">
            {filteredGames.map((game, idx) => (
              <GameRow key={`${game.idEvent || idx}-${game.dateEvent}`} game={game} />
            ))}
          </div>
        )}
      </div>

      {/* Footer Note */}
      {!error && filteredGames.length > 0 && (
        <div className="border-t border-neutral-800 bg-neutral-950 px-4 py-2 text-center text-xs text-neutral-500">
          Times shown in Pacific Time (PT)
        </div>
      )}
    </div>
  );
}
