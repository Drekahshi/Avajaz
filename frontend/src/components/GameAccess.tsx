import React, { useState } from 'react';

interface Game {
  id: string;
  name: string;
  tagline: string;
  description: string;
  genre: string;
  status: 'Play Now' | 'Coming Soon' | 'Beta';
  players: string;
  reward: string;
  image?: string;
  gradient: string;
  accentColor: string;
  borderHover: string;
  icon: string;
  link?: string;
}

const GAMES: Game[] = [
  {
    id: 'chess',
    name: 'AvajazChess',
    tagline: 'Stake. Strategize. Win.',
    description: 'Risk-free staking chess. Lock AVAX, play a ranked match. Win to earn yield, lose to get your stake back. Every move matters on-chain.',
    genre: 'Strategy',
    status: 'Play Now',
    players: '1,204',
    reward: '+0.02 AVAX / Win',
    gradient: 'from-emerald-900 via-[#0a1f14] to-[#0c0f14]',
    accentColor: 'text-avax-green',
    borderHover: 'hover:border-avax-green/60',
    icon: '♟️',
    link: '/chess.html',
  },
  {
    id: 'polyavajaza',
    name: 'PolyAvajaza',
    tagline: 'Predict. Earn. Repeat.',
    description: 'Prediction markets for CFA environmental outcomes. Bet on forest survival rates, honey yield metrics, and real-world green data.',
    genre: 'Prediction Market',
    status: 'Play Now',
    players: '892',
    reward: 'Up to 5× Returns',
    gradient: 'from-blue-900 via-[#0a1020] to-[#0c0f14]',
    accentColor: 'text-blue-400',
    borderHover: 'hover:border-blue-500/60',
    icon: '📊',
    link: '/polymarket.html',
  },
  {
    id: 'chrono-siege',
    name: 'Chrono Siege',
    tagline: 'Command Time. Conquer Worlds.',
    description: 'A turn-based real-time strategy where AVAX is your army budget. Command warriors across temporal battlefields, upgrade castles, and siege rival CFAs for their staked assets.',
    genre: 'Strategy · RTS',
    status: 'Coming Soon',
    players: '—',
    reward: 'Winner takes 70% Pot',
    image: '/game_chrono_siege.png',
    gradient: 'from-red-900 via-[#1a0a0a] to-[#0c0f14]',
    accentColor: 'text-red-400',
    borderHover: 'hover:border-red-500/40',
    icon: '⚔️',
  },
  {
    id: 'shadow-syndicate',
    name: 'Shadow Syndicate',
    tagline: 'Infiltrate. Steal. Escape.',
    description: 'A high-stakes crypto heist game. Assemble a crew, bypass smart contract security, and siphon yield from rival vaults — without getting caught. Pure on-chain stealth.',
    genre: 'Stealth · Heist',
    status: 'Coming Soon',
    players: '—',
    reward: 'Up to 10× Vault',
    gradient: 'from-purple-950 via-[#0d0a1a] to-[#0c0f14]',
    accentColor: 'text-purple-400',
    borderHover: 'hover:border-purple-500/40',
    icon: '🕵️',
  },
];

const statusStyles: Record<string, string> = {
  'Play Now': 'bg-avax-green/10 text-avax-green border-avax-green/30',
  'Beta': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  'Coming Soon': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
};

// Animated CSS "poster" for Shadow Syndicate
const ShadowSyndicatePoster = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Rain stripes */}
    {[...Array(18)].map((_,i) => (
      <div key={i} className="absolute top-0 bottom-0 w-px opacity-10"
        style={{ left: `${(i+1)*5.5}%`, background: 'linear-gradient(to bottom, transparent, #a855f7, transparent)', animation: `rain ${0.8+Math.random()*0.8}s linear ${Math.random()*1}s infinite` }}
      />
    ))}
    {/* City silhouette */}
    <svg className="absolute bottom-0 left-0 w-full opacity-25" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="60" width="40" height="60" fill="#1a0a2e"/>
      <rect x="10" y="40" width="20" height="80" fill="#1a0a2e"/>
      <rect x="50" y="70" width="30" height="50" fill="#1a0a2e"/>
      <rect x="90" y="30" width="25" height="90" fill="#1a0a2e"/>
      <rect x="105" y="50" width="10" height="70" fill="#1a0a2e"/>
      <rect x="130" y="55" width="35" height="65" fill="#1a0a2e"/>
      <rect x="175" y="45" width="20" height="75" fill="#1a0a2e"/>
      <rect x="205" y="65" width="30" height="55" fill="#1a0a2e"/>
      <rect x="245" y="35" width="22" height="85" fill="#1a0a2e"/>
      <rect x="278" y="50" width="40" height="70" fill="#1a0a2e"/>
      <rect x="290" y="30" width="18" height="90" fill="#1a0a2e"/>
      <rect x="330" y="60" width="35" height="60" fill="#1a0a2e"/>
      <rect x="370" y="40" width="30" height="80" fill="#1a0a2e"/>
    </svg>
    {/* Silhouetted agent figure */}
    <div className="absolute bottom-[28%] right-[22%] opacity-70">
      <div className="text-5xl" style={{ filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.9)) brightness(0.3)' }}>🕵️</div>
    </div>
    {/* Neon glow streaks */}
    <div className="absolute top-8 left-1/4 w-40 h-1 rounded-full opacity-30" style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }}/>
    <div className="absolute top-16 right-1/3 w-24 h-px rounded-full opacity-40" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)' }}/>
    {/* Neon window dots */}
    {[...Array(20)].map((_,i) => (
      <div key={i} className="absolute rounded-sm"
        style={{ width: `${2+Math.random()*3}px`, height: `${2+Math.random()*3}px`, left: `${Math.random()*85}%`, top: `${20+Math.random()*50}%`, background: Math.random()>0.5?'#a855f7':'#06b6d4', opacity: 0.3+Math.random()*0.5, boxShadow: `0 0 6px ${Math.random()>0.5?'#a855f7':'#06b6d4'}` }}
      />
    ))}
    <style>{`
      @keyframes rain { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
    `}</style>
  </div>
);

const ComingSoonModal: React.FC<{ game: Game; onClose: () => void }> = ({ game, onClose }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
    <div className="relative bg-[#0d0f14] border border-white/10 rounded-3xl p-10 max-w-md w-full text-center overflow-hidden shadow-2xl">
      {/* Glow blob */}
      <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-20 ${game.id === 'chrono-siege' ? 'bg-red-600' : 'bg-purple-600'}`}></div>

      <div className="relative z-10">
        <div className="text-6xl mb-5">{game.icon}</div>
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
          Coming Soon
        </div>
        <h2 className={`text-3xl font-black mb-2 ${game.accentColor}`}>{game.name}</h2>
        <p className="text-gray-500 text-sm italic mb-4">{game.tagline}</p>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">{game.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Genre</div>
            <div className="text-sm font-bold text-white">{game.genre}</div>
          </div>
          <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Top Reward</div>
            <div className={`text-sm font-bold ${game.accentColor}`}>{game.reward}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3.5 rounded-2xl font-bold text-sm bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all" onClick={onClose}>
            Back to Hub
          </button>
          <button className="flex-1 py-3.5 rounded-2xl font-bold text-sm bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30 transition-all" onClick={() => alert('You\'ll be notified when this game launches!')}>
            🔔 Notify Me
          </button>
        </div>
      </div>
    </div>
  </div>
);

const GameAccess: React.FC = () => {
  const [verifiedCount] = useState(1);
  const [csGame, setCsGame] = useState<Game | null>(null);

  const handleGameClick = (game: Game) => {
    if (game.status === 'Coming Soon') { setCsGame(game); return; }
    if (game.link) { window.location.href = game.link; }
  };

  if (verifiedCount === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-black">Game Hub</h2>
        <div className="bg-avax-surface border border-red-900/50 p-14 rounded-3xl text-center">
          <div className="text-6xl mb-5">🔒</div>
          <h3 className="text-xl font-bold text-white mb-3">Games Locked</h3>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">Complete and validate at least one environmental activity to unlock the AVAJAZ Game Hub.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">AVAJAZ</div>
          <h2 className="text-4xl font-black text-white">Game Hub</h2>
          <p className="text-gray-400 mt-2 max-w-xl text-sm leading-relaxed">Stake AVAX, compete for real yields. Your environmental verifications fund the prize pools.</p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-1">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest">Active Players</div>
          <div className="text-2xl font-black text-white">2,096</div>
          <div className="flex items-center gap-1.5 text-xs text-avax-green">
            <span className="w-1.5 h-1.5 rounded-full bg-avax-green animate-pulse"></span>Live
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GAMES.map(game => (
          <div
            key={game.id}
            onClick={() => handleGameClick(game)}
            className={`group relative bg-[#0c0f14] border border-white/8 ${game.borderHover} rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 cursor-pointer ${game.status === 'Coming Soon' ? 'opacity-80 hover:opacity-100' : ''}`}
          >
            {/* Banner area */}
            <div className={`relative h-44 bg-gradient-to-br ${game.gradient} overflow-hidden`}>
              {game.id === 'shadow-syndicate' && <ShadowSyndicatePoster />}
              {game.image && game.id !== 'shadow-syndicate' && (
                <img src={game.image} alt={game.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700 group-hover:scale-105" />
              )}
              {/* Icon watermark */}
              <div className="absolute inset-0 flex items-center justify-center text-[6rem] font-black select-none pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
                {game.icon}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f14] via-[#0c0f14]/10 to-transparent"></div>

              {/* Chips */}
              <div className="absolute top-3 left-4 flex gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border backdrop-blur-sm ${statusStyles[game.status]}`}>
                  {game.status === 'Play Now' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-avax-green mr-1.5 animate-pulse align-middle"></span>}
                  {game.status}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-400 border border-white/10 bg-black/40 backdrop-blur-sm">{game.genre}</span>
              </div>

              {/* Play arrow overlay for live games */}
              {game.status === 'Play Now' && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-2xl">▶</div>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className={`text-xl font-black leading-none mb-1 ${game.accentColor}`}>{game.name}</h3>
                  <div className="text-xs text-gray-500 italic">{game.tagline}</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-2">{game.description}</p>

              <div className="flex gap-4 mb-5 pb-5 border-b border-white/6">
                <div><div className="text-[10px] text-gray-600 uppercase tracking-widest mb-0.5">Players</div><div className="text-sm font-bold text-white">{game.players}</div></div>
                <div><div className="text-[10px] text-gray-600 uppercase tracking-widest mb-0.5">Top Reward</div><div className={`text-sm font-bold ${game.accentColor}`}>{game.reward}</div></div>
              </div>

              {game.status === 'Coming Soon' ? (
                <button className="w-full py-3 rounded-2xl text-sm font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-all">
                  🔔 Coming Soon — Click to Learn More
                </button>
              ) : (
                <button className="w-full py-3 rounded-2xl text-sm font-bold text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group-hover:scale-[1.01]">
                  Enter {game.name} →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {csGame && <ComingSoonModal game={csGame} onClose={() => setCsGame(null)} />}
    </div>
  );
};

export default GameAccess;
