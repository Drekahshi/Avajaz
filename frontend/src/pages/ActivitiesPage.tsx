import React, { useState, useEffect } from 'react';
import ActivityList, { type ActivitySubmission } from '../components/ActivityList';
import Notifications, { type Notification } from '../components/Notifications';

const MOCK_ACTIVITIES: ActivitySubmission[] = [
  {
    id: 'ETH-8829',
    title: 'Kilifi Mangrove Restoration',
    category: 'Agroforestry',
    dateSubmitted: '2026-03-08',
    location: 'Kilifi, Kenya',
    stage: 'Stage 2',
    thumbnail: '🌊',
    verificationCount: 3
  },
  {
    id: 'ETH-9012',
    title: 'Nairobi Urban Canopy Expansion',
    category: 'Nursery & Seedlings',
    dateSubmitted: '2026-03-05',
    location: 'Nairobi, Kenya',
    stage: 'Validated',
    thumbnail: '🪴',
    verificationCount: 5
  },
  {
    id: 'ETH-7741',
    title: 'Aberdare Highland Beekeeping',
    category: 'Beekeeping',
    dateSubmitted: '2026-02-28',
    location: 'Nyeri, Kenya',
    stage: 'Productized',
    thumbnail: '🐝',
    verificationCount: 12
  }
];

const ActivitiesPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simulate an incoming notification on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          title: 'Stage Progression',
          message: 'Your activity "Kilifi Mangrove Restoration" just moved to Stage 2!',
          type: 'success',
          timestamp: new Date()
        }
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="border-b border-avax-border/50 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-avax-gold to-white mb-2">
            My Activities
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Track the status of your submitted verifications. Follow their progress through community validation 
            and eventual tokenization on the blockchain.
          </p>
        </div>
        <button className="bg-avax-surface border border-avax-border hover:border-avax-gold text-white px-4 py-2 rounded-lg text-sm font-bold transition">
          + New Activity
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-avax-dark border border-avax-border/50 rounded-xl p-4">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Submissions</div>
          <div className="text-2xl font-bold text-white">3</div>
        </div>
        <div className="bg-avax-dark border border-avax-border/50 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Validated</div>
            <div className="text-2xl font-bold text-avax-green">2</div>
          </div>
          <div className="text-2xl opacity-50">✅</div>
        </div>
        <div className="bg-avax-dark border border-avax-border/50 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Pending</div>
            <div className="text-2xl font-bold text-avax-gold">1</div>
          </div>
          <div className="text-2xl opacity-50">⏳</div>
        </div>
        <div className="bg-avax-dark border border-avax-border/50 rounded-xl p-4 flex items-center justify-between">
          <div>
             <div className="text-xs text-purple-400 uppercase tracking-widest mb-1">Productized</div>
             <div className="text-2xl font-bold text-purple-400">1</div>
          </div>
          <div className="text-2xl opacity-50 grayscale hover:grayscale-0 transition">💎</div>
        </div>
      </div>

      <ActivityList activities={MOCK_ACTIVITIES} />

      <Notifications notifications={notifications} onDismiss={dismissNotification} />
    </div>
  );
};

export default ActivitiesPage;
