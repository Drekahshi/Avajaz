import React from 'react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  date?: string;
}

interface ProgressTrackerProps {
  milestones: Milestone[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ milestones }) => {
  return (
    <div className="bg-avax-surface border border-avax-border/50 rounded-2xl p-6 relative">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-avax-green">🗺️</span> Verification Journey
      </h3>
      
      <div className="relative pl-4 space-y-8">
        {/* Vertical Line */}
        <div className="absolute left-[1.35rem] top-2 bottom-6 w-0.5 bg-gradient-to-b from-avax-green via-avax-gold to-avax-border/30"></div>
        
        {milestones.map((milestone, idx) => {
          const isCompleted = milestone.completed;
          const isNext = !isCompleted && (idx === 0 || milestones[idx - 1].completed);
          
          return (
            <div key={milestone.id} className={`relative flex items-start gap-5 ${isCompleted ? 'opacity-100' : isNext ? 'opacity-100' : 'opacity-50'}`}>
              <div className="relative z-10 flex flex-col items-center mt-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-avax-green border-avax-green text-black' 
                    : isNext 
                      ? 'bg-avax-surface border-avax-gold shadow-[0_0_10px_rgba(255,215,0,0.5)]' 
                      : 'bg-avax-dark border-avax-border text-transparent'
                }`}>
                  {isCompleted && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isNext && (
                    <div className="w-2 h-2 rounded-full bg-avax-gold animate-pulse"></div>
                  )}
                </div>
              </div>
              
              <div className={`flex-1 p-4 border rounded-xl transition-colors ${
                isCompleted 
                  ? 'bg-avax-dark/80 border-avax-green/20' 
                  : isNext 
                    ? 'bg-gradient-to-r from-avax-gold/10 to-transparent border-avax-gold/30' 
                    : 'bg-avax-dark/30 border-avax-border/30'
              }`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-bold ${isCompleted ? 'text-gray-200' : isNext ? 'text-avax-gold' : 'text-gray-500'}`}>
                    {milestone.title}
                  </h4>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                    isCompleted ? 'bg-avax-green/10 text-avax-green' : 'bg-avax-dark text-gray-500'
                  }`}>
                    +{milestone.xpReward} XP
                  </span>
                </div>
                <p className={`text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-500'}`}>
                  {milestone.description}
                </p>
                {isCompleted && milestone.date && (
                  <div className="text-[10px] text-gray-500 mt-2 font-mono">Completed: {milestone.date}</div>
                )}
                {isNext && (
                   <div className="mt-3 text-xs text-avax-gold flex items-center gap-1.5 font-medium">
                     <span className="w-1.5 h-1.5 rounded-full bg-avax-gold animate-ping inline-block"></span>
                     Current Objective
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
