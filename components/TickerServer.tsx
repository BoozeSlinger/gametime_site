import { Suspense } from 'react';
import { getGameItems } from '@/lib/getGames';
import Ticker from './Ticker';
import TickerSkeleton from './TickerSkeleton';

async function TickerContent() {
  const items = await getGameItems();
  return <Ticker items={items} />;
}

export default function TickerServer() {
  return (
    <Suspense fallback={<TickerSkeleton />}>
      <TickerContent />
    </Suspense>
  );
}
