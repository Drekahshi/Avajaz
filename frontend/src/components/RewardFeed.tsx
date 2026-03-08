import React, { useState } from 'react';

interface Achievement {
  id: string;
  user: string;
  action: string;
  item: string;
  timestamp: string;
  type: 'verification' | 'badge' | 'mint';
}

interface RewardFeedProps {
  achievements: Achievement[];
}

const RewardFeed: React.FC<RewardFeedProps> = ({ achievements }) => {
  const [items] = useState<Achievement[]>(achievements);

  const getIcon = (type: string) => {
    switch (type) {
      case 'verification': return '📸';
      case 'badge': return '🏅';
      case 'mint': return '💎';
      default: return '✨';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'verification': return 'text-avax-green bg-avax-green/10 border-avax-green/20';
      case 'badge': return 'text-avax-gold bg-avax-gold/10 border-avax-gold/20';
      case 'mint': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="bg-avax-surface border border-avax-border/50 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-avax-gold animate-pulse">📡</span> Live Network Activity
        </h3>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-avax-red animate-ping"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-avax-red"></span>
        </div>
      </div>
      
      {/* Scrollable Feed Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[400px]">
        {items.map((achievement, idx) => (
          <div 
            key={achievement.id} 
            className="group flex gap-3 p-3 rounded-xl border border-transparent hover:border-avax-border/50 hover:bg-avax-dark/30 transition-all cursor-default"
            style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.1}s forwards`, opacity: 0 }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border ${getColor(achievement.type)} shrink-0`}>
               {getIcon(achievement.type)}
            </div>
            <div className="flex-1 min-w-0">
               <div className="text-sm">
                 <span className="font-bold text-gray-200">{achievement.user}</span>{' '}
                 <span className="text-gray-400">{achievement.action}</span>{' '}
                 <span className={`font-semibold ${
                   achievement.type === 'verification' ? 'text-avax-green' 
                   : achievement.type === 'badge' ? 'text-avax-gold' 
                   : 'text-purple-400'
                 }`}>
                   {achievement.item}
                 </span>
               </div>
               <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider font-mono">
                 {achievement.timestamp}
               </div>
            </div>
          </div>
        ))}
        
        {/* CSS for staggered fade in */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </div>
      
      <div className="pt-4 mt-4 border-t border-avax-border/30 text-center">
        <button className="text-xs text-avax-gold hover:text-white transition-colors">
          View All Transactions ↗
        </button>
      </div>
    </div>
  );
};

export default RewardFeed;
