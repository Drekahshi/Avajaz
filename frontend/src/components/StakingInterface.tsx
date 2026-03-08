import React, { useState } from 'react';

interface PredictionMarket {
  id: string;
  title: string;
  category: string;
  yesOdds: number;
  noOdds: number;
}

interface StakingInterfaceProps {
  market: PredictionMarket | null;
}

const StakingInterface: React.FC<StakingInterfaceProps> = ({ market }) => {
  const [outcome, setOutcome] = useState<'Yes' | 'No' | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [isStaking, setIsStaking] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  if (!market) {
    return (
      <div className="bg-avax-surface border border-avax-border/50 rounded-2xl p-8 text-center h-full flex flex-col justify-center items-center min-h-[400px]">
        <div className="w-16 h-16 bg-avax-dark rounded-full mb-4 flex items-center justify-center border border-avax-border shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <span className="text-2xl">🎯</span>
        </div>
        <h3 className="text-xl font-bold text-gray-300 mb-2">Select a Market</h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Choose an active prediction market from the list to view details and stake your AVAX.
        </p>
      </div>
    );
  }

  const handleStake = () => {
    if (!outcome || !amount) return;
    
    setIsStaking(true);
    setTxHash(null);
    
    // Mocking the blockchain transaction delay
    setTimeout(() => {
      setIsStaking(false);
      setTxHash(`0x${Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')}`);
      setAmount('');
      setOutcome(null);
    }, 2000);
  };

  const potentialReturn = amount && !isNaN(Number(amount)) 
    ? (Number(amount) * (100 / (outcome === 'Yes' ? market.yesOdds : market.noOdds))).toFixed(4)
    : '0.0000';

  return (
    <div className="bg-avax-surface border border-avax-green/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(39,174,96,0.05)] relative overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-avax-green opacity-5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>
      
      <div className="mb-6 z-10">
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-avax-dark border border-avax-border text-avax-gold">
          {market.category}
        </span>
        <h2 className="text-2xl font-black text-white mt-3 leading-tight">{market.title}</h2>
      </div>

      <div className="flex gap-4 mb-6 z-10">
        <button 
          onClick={() => setOutcome('Yes')}
          className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
            outcome === 'Yes' 
              ? 'border-avax-green bg-avax-green/10 shadow-[0_0_20px_rgba(39,174,96,0.2)]' 
              : 'border-avax-border bg-avax-dark/50 hover:border-avax-green/50 text-gray-400'
          }`}
        >
          <div className={`text-lg font-bold ${outcome === 'Yes' ? 'text-avax-green' : 'text-gray-300'}`}>Yes</div>
          <div className="text-xs mt-1 text-gray-400">{market.yesOdds}% Odds</div>
        </button>
        <button 
          onClick={() => setOutcome('No')}
          className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
            outcome === 'No' 
              ? 'border-avax-red bg-avax-red/10 shadow-[0_0_20px_rgba(232,65,66,0.2)]' 
              : 'border-avax-border bg-avax-dark/50 hover:border-avax-red/50 text-gray-400'
          }`}
        >
          <div className={`text-lg font-bold ${outcome === 'No' ? 'text-avax-red' : 'text-gray-300'}`}>No</div>
          <div className="text-xs mt-1 text-gray-400">{market.noOdds}% Odds</div>
        </button>
      </div>

      <div className="mb-6 z-10 flex-1">
        <label className="block text-sm font-medium text-gray-400 mb-2">Stake Amount (AVAX)</label>
        <div className="relative">
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-avax-dark border border-avax-border/80 rounded-xl px-4 py-3.5 text-white font-mono focus:outline-none focus:border-avax-green/50 focus:ring-1 focus:ring-avax-green/50 transition-all placeholder-gray-600"
            placeholder="0.0"
            min="0"
            step="0.01"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <span className="text-avax-gold font-bold">AVAX</span>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-avax-dark/50 border border-avax-border/30 rounded-xl">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Potential Return:</span>
            <span className="font-mono text-avax-green font-bold">{potentialReturn} AVAX</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Platform Fee (1%):</span>
            <span className="font-mono text-gray-400">
              {amount && !isNaN(Number(amount)) ? (Number(amount) * 0.01).toFixed(4) : '0.000'} AVAX
            </span>
          </div>
        </div>
      </div>

      <div className="z-10 mt-auto">
        {txHash ? (
          <div className="bg-avax-green/10 border border-avax-green/30 text-avax-green p-4 rounded-xl text-center">
            <span className="block font-bold mb-1">🎉 Stake Placed!</span>
            <span className="text-xs text-gray-400 font-mono break-all">{txHash}</span>
          </div>
        ) : (
          <button 
            onClick={handleStake}
            disabled={!outcome || !amount || parseFloat(amount) <= 0 || isStaking}
            className={`w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg ${
              !outcome || !amount || parseFloat(amount) <= 0
                ? 'bg-avax-border text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-avax-green to-emerald-600 hover:from-emerald-500 hover:to-avax-green text-white shadow-[0_4px_20px_rgba(39,174,96,0.3)] hover:-translate-y-0.5'
            }`}
          >
            {isStaking ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Confirming...
              </span>
            ) : outcome ? (
              `Stake ${amount || '0'} AVAX on ${outcome}`
            ) : (
              'Select an Outcome'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default StakingInterface;
