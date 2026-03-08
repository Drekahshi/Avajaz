import React from 'react';
import BadgeDisplay from './BadgeDisplay';
import ProgressTracker from './ProgressTracker';
import RewardFeed from './RewardFeed';

// MOCK DATA
const MOCK_BADGES = [
  { id: '1', name: 'First Seed', icon: '🌱', description: 'Verified your first tree planting activity', earnedAt: '2026-02-14', rarity: 'common' as const },
  { id: '2', name: 'Eagle Eye', icon: '🦅', description: 'Successfully verified 50 community photos', earnedAt: '2026-03-01', rarity: 'rare' as const },
  { id: '3', name: 'Forest Guardian', icon: '🌲', description: 'Participated in a 10ha+ reforestation project', earnedAt: '2026-03-05', rarity: 'epic' as const },
];

const MOCK_MILESTONES = [
  { id: 'm1', title: 'Activity Registered', description: 'Submit tree planting evidence', xpReward: 50, completed: true, date: '2026-03-05' },
  { id: 'm2', title: 'Community Validated', description: 'Photo verified by 5+ citizens', xpReward: 150, completed: true, date: '2026-03-07' },
  { id: 'm3', title: 'On-Chain Sent', description: 'Data written to Fuji Testnet', xpReward: 300, completed: false },
  { id: 'm4', title: 'NFT Minted', description: 'Asset officially converted to ERC-721', xpReward: 500, completed: false },
];

const MOCK_FEED = [
  { id: 'f1', user: '0x4F...89A', action: 'earned the badge', item: 'Nature Protector 🛡️', timestamp: '2 mins ago', type: 'badge' as const },
  { id: 'f2', user: 'James T.', action: 'verified', item: 'Nursery Seedlings', timestamp: '5 mins ago', type: 'verification' as const },
  { id: 'f3', user: 'Alice W.', action: 'minted NFT', item: 'Kilifi Mangrove #102', timestamp: '14 mins ago', type: 'mint' as const },
  { id: 'f4', user: '0x99...2B1', action: 'verified', item: 'Agroforestry Plot', timestamp: '1 hr ago', type: 'verification' as const },
  { id: 'f5', user: '0x1A...5C3', action: 'earned the badge', item: 'First Seed 🌱', timestamp: '3 hrs ago', type: 'badge' as const },
];

const RewardPanel: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 pb-6 border-b border-avax-border/50">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-avax-gold to-white mb-2">Rewards & XP</h1>
          <p className="text-gray-400 max-w-2xl text-sm">Track your progress, earn exclusive badges, and monitor platform activity.</p>
        </div>
        <button className="bg-gradient-to-r from-avax-green to-emerald-600 hover:from-emerald-500 hover:to-avax-green text-white px-6 py-3 rounded-xl font-bold transition shadow-[0_4px_15px_rgba(39,174,96,0.3)]">
          Claim 0.045 AVAX
        </button>
      </div>

      {/* Top Row: Badges and Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BadgeDisplay level={4} currentXP={850} nextLevelXP={1200} badges={MOCK_BADGES} />
        </div>
        <div className="lg:col-span-1">
          <RewardFeed achievements={MOCK_FEED} />
        </div>
      </div>

      {/* Second Row: XP Milestones & NFTs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProgressTracker milestones={MOCK_MILESTONES} />
        </div>
        
        <div className="lg:col-span-2 bg-avax-surface border border-avax-border p-6 rounded-2xl h-full flex flex-col">
          <h3 className="text-white mb-2 font-bold flex items-center gap-2 text-lg">
            <span className="text-purple-400">💎</span> Verified NFTs
          </h3>
          <p className="text-sm text-gray-500 mb-6">Your tokenized real-world assets available for the marketplace.</p>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-avax-dark to-[#101015] p-5 rounded-xl border border-avax-border/50 hover:border-purple-500/50 transition cursor-pointer group">
                <div className="bg-gray-800/50 backdrop-blur-sm h-32 rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                  <span className="z-20">🌳</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-200">Agroforestry #104</h4>
                    <p className="text-xs text-purple-400 mt-1 font-mono">Validated</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-avax-dark px-2 py-1 rounded border border-avax-border">ERC-721</span>
                </div>
              </div>

              {/* Empty placeholder to show how it looks */}
              <div className="bg-avax-dark/30 border border-dashed border-avax-border p-5 rounded-xl flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-opacity">
                <span className="text-2xl mb-2 grayscale text-gray-600">🏛️</span>
                <p className="text-sm text-gray-400 font-semibold mb-1">Mint Next Asset</p>
                <p className="text-xs text-gray-500">Requires Stage 4 Validation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardPanel;
