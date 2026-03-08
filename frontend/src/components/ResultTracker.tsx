import React from 'react';

interface ResultTrackerProps {
  title: string;
  completionPercentage: number;
  status: 'active' | 'completed' | 'failed';
  totalStaked: string;
  endDate: string;
}

const ResultTracker: React.FC<ResultTrackerProps> = ({ title, completionPercentage, status, totalStaked, endDate }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'text-avax-green bg-avax-green/10 border-avax-green/30';
      case 'failed': return 'text-avax-red bg-avax-red/10 border-avax-red/30';
      default: return 'text-avax-gold bg-avax-gold/10 border-avax-gold/30';
    }
  };

  const getProgressBarColor = () => {
    switch (status) {
      case 'completed': return 'bg-avax-green';
      case 'failed': return 'bg-avax-red';
      default: return 'bg-gradient-to-r from-avax-gold to-avax-green';
    }
  };

  return (
    <div className="bg-avax-dark/40 backdrop-blur-sm border border-avax-border/50 rounded-xl p-5 hover:border-avax-border transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold text-gray-200">{title}</h4>
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
            <span>Ends: {endDate}</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-avax-gold"></span>
              {totalStaked} AVAX Staked
            </span>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded text-xs font-mono uppercase tracking-wider border ${getStatusColor()}`}>
          {status}
        </div>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-xs font-semibold inline-block text-avax-gold">
            {completionPercentage.toFixed(1)}%
          </div>
          <div className="text-xs font-semibold inline-block text-gray-400">
            Target
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-avax-surface border border-avax-border/30">
          <div 
            style={{ width: `${completionPercentage}%` }} 
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressBarColor()}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ResultTracker;
