import React, { useState } from 'react';
import PredictionList from '../components/PredictionList';
import StakingInterface from '../components/StakingInterface';
import ResultTracker from '../components/ResultTracker';

const MOCK_MARKETS = [
  {
    id: '1',
    title: 'Will the Mount Kenya Nursery exceed 50,000 seedlings by June?',
    description: 'Stake on whether the target of 50k indigenous trees will be successfully cultivated by the community verification period.',
    category: 'Forestry',
    yesOdds: 65,
    noOdds: 35,
    totalVolume: '2,400.5',
    endDate: '2026-06-30'
  },
  {
    id: '2',
    title: 'Will the global AVAX carbon-offset price reach $45 this quarter?',
    description: 'Market settles based on the 7-day moving average of verified green-token assets exchanged via Avaljazz.',
    category: 'Climate',
    yesOdds: 42,
    noOdds: 58,
    totalVolume: '15,890.0',
    endDate: '2026-09-30'
  },
  {
    id: '3',
    title: 'Will 10+ Ecotourism trails be fully verified by citizens this month?',
    description: 'Requires at least 10 unique ecotourism submissions to hit the "Productized" stage on the network.',
    category: 'Ecotourism',
    yesOdds: 88,
    noOdds: 12,
    totalVolume: '540.2',
    endDate: '2026-03-31'
  }
];

const PREVIOUS_RESULTS = [
  {
    title: 'Kilifi Mangrove Restoration Target (10ha)',
    completionPercentage: 100,
    status: 'completed' as const,
    totalStaked: '4,200',
    endDate: '2026-02-28'
  },
  {
    title: 'Nairobi Urban Canopy Expansion (Phase 1)',
    completionPercentage: 84.5,
    status: 'failed' as const,
    totalStaked: '1,850',
    endDate: '2026-01-15'
  },
  {
    title: 'Aberdare Beekeeping Cooperatives Setup',
    completionPercentage: 65,
    status: 'active' as const,
    totalStaked: '890',
    endDate: '2026-05-01'
  }
];

const PredictionsPage: React.FC = () => {
  const [selectedMarket, setSelectedMarket] = useState<{ id: string; title: string; category: string; yesOdds: number; noOdds: number; } | null>(null);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-avax-border/50 pb-6 mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-avax-gold to-white mb-2">
          Prediction Markets
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Stake your AVAX on real-world green outcomes. Leverage your knowledge of community activities, 
          track climate goals, and earn rewards for accurate predictions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Markets List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-avax-green">⚡</span> Active Markets
            </h2>
          </div>
          <PredictionList 
            markets={MOCK_MARKETS} 
            onSelectMarket={setSelectedMarket} 
            selectedMarketId={selectedMarket?.id}
          />
        </div>

        {/* Right Column - Staking & Tracking */}
        <div className="space-y-8">
          {/* Staking Interface */}
          <div className="sticky top-8">
            <StakingInterface market={selectedMarket} />
          </div>
        </div>
      </div>

      {/* Bottom Section - Result Trackers */}
      <div className="mt-12 pt-12 border-t border-avax-border/30">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-avax-gold">📊</span> Network Event Tracking
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREVIOUS_RESULTS.map((result, idx) => (
            <ResultTracker key={idx} {...result} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage;
