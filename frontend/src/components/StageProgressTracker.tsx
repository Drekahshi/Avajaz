import React from 'react';

type Stage = 'Stage 1' | 'Stage 2' | 'Validated' | 'Productized';

interface StageProgressTrackerProps {
  currentStage: Stage;
}

const STAGES: Stage[] = ['Stage 1', 'Stage 2', 'Validated', 'Productized'];

const getStageIndex = (stage: Stage) => STAGES.indexOf(stage);

const StageProgressTracker: React.FC<StageProgressTrackerProps> = ({ currentStage }) => {
  const currentIndex = getStageIndex(currentStage);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-avax-dark rounded-full"></div>
        
        {/* Active Line (Progress) */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-avax-green to-avax-gold rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
        ></div>

        {STAGES.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={stage} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-lg ${
                  isCompleted 
                    ? 'bg-avax-green border-avax-green text-black shadow-[0_0_15px_rgba(39,174,96,0.5)]' 
                    : isCurrent 
                      ? 'bg-avax-surface border-avax-gold text-avax-gold shadow-[0_0_15px_rgba(255,215,0,0.5)] scale-110' 
                      : 'bg-avax-dark border-gray-600 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : isCurrent ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-avax-gold animate-pulse"></div>
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <span className={`absolute top-10 text-xs font-bold whitespace-nowrap transition-colors ${
                isCompleted ? 'text-avax-green' : isCurrent ? 'text-avax-gold' : 'text-gray-500'
              }`}>
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StageProgressTracker;
