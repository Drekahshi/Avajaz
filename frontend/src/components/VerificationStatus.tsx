import React from 'react';

type ActivityState = 'unregistered' | 'registered' | 'stage_1' | 'stage_2' | 'stage_3' | 'validated' | 'productized';

const STAGES: { id: ActivityState; label: string }[] = [
  { id: 'registered', label: 'Registered' },
  { id: 'stage_1', label: 'Stage 1' },
  { id: 'stage_2', label: 'Stage 2' },
  { id: 'stage_3', label: 'Stage 3' },
  { id: 'validated', label: 'Validated' },
  { id: 'productized', label: 'Productized' }
];

interface VerificationStatusProps {
  currentState: ActivityState;
  confirms: number;
  required: number;
  onConfirmClick?: () => void;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({ currentState, confirms, required, onConfirmClick }) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentState);

  return (
    <div className="bg-avax-surface border border-avax-border p-6 rounded-2xl mb-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold">Verification Progress</h3>
        
        {/* Peer Quorum Counter */}
        {currentIndex >= 0 && currentIndex < 4 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 font-mono">
              Quorum: <span className={confirms >= required ? 'text-green-400' : 'text-avax-red'}>{confirms}</span> / {required}
            </span>
            <button 
              onClick={onConfirmClick}
              className="bg-avax-red hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-bold transition-colors"
            >
              Verify Peer Activity
            </button>
          </div>
        )}
      </div>

      {/* Timeline UI */}
      <div className="relative flex justify-between">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2 z-0" />
        
        {/* Active Progress Bar */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-avax-red transition-all duration-500 ease-in-out -translate-y-1/2 z-0"
          style={{ width: `${Math.max(0, (currentIndex / (STAGES.length - 1)) * 100)}%` }}
        />

        {/* Nodes */}
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          
          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center group">
              <div 
                className={`w-6 h-6 rounded-full border-4 flex items-center justify-center transition-colors
                  ${isCompleted ? 'bg-avax-red border-avax-red' : 
                    isActive ? 'bg-avax-dark border-avax-red shadow-[0_0_10px_#E84142]' : 
                    'bg-avax-dark border-gray-600'}`
                }
              >
                {isCompleted && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span className={`absolute top-8 text-xs font-semibold whitespace-nowrap transition-colors
                ${isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-500'}`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationStatus;
