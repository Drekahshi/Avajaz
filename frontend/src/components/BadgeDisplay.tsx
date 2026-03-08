import React, { useRef, useEffect } from 'react';

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeDisplayProps {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  badges: Badge[];
}

const RARITY_CONFIG = {
  legendary: {
    bg: 'from-amber-400 via-yellow-300 to-amber-600',
    border: 'border-amber-400',
    glow: '0 0 30px rgba(251,191,36,0.7), 0 0 60px rgba(251,191,36,0.3)',
    label: 'from-amber-400 to-yellow-300',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    sparkle: 'text-yellow-300',
  },
  epic: {
    bg: 'from-purple-500 via-violet-400 to-indigo-600',
    border: 'border-purple-500',
    glow: '0 0 25px rgba(168,85,247,0.6), 0 0 50px rgba(168,85,247,0.25)',
    label: 'from-purple-400 to-violet-300',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    sparkle: 'text-purple-300',
  },
  rare: {
    bg: 'from-cyan-400 via-blue-400 to-blue-600',
    border: 'border-cyan-400',
    glow: '0 0 20px rgba(34,211,238,0.5), 0 0 40px rgba(59,130,246,0.2)',
    label: 'from-cyan-300 to-blue-400',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    sparkle: 'text-cyan-300',
  },
  common: {
    bg: 'from-gray-400 via-gray-300 to-gray-600',
    border: 'border-gray-500',
    glow: '0 0 10px rgba(156,163,175,0.2)',
    label: 'from-gray-300 to-gray-400',
    badge: 'bg-gray-600/30 text-gray-400 border-gray-600/40',
    sparkle: 'text-gray-400',
  },
};

type RarityKey = keyof typeof RARITY_CONFIG;

// Hoverable badge card
const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => {
  const config = RARITY_CONFIG[badge.rarity as RarityKey];
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    card.style.transform = `perspective(400px) rotateX(${y}deg) rotateY(${x}deg) scale(1.06)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(400px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className="group relative cursor-pointer" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div
        ref={cardRef}
        className={`relative aspect-square rounded-2xl border-2 ${config.border} flex flex-col items-center justify-center overflow-hidden`}
        style={{ boxShadow: config.glow, transition: 'transform 0.15s ease-out, box-shadow 0.3s ease' }}
      >
        {/* Holographic shimmer layer */}
        <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} opacity-15`}></div>
        <div className={`absolute inset-0 bg-gradient-to-tl ${config.bg} opacity-10 group-hover:opacity-25 transition-opacity duration-500`}></div>

        {/* Background pulse */}
        {badge.rarity !== 'common' && (
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config.bg} opacity-0 group-hover:opacity-10 animate-pulse`}></div>
        )}

        {/* Icon */}
        <div className="relative z-10 text-3xl mb-1 drop-shadow-lg" style={{ filter: badge.rarity !== 'common' ? 'drop-shadow(0 0 8px currentColor)' : 'none' }}>
          {badge.icon}
        </div>

        {/* Rarity label */}
        <div className={`relative z-10 text-[8px] font-black uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r ${config.label}`}>
          {badge.rarity}
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-52">
        <div className="bg-[#0c0f14] border border-white/15 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="text-sm font-bold text-white leading-tight">{badge.name}</div>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase border ${config.badge} whitespace-nowrap`}>
              {badge.rarity}
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-snug mb-2">{badge.description}</p>
          <div className="text-[10px] text-gray-600 font-mono">{badge.earnedAt}</div>
        </div>
        {/* Arrow */}
        <div className="w-3 h-3 bg-[#0c0f14] border-b border-r border-white/15 rotate-45 mx-auto -mt-1.5"></div>
      </div>
    </div>
  );
};

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ level, currentXP, nextLevelXP, badges }) => {
  const xpPercentage = Math.min(100, Math.max(0, (currentXP / nextLevelXP) * 100));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated ring canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame: number;
    let angle = -Math.PI / 2;

    const draw = () => {
      ctx.clearRect(0, 0, 120, 120);
      const cx = 60, cy = 60, r = 48;

      // Track
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 8;
      ctx.stroke();

      // Gradient arc
      const endAngle = angle + (Math.PI * 2 * xpPercentage) / 100;
      const grad = ctx.createLinearGradient(0, 0, 120, 120);
      grad.addColorStop(0, '#27ae60');
      grad.addColorStop(0.5, '#ffd700');
      grad.addColorStop(1, '#a855f7');
      ctx.beginPath();
      ctx.arc(cx, cy, r, angle, endAngle);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Tip glow dot
      const tipX = cx + r * Math.cos(endAngle);
      const tipY = cy + r * Math.sin(endAngle);
      const tipGrad = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 10);
      tipGrad.addColorStop(0, 'rgba(255,215,0,0.9)');
      tipGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(tipX, tipY, 6, 0, Math.PI * 2);
      ctx.fillStyle = tipGrad;
      ctx.fill();

      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, [xpPercentage]);

  const levelTitle = level >= 10 ? 'Grandmaster' : level >= 7 ? 'Veteran' : level >= 4 ? 'Ranger' : 'Seedling';

  return (
    <div className="relative bg-gradient-to-b from-[#10131a] to-[#0c0f14] border border-white/8 rounded-3xl p-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-avax-gold rounded-full blur-[100px] opacity-5 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-[80px] opacity-5 pointer-events-none"></div>

      {/* Level Ring */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-28 h-28 flex items-center justify-center mb-4">
          <canvas ref={canvasRef} width={120} height={120} className="absolute inset-0 w-full h-full" />
          <div className="z-10 flex flex-col items-center leading-none gap-0.5">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Level</span>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-avax-green via-avax-gold to-purple-400 leading-none">
              {level}
            </span>
          </div>
        </div>

        {/* Title Badge */}
        <div className="px-4 py-1.5 rounded-full bg-avax-gold/10 border border-avax-gold/30 text-avax-gold text-xs font-black uppercase tracking-widest mb-3">
          {levelTitle}
        </div>

        {/* XP bar */}
        <div className="w-full space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400 font-mono">{currentXP.toLocaleString()} XP</span>
            <span className="text-gray-600 font-mono">{nextLevelXP.toLocaleString()} XP</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-avax-green via-avax-gold to-purple-500 transition-all duration-1000"
              style={{ width: `${xpPercentage}%` }}
            ></div>
          </div>
          <div className="text-[10px] text-gray-600 text-right">{Math.round(nextLevelXP - currentXP)} XP to Level {level + 1}</div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5"></div>

      {/* Badges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Earned Badges</h4>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
            {badges.length} / 9
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {badges.map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}

          {/* Empty slots */}
          {Array.from({ length: Math.max(0, 9 - badges.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="aspect-square rounded-2xl border border-dashed border-white/8 flex items-center justify-center bg-white/2 text-gray-700 text-xl"
            >
              <span className="opacity-30">?</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgeDisplay;
