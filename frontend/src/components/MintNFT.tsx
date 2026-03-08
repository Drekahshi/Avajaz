import React, { useState } from 'react';

const MintNFT: React.FC = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);
    setMintStatus('idle');

    // Mock minting delay
    setTimeout(() => {
      setIsMinting(false);
      setMintStatus('success');
      // Reset after a bit
      setTimeout(() => setMintStatus('idle'), 5000);
    }, 2500);
  };

  return (
    <div className="bg-avax-surface border border-avax-border/50 rounded-2xl p-6 relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 opacity-5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>
      
      <div className="mb-6 flex items-center justify-between z-10">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-purple-400">⚡</span> Tokenize Asset
          </h2>
          <p className="text-sm text-gray-400 mt-1">Convert your Stage 4 verified activity into a tradable ERC-721 token.</p>
        </div>
      </div>

      <form onSubmit={handleMint} className="flex-1 flex flex-col gap-5 z-10">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-1.5">Select Verified Activity</label>
          <select className="w-full bg-avax-dark border border-avax-border/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors">
            <option>ETH-7741: Aberdare Highland Beekeeping</option>
            <option disabled>ETH-8829: Kilifi Mangrove (Productizing...)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">Asset Title</label>
            <input 
              type="text" 
              defaultValue="Aberdare Beekeeping Unit #12"
              className="w-full bg-avax-dark border border-avax-border/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">List Price (AVAX)</label>
            <input 
              type="number" 
              step="0.01"
              placeholder="e.g. 5.5"
              className="w-full bg-avax-dark border border-avax-border/80 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>

        <div>
           <label className="block text-sm font-semibold text-gray-300 mb-1.5">Evidence / Artwork</label>
           <div className="w-full h-32 border-2 border-dashed border-avax-border/80 bg-avax-dark/50 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition-colors">
             <div className="text-center">
                <div className="text-2xl mb-1">🖼️</div>
                <div className="text-xs text-gray-400 font-medium">Upload primary cover image</div>
             </div>
           </div>
        </div>

        <div className="mt-auto pt-4">
          {mintStatus === 'success' ? (
             <div className="bg-purple-900/30 border border-purple-500/50 text-purple-200 p-4 rounded-xl text-center">
               <span className="block font-bold mb-1">🎉 Asset successfully minted!</span>
               <span className="text-xs text-purple-400 font-mono break-all">tx: 0x8fB4...9A2C</span>
             </div>
          ) : (
            <button 
              type="submit"
              disabled={isMinting}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg ${
                isMinting
                  ? 'bg-avax-border text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:-translate-y-0.5'
              }`}
            >
              {isMinting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Minting on Fuji...
                </span>
              ) : (
                'Mint NFT & List'
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MintNFT;
