import React, { useState } from 'react';

export interface NFTAsset {
  id: string;
  tokenId: string;
  title: string;
  category: string;
  owner: string;
  farmer: string;
  price: number;
  image: string;   // now real image path
  emoji: string;   // keep emoji as fallback
  status: 'Listed' | 'Unlisted';
  plantingDate: string;
  description: string;
}

interface NFTGalleryProps {
  assets: NFTAsset[];
  onSelectAsset: (asset: NFTAsset) => void;
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ assets, onSelectAsset }) => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Agroforestry', 'Nursery', 'Ecotourism', 'Beekeeping'];
  const filteredAssets = filter === 'All' ? assets : assets.filter(a => a.category.includes(filter));

  return (
    <div className="space-y-6">
      {/* Filter Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              filter === cat
                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105'
                : 'bg-avax-dark/50 text-gray-400 border border-avax-border/50 hover:border-purple-500/50 hover:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredAssets.map(asset => (
          <div
            key={asset.id}
            onClick={() => onSelectAsset(asset)}
            className="group bg-avax-surface border border-avax-border/50 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_12px_50px_rgba(168,85,247,0.2)] hover:-translate-y-1.5 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden bg-avax-dark">
              <img
                src={asset.image}
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-avax-surface via-transparent to-transparent opacity-80"></div>

              {/* Token ID badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-purple-300 font-bold">
                  {asset.tokenId}
                </span>
              </div>

              {/* Listed badge */}
              {asset.status === 'Listed' && (
                <div className="absolute top-3 right-3">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-avax-green/20 backdrop-blur-md border border-avax-green/30 text-xs font-bold text-avax-green">
                    <span className="w-1.5 h-1.5 rounded-full bg-avax-green animate-pulse"></span>
                    Live
                  </span>
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="p-5">
              <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">
                {asset.category}
              </div>
              <h3 className="text-base font-bold text-white mb-1 line-clamp-1">{asset.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-4">{asset.description}</p>

              <div className="flex justify-between items-center pt-4 border-t border-avax-border/50">
                <div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-0.5">Price</div>
                  <div className="text-lg font-black text-avax-green font-mono">{asset.price.toFixed(1)} <span className="text-sm font-normal text-gray-400">AVAX</span></div>
                </div>
                <div className="w-9 h-9 rounded-full bg-avax-dark border border-avax-border flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTGallery;
