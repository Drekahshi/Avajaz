import React, { useState } from 'react';

interface PredictionMarket {
  id: string;
  title: string;
  description: string;
  category: string;
  yesOdds: number;
  noOdds: number;
  totalVolume: string;
  endDate: string;
}

interface PredictionListProps {
  markets: PredictionMarket[];
  onSelectMarket: (market: PredictionMarket) => void;
  selectedMarketId?: string;
}

const PredictionList: React.FC<PredictionListProps> = ({ markets, onSelectMarket, selectedMarketId }) => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Climate', 'Forestry', 'Ecotourism'];
  
  const filteredMarkets = filter === 'All' ? markets : markets.filter(m => m.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === cat 
                ? 'bg-avax-green text-white shadow-[0_0_15px_rgba(39,174,96,0.3)]' 
                : 'bg-avax-dark/50 text-gray-400 border border-avax-border/50 hover:border-avax-green/50 hover:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMarkets.map(market => (
          <div 
            key={market.id}
            onClick={() => onSelectMarket(market)}
            className={`cursor-pointer rounded-2xl border transition-all duration-300 p-5 group ${
              selectedMarketId === market.id
                ? 'bg-gradient-to-br from-avax-dark to-[#131a14] border-avax-green shadow-[0_0_20px_rgba(39,174,96,0.15)] scale-[1.02]'
                : 'bg-avax-surface border-avax-border/50 hover:border-avax-gold/50 hover:-translate-y-1'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-avax-dark border border-avax-border text-gray-400 group-hover:text-avax-gold transition-colors">
                {market.category}
              </span>
              <span className="text-xs text-gray-500">Vol: {market.totalVolume} AVAX</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-100 mb-2 leading-tight group-hover:text-white">{market.title}</h3>
            <p className="text-sm text-gray-400 mb-5 line-clamp-2">{market.description}</p>
            
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className={`p-2 rounded-lg border text-center transition-colors ${selectedMarketId === market.id ? 'border-avax-green/30 bg-avax-green/5' : 'border-avax-border/50 bg-avax-dark/50'}`}>
                <div className="text-xs text-gray-500 mb-1">Yes</div>
                <div className="text-lg font-bold text-avax-green">{market.yesOdds}%</div>
              </div>
              <div className={`p-2 rounded-lg border text-center transition-colors ${selectedMarketId === market.id ? 'border-avax-red/30 bg-avax-red/5' : 'border-avax-border/50 bg-avax-dark/50'}`}>
                <div className="text-xs text-gray-500 mb-1">No</div>
                <div className="text-lg font-bold text-avax-red">{market.noOdds}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionList;
