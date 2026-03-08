import React from 'react';
import { type NFTAsset } from './NFTGallery';

interface AssetDetailPageProps {
  asset: NFTAsset;
  onClose: () => void;
}

const AssetDetailPage: React.FC<AssetDetailPageProps> = ({ asset, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end" onClick={e => { if (e.target === e.currentTarget) onClose(); }} style={{ animation: 'fadeIn 0.2s ease' }}>
      <div
        className="w-full max-w-lg bg-[#0c0f14] border-l border-white/8 h-full shadow-2xl flex flex-col overflow-y-auto"
        style={{ animation: 'slideInRight 0.3s cubic-bezier(0.16,1,0.3,1) forwards' }}
      >
        {/* Real image header */}
        <div className="relative h-72 flex-shrink-0 overflow-hidden bg-avax-dark">
          <img
            src={asset.image}
            alt={asset.title}
            className="w-full h-full object-cover"
            onError={e => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
              // Show emoji fallback
              const parent = el.parentElement;
              if (parent) parent.innerHTML += `<div class="absolute inset-0 flex items-center justify-center text-8xl">${asset.emoji}</div>`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f14] via-[#0c0f14]/30 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white text-lg"
          >
            ✕
          </button>

          <div className="absolute bottom-4 left-5 z-20 flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-purple-600/30 border border-purple-500/40 text-xs font-bold font-mono text-purple-300">
              {asset.tokenId}
            </span>
            {asset.status === 'Listed' && (
              <span className="px-3 py-1 rounded-lg bg-avax-green/20 border border-avax-green/40 text-xs font-bold text-avax-green flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-avax-green animate-pulse"></span> Live
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-6">
            <div className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-1">{asset.category}</div>
            <h2 className="text-2xl font-black text-white leading-tight mb-2">{asset.title}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{asset.description}</p>
          </div>

          {/* Price card */}
          {asset.status === 'Listed' && (
            <div className="bg-avax-dark/80 border border-avax-border/50 rounded-2xl p-5 mb-6 flex justify-between items-center">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Current Price</div>
                <div className="text-3xl font-black text-avax-green font-mono">{asset.price} <span className="text-base text-gray-400 font-normal">AVAX</span></div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">USD Est.</div>
                <div className="text-lg font-bold text-gray-300">${(asset.price * 28).toFixed(0)}</div>
              </div>
            </div>
          )}

          {/* Provenance Details */}
          <div className="bg-avax-dark/50 border border-avax-border/50 rounded-2xl p-5 mb-6 space-y-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Provenance</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Original Farmer</div>
                <div className="text-sm font-mono text-gray-300 flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-avax-gold flex-shrink-0"></div>
                  {asset.farmer}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Current Owner</div>
                <div className="text-sm font-mono text-gray-300 flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-avax-green to-blue-500 flex-shrink-0"></div>
                  {asset.owner}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Planting Date</div>
                <div className="text-sm text-gray-200">{asset.plantingDate}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Stage</div>
                <div className="text-sm text-purple-400 font-bold">💎 Productized</div>
              </div>
            </div>
          </div>

          {/* Traceability Timeline */}
          <div className="mb-6">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Traceability Log</div>
            <div className="relative pl-4 space-y-5 border-l border-avax-border/50 ml-2">
              {[
                { color: 'bg-purple-500', date: 'Today', text: 'Listed on Marketplace by Owner' },
                { color: 'bg-avax-gold', date: 'Mar 8, 2026', text: 'Minted to ERC-721 by Farmer' },
                { color: 'bg-avax-green', date: 'Mar 5, 2026', text: 'Stage 4 Validation Passed (Community)' },
                { color: 'bg-gray-500', date: 'Feb 20, 2026', text: 'Activity Registered on Platform' },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${item.color} ring-4 ring-[#0c0f14]`}></div>
                  <div className="text-[11px] text-gray-500 font-mono mb-0.5">{item.date}</div>
                  <div className="text-sm text-gray-300">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            {asset.status === 'Listed' ? (
              <button className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-avax-green hover:from-purple-500 hover:to-emerald-500 shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 transition-all text-lg">
                Buy for {asset.price} AVAX
              </button>
            ) : (
              <button disabled className="w-full py-4 rounded-2xl font-bold bg-avax-dark border border-avax-border text-gray-500 cursor-not-allowed">
                Currently Unlisted
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AssetDetailPage;
