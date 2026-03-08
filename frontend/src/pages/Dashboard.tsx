import React from 'react';
import WalletConnect from '../components/WalletConnect';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ActivityForm from '../components/ActivityForm';
import EvidenceUpload from '../components/EvidenceUpload';
import RewardPanel from '../components/RewardPanel';
import GameAccess from '../components/GameAccess';
import PhotoVerificationGame from '../components/PhotoVerificationGame';
import ChessGame from '../components/ChessGame';

// New Feature Pages
import PredictionsPage from './PredictionsPage';
import ActivitiesPage from './ActivitiesPage';
import MarketplacePage from './MarketplacePage';

import { BrowserProvider, parseEther } from 'ethers';

// --- NEW REWARD LOGIC ---
const REWARD_AMOUNT_AVAX = '0.001';
const REWARD_RECIPIENT = '0xaA9953BAB5de2147cC0c919Ab2ff22d809188514';

const IMAGES = [
  { 
    src: '/guide/images/nursery_work.jpg', 
    category: 'Nursery & Seedlings', 
    title: 'Community Seedlings',
    metadata: {
      gps: '-1.286389, 36.817223',
      date: '2026-03-05',
      planter: 'Kelvin M.',
      species: 'Acacia xanthophloea'
    }
  },
  { 
    src: '/guide/images/ecotourism.jpg', 
    category: 'Ecotourism', 
    title: 'Forest Trail Setup',
    metadata: {
      gps: '-1.0345, 36.6789',
      date: '2026-03-02',
      planter: 'Sarah N.',
      species: 'Native Ferns'
    }
  },
  { 
    src: '/guide/images/inclusive_planting.jpg', 
    category: 'Agroforestry', 
    title: 'Mixed Crop Planting',
    metadata: {
      gps: '-0.4561, 37.0123',
      date: '2026-03-01',
      planter: 'John D.',
      species: 'Coffee & Grevillea'
    }
  },
  { 
    src: '/guide/images/avaolo9.jpeg', 
    category: 'Beekeeping', 
    title: 'Apiary Installation',
    metadata: {
      gps: '-1.1234, 36.9876',
      date: '2026-03-04',
      planter: 'Alice W.',
      species: 'Honey Bee Colonies'
    }
  },
  { 
    src: '/guide/images/planting_group.jpg', 
    category: 'Nursery & Seedlings', 
    title: 'Group Planting Event',
    metadata: {
      gps: '-1.2900, 36.8200',
      date: '2026-03-06',
      planter: 'Greenbelt Project',
      species: 'Various Indigenous'
    }
  },
  { 
    src: '/guide/images/seedling_growth.jpg', 
    category: 'Nursery & Seedlings', 
    title: 'Seedling Inspection',
    metadata: {
      gps: '-1.2800, 36.8100',
      date: '2026-03-07',
      planter: 'Musa K.',
      species: 'Prunus africana'
    }
  },
];

const DailyTaskOverview = () => {
  const [selectedImg, setSelectedImg] = React.useState<any | null>(null);
  const [annotation, setAnnotation] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [txHash, setTxHash] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleVerify = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      setTxHash(null);

      if (!window.ethereum) throw new Error("MetaMask not found! Please install or connect.");
      
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      // In a real scenario, the annotation would be part of the IPFS metadata or passed to the contract/API
      console.log("Saving verification with annotation:", annotation);

      const tx = await signer.sendTransaction({
        to: REWARD_RECIPIENT,
        value: parseEther(REWARD_AMOUNT_AVAX)
      });

      setTxHash(tx.hash);
      setTimeout(() => {
        setSelectedImg(null);
        setAnnotation('');
      }, 5000); 
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message || "Transaction failed");
      } else {
        setError("Transaction failed");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-avax-surface p-8 rounded-2xl border border-avax-border shadow-[0_0_20px_rgba(39,174,96,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-avax-green opacity-5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>
        <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Daily Task: Photo Verification</h2>
        <p className="text-gray-400 border-l-2 border-avax-green pl-4">Help train the Jazamiti AI by verifying field photos. Earn 0.001 AVAX per verification.</p>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-avax-dark/50 p-4 rounded-xl border border-avax-border/50">
            <div className="text-xs text-gray-400 uppercase tracking-widest">Images Verified Today</div>
            <div className="text-2xl font-bold text-avax-green mt-1">1,204</div>
          </div>
          <div className="bg-avax-dark/50 p-4 rounded-xl border border-avax-border/50">
            <div className="text-xs text-gray-400 uppercase tracking-widest">Total AVAX Distributed</div>
            <div className="text-2xl font-bold text-avax-gold mt-1">1.204</div>
          </div>
          <div className="bg-avax-dark/50 p-4 rounded-xl border border-avax-border/50">
            <div className="text-xs text-gray-400 uppercase tracking-widest">Active Annotators</div>
            <div className="text-2xl font-bold text-white mt-1">89</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {IMAGES.map((img, i) => (
          <div 
            key={i} 
            className="group cursor-pointer bg-avax-dark rounded-xl border border-avax-border/50 overflow-hidden hover:border-avax-gold/50 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,215,0,0.15)] hover:-translate-y-1"
            onClick={() => { setSelectedImg(img); setTxHash(null); setError(null); }}
          >
            <div className="h-48 overflow-hidden relative">
              <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                 <span className="text-xs font-mono bg-avax-dark/80 px-2 py-1 rounded text-avax-gold border border-avax-gold/30 backdrop-blur-sm">
                  {img.category}
                </span>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-200 text-sm truncate pr-2">{img.title}</h3>
                <div className="text-[10px] text-gray-500 font-mono mt-1">📍 {img.metadata.gps}</div>
              </div>
              <button className="text-xs bg-avax-green/20 text-avax-green px-3 py-1.5 rounded-lg border border-avax-green/30 group-hover:bg-avax-green group-hover:text-white transition-colors whitespace-nowrap">
                Verify
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Verification Modal */}
      {selectedImg && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c0f14] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Left Side: Image */}
            <div className="md:w-1/2 bg-black flex items-center justify-center p-2">
              <img src={selectedImg.src} alt="Verify" className="max-w-full max-h-[400px] md:max-h-full object-contain" />
            </div>

            {/* Right Side: Data & Annotation */}
            <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white">{selectedImg.title}</h3>
                  <div className="text-xs text-avax-gold font-mono tracking-widest uppercase mt-1">{selectedImg.category}</div>
                </div>
                <button onClick={() => setSelectedImg(null)} className="text-gray-500 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              {/* Metadata Panel */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">GPS Location</div>
                  <div className="text-xs font-mono text-white">{selectedImg.metadata.gps}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Capture Date</div>
                  <div className="text-xs font-mono text-white">{selectedImg.metadata.date}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">CFA Planter</div>
                  <div className="text-xs font-mono text-white">{selectedImg.metadata.planter}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Tree Species</div>
                  <div className="text-xs font-mono text-white">{selectedImg.metadata.species}</div>
                </div>
              </div>

              {/* Annotation Input */}
              <div className="mb-8">
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2 px-1">Verifier Annotation</label>
                <textarea 
                  value={annotation}
                  onChange={(e) => setAnnotation(e.target.value)}
                  placeholder="Annotate health, obstacles, or soil conditions..."
                  className="w-full h-24 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-gray-300 focus:outline-none focus:border-avax-green/50 transition-colors resize-none"
                />
              </div>

              {txHash ? (
                <div className="bg-avax-green/10 border border-avax-green/30 text-avax-green p-4 rounded-2xl text-center">
                  <div className="font-bold mb-1">✅ Verified Successfully</div>
                  <div className="text-xs opacity-80 mb-3">Annotation saved to metadata.</div>
                  <a 
                    href={`https://testnet.snowtrace.io/tx/${txHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block text-[11px] font-mono hover:underline"
                  >
                    TX: {txHash.substring(0, 16)}... ↗
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                   {error && <div className="text-avax-red text-xs bg-avax-red/10 p-3 rounded-xl border border-avax-red/20">{error}</div>}
                   <button 
                    onClick={handleVerify}
                    disabled={isProcessing}
                    className="w-full bg-avax-green text-black font-black py-4 rounded-2xl shadow-lg shadow-avax-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex justify-center items-center"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    ) : (
                      `Confirm & Earn ${REWARD_AMOUNT_AVAX} AVAX`
                    )}
                  </button>
                  <p className="text-[10px] text-gray-500 text-center">By confirming, you attest that the metadata matches the visual evidence.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const location = useLocation();

  const extendedNavItems = [
    { path: '/dashboard', label: 'Daily Tasks', icon: '🎯', gamified: false },
    { path: '/dashboard/predictions', label: 'Market Predictions', icon: '📊', gamified: false },
    { path: '/dashboard/register', label: 'Register Activity', icon: '📝', gamified: false },
    { path: '/dashboard/activities', label: 'My Activities', icon: '🌿', gamified: false },
    { path: '/dashboard/rewards', label: 'Rewards & XP', icon: '🏆', gamified: false },
    { path: '/dashboard/marketplace', label: 'NFT Marketplace', icon: '🖼️', gamified: false },
    { path: '/dashboard/games', label: 'Games Hub', icon: '🎮', gamified: false },
    { path: '/dashboard/chess', label: 'Chess Staking', icon: '♟️', gamified: true },
    { path: '/dashboard/verification-game', label: 'Verify (Live)', icon: '✨', gamified: true },
  ];

  return (
    <div className="min-h-screen flex bg-[#08090e] text-white selection:bg-avax-red selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d0f14] border-r border-white/6 flex flex-col shadow-2xl z-10 flex-shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-avax-green to-emerald-700 flex items-center justify-center text-lg font-black shadow-[0_0_15px_rgba(39,174,96,0.4)]">A</div>
            <div>
              <div className="text-xl font-black tracking-tight leading-none">
                <span className="text-avax-green">AVA</span><span className="text-avax-gold">JAZ</span>
              </div>
              <div className="text-[9px] text-avax-red mt-0.5 tracking-[0.2em] font-mono font-bold">FUJI TESTNET</div>
            </div>
          </div>
        </div>
        
        {/* Nav Groups */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="text-[9px] text-gray-600 uppercase tracking-[0.15em] font-bold px-3 pb-2">Main</div>
          {extendedNavItems.filter(i => !i.gamified).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-white/8 text-white border border-white/10 shadow-sm'
                    : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-avax-green"></span>}
              </Link>
            );
          })}

          <div className="text-[9px] text-gray-600 uppercase tracking-[0.15em] font-bold px-3 pt-4 pb-2">Gamified</div>
          {extendedNavItems.filter(i => i.gamified).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-avax-gold/20 to-avax-green/20 text-avax-gold border border-avax-gold/30'
                    : 'text-avax-gold/60 hover:text-avax-gold hover:bg-avax-gold/5'
                }`}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/6">
          <WalletConnect className="w-full justify-center text-xs py-2.5" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<DailyTaskOverview />} />
            <Route path="/predictions" element={<PredictionsPage />} />
            <Route path="/register" element={
              <div className="space-y-8">
                <ActivityForm />
                <EvidenceUpload />
              </div>
            } />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/rewards" element={<RewardPanel />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/games" element={<GameAccess />} />
            <Route path="/chess" element={<ChessGame />} />
            <Route path="/verification-game" element={<PhotoVerificationGame />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
