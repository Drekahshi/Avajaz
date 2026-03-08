import React from 'react';
import StageProgressTracker from './StageProgressTracker';

type Stage = 'Stage 1' | 'Stage 2' | 'Validated' | 'Productized';

export interface ActivitySubmission {
  id: string;
  title: string;
  category: string;
  dateSubmitted: string;
  location: string;
  stage: Stage;
  thumbnail: string;
  verificationCount: number;
}

interface ActivityListProps {
  activities: ActivitySubmission[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <div className="bg-avax-surface border border-avax-border/50 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-gray-300 mb-2">No Activities Found</h3>
        <p className="text-gray-500">You haven't submitted any verification activities yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activities.map(activity => (
        <div 
          key={activity.id} 
          className="bg-avax-surface border border-avax-border/50 rounded-2xl p-6 hover:border-avax-gold/30 transition-all duration-300 shadow-lg relative overflow-hidden group"
        >
          {/* Subtle gradient background for active ones */}
          {activity.stage !== 'Productized' && (
             <div className="absolute inset-0 bg-gradient-to-r from-avax-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          )}

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
            {/* Image Placeholder */}
            <div className="w-full md:w-48 h-32 rounded-xl bg-avax-dark border border-avax-border/80 overflow-hidden flex-shrink-0 relative">
              <div className="absolute inset-0 flex items-center justify-center text-4xl">
                 {activity.thumbnail}
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-1.5 text-center">
                <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">{activity.id}</span>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-avax-dark text-avax-green border border-avax-green/20 mb-2">
                    {activity.category}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-tight truncate">{activity.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{activity.dateSubmitted}</div>
                  <div className="text-xs text-gray-400 font-mono mt-1">{activity.location}</div>
                </div>
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-6 md:items-center">
                 <div className="flex-1">
                   <StageProgressTracker currentStage={activity.stage} />
                 </div>
                 <div className="flex-shrink-0 text-center bg-avax-dark/50 p-2 rounded-lg border border-avax-border/50 min-w-[100px] mt-4 md:mt-0">
                   <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Verifications</div>
                   <div className="text-xl font-bold text-avax-gold">{activity.verificationCount} <span className="text-sm text-gray-500">/ 5</span></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
