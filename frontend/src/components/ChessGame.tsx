import React from 'react';
import { useAccount } from 'wagmi';

const ChessGame: React.FC = () => {
  const { address } = useAccount();

  // Construct URL with embed flag. We assume chess.html can handle these if needed.
  const iframeSrc = `/guide/chess.html?address=${address || ''}&balance=${'0'}&embed=true`;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-avax-surface rounded-2xl border border-avax-border shadow-2xl overflow-hidden relative">
      <div className="bg-avax-dark px-6 py-3 border-b border-avax-border flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="ml-2 font-mono text-xs text-gray-500 uppercase tracking-widest">Chess Staking Node</span>
        </div>
        <div className="text-xs text-avax-gold font-mono font-bold">
          VS. ARTIFICIAL INTELLIGENCE
        </div>
      </div>
      
      <iframe 
        src={iframeSrc}
        className="flex-1 w-full border-none bg-[#0a0a0a]"
        title="AVAJAZ Chess Staking"
      />
    </div>
  );
};

export default ChessGame;
