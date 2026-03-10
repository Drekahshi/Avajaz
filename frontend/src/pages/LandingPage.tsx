import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import ConnectWalletButton from '../components/WalletConnect';

const STATS = [
  { label: 'Verifications', value: '14,206' },
  { label: 'AVAX Distributed', value: '1,204' },
  { label: 'Active Participants', value: '892' },
  { label: 'Assets Tokenized', value: '47' },
];

const FEATURES = [
  {
    icon: '🌿',
    title: 'Seedling Nursery',
    desc: 'Propagate native seedlings and earn on-chain verification rewards.',
    color: 'from-emerald-900/60 to-avax-dark',
    border: 'border-emerald-700/30',
    glow: 'hover:shadow-[0_0_30px_rgba(52,211,153,0.12)]',
  },
  {
    icon: '🌳',
    title: 'Agroforestry',
    desc: 'Plant trees on farm edges and build a traceable green portfolio.',
    color: 'from-green-900/60 to-avax-dark',
    border: 'border-green-700/30',
    glow: 'hover:shadow-[0_0_30px_rgba(74,222,128,0.12)]',
  },
  {
    icon: '🐝',
    title: 'Beekeeping',
    desc: 'Track hive performance and tokenize honey production outputs.',
    color: 'from-yellow-900/60 to-avax-dark',
    border: 'border-yellow-700/30',
    glow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.12)]',
  },
  {
    icon: '🏔️',
    title: 'Ecotourism',
    desc: 'Manage trails, log biodiversity, and sell experience NFTs.',
    color: 'from-blue-900/60 to-avax-dark',
    border: 'border-blue-700/30',
    glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]',
  },
];

const LandingPage: React.FC = () => {
  const { address } = useAccount();
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate floating particles
    const container = particleRef.current;
    if (!container) return;
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      el.className = 'absolute rounded-full opacity-20 animate-pulse';
      const size = Math.random() * 4 + 1;
      el.style.cssText = `
        width:${size}px; height:${size}px;
        background: ${Math.random() > 0.5 ? '#27ae60' : '#f0c040'};
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation-delay:${Math.random() * 3}s;
        animation-duration:${2 + Math.random() * 3}s;
      `;
      container.appendChild(el);
      particles.push(el);
    }
    return () => particles.forEach(p => p.remove());
  }, []);

  if (address) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-[#060a0e] text-white overflow-hidden relative">
      {/* Particle layer */}
      <div ref={particleRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_bg.png"
          alt="hero"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a0e]/50 via-[#060a0e]/70 to-[#060a0e]" />
      </div>

      {/* Glow Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-avax-green rounded-full blur-[200px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-avax-gold rounded-full blur-[200px] opacity-8 pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex justify-between items-center px-10 py-6 border-b border-white/5 backdrop-blur-sm">
        <div className="text-3xl font-black tracking-tighter">
          <span className="text-avax-green">AVA</span><span className="text-avax-gold">JAZ</span>
          <span className="ml-2 text-xs font-mono text-avax-red bg-avax-red/10 border border-avax-red/30 px-1.5 py-0.5 rounded align-middle">FUJI</span>
        </div>
         <ConnectWalletButton />
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
        <div className="inline-flex items-center gap-2 bg-avax-green/10 border border-avax-green/30 text-avax-green text-xs font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 bg-avax-green rounded-full animate-ping"></span>
          Live on Avalanche Fuji Testnet
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-avax-green via-emerald-400 to-avax-gold">
            Green Economy
          </span>
          <br />
          <span className="text-white">On-Chain.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-4">
          A gamified impact network where real-world environmental work becomes a verifiable, market-ready digital asset.
        </p>
        <p className="text-sm text-gray-500 max-w-lg mx-auto mb-12">
          Plant trees, run beehives, manage ecotourism — get verified, earn AVAX, and tokenize your efforts as NFTs on the Avalanche C-Chain.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
           <ConnectWalletButton />
          <a
            href="#features"
            className="text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-8 py-4 rounded-2xl transition-all text-sm font-medium"
          >
            Explore Features →
          </a>
        </div>

        {/* Trust Stats */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-4xl">
          {STATS.map(s => (
            <div key={s.label} className="text-center p-6 bg-white/3 border border-white/8 rounded-2xl backdrop-blur-sm hover:border-avax-green/30 transition-all">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">{s.value}</div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-mono">What you can do</div>
          <h2 className="text-4xl font-black text-white">Four Impact Categories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className={`group relative bg-gradient-to-b ${f.color} border ${f.border} ${f.glow} p-7 rounded-3xl transition-all duration-500 hover:-translate-y-2 cursor-default overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-5xl mb-5 filter drop-shadow-lg">{f.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NFT preview strip */}
      <section className="relative z-10 pb-24 overflow-hidden">
        <div className="text-center mb-10">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-mono">Marketplace Preview</div>
          <h2 className="text-4xl font-black text-white">Tokenized Green Assets</h2>
        </div>
        <div className="flex gap-6 px-6 overflow-x-auto pb-4 scrollbar-hide max-w-6xl mx-auto">
          {[
            { img: '/nft_beekeeping.png', title: 'Aberdare Beekeeping #12', price: '45.5' },
            { img: '/nft_mangrove.png', title: 'Kilifi Mangrove Nursery', price: '28.0' },
            { img: '/nft_ecotourism.png', title: 'Highland Trail Rights', price: '150.0' },
            { img: '/nft_urban_tree.png', title: 'Nairobi Urban Canopy', price: '12.0' },
          ].map(nft => (
            <div
              key={nft.title}
              className="flex-shrink-0 w-60 bg-avax-surface/80 border border-white/8 rounded-3xl overflow-hidden hover:border-purple-500/40 hover:shadow-[0_8px_40px_rgba(168,85,247,0.2)] transition-all duration-500 hover:-translate-y-2"
            >
              <img src={nft.img} alt={nft.title} className="w-full h-44 object-cover" />
              <div className="p-5">
                <h4 className="font-bold text-white text-sm line-clamp-1 mb-2">{nft.title}</h4>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">Floor</div>
                  <div className="text-avax-green font-bold font-mono text-sm">{nft.price} AVAX</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-gray-600 text-xs font-mono">
        AVAJAZ • Built on Avalanche Fuji Testnet • Gamethon MVP • 2026
      </footer>
    </div>
  );
};

export default LandingPage;
