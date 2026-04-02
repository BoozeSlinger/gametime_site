interface Game {
  strHomeTeam: string;
  strAwayTeam: string;
  dateEvent: string;
  strTime: string;
}

interface SportsData {
  sport: string;
  games: Game[];
}

const SPORT_ICONS = {
  NFL: '🏈',
  NBA: '🏀',
  MLB: '⚾',
  NHL: '🏒',
};

const formatGameTime = (dateStr: string, timeStr: string = '00:00:00'): string => {
  try {
    const utc = new Date(`${dateStr}T${timeStr}Z`);
    return utc.toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return 'TBA';
  }
};

const filterGamesToWeek = (games: Game[]): Game[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return games.filter((game) => {
    const gameDate = new Date(game.dateEvent);
    gameDate.setHours(0, 0, 0, 0);
    return gameDate >= today && gameDate <= nextWeek;
  });
};

export async function getGameItems(): Promise<string[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/games`,
      { next: { revalidate: 3600 } } // ISR: revalidate every hour
    );

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const sportsData: SportsData[] = await response.json();
    let gameItems: string[] = [];

    sportsData.forEach(({ sport, games }) => {
      const filtered = filterGamesToWeek(games);
      filtered.slice(0, 2).forEach((game) => {
        const icon = SPORT_ICONS[sport as keyof typeof SPORT_ICONS] || '🎮';
        const time = formatGameTime(game.dateEvent, game.strTime);
        gameItems.push(
          `${icon} ${game.strHomeTeam} vs ${game.strAwayTeam} — ${time} PT`
        );
      });
    });

    // Fallback if no games found
    if (gameItems.length === 0) {
      gameItems = [
        '🏈 Check back soon for upcoming games!',
        '🎮 All major sports coverage available',
      ];
    }

    return gameItems;
  } catch (error) {
    console.error('Error fetching games:', error);
    // Fallback content on error
    return [
      '🏈 NFL SUNDAY TICKET — ALL GAMES LIVE',
      '🏀 NBA ON TNT — BOOTH ZONE B',
      '⚾ MLB EXTRA INNINGS — PATIO SCREENS',
      '🏒 NHL CENTER ICE — EVERY NIGHT',
    ];
  }
}
