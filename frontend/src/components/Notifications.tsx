import React from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
}

interface NotificationsProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {notifications.map(notif => {
        const typeStyles = {
          success: 'bg-green-900/40 border-green-500/50 text-green-100',
          info: 'bg-blue-900/40 border-blue-500/50 text-blue-100',
          warning: 'bg-yellow-900/40 border-yellow-500/50 text-yellow-100',
          error: 'bg-red-900/40 border-red-500/50 text-red-100'
        }[notif.type];

        const iconStyles = {
          success: '✅ text-green-400',
          info: 'ℹ️ text-blue-400',
          warning: '⚠️ text-yellow-400',
          error: '❌ text-red-400'
        }[notif.type];

        return (
          <div 
            key={notif.id}
            className={`pointer-events-auto w-80 backdrop-blur-md border rounded-xl p-4 shadow-2xl animate-fade-in-up flex gap-3 ${typeStyles}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <span>{iconStyles.split(' ')[0]}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-1">{notif.title}</h4>
              <p className="text-xs opacity-90">{notif.message}</p>
            </div>
            <button 
              onClick={() => onDismiss(notif.id)}
              className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        );
      })}
      
      {/* CSS for toast animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUpToast {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUpToast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default Notifications;
