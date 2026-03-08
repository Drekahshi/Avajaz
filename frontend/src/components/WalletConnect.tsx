import React from 'react';
import { useWallet } from '../context/WalletContext';

interface WalletConnectProps {
  className?: string; // allow overrides
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className = '' }) => {
  const { address, balance, networkId, connectWallet, switchNetwork } = useWallet();

  const isFuji = networkId === '43113';

  if (!address) {
    return (
      <button 
        onClick={connectWallet}
        className={`bg-avax-red hover:bg-red-600 text-white flex items-center gap-2 ${className}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        Connect Wallet
      </button>
    );
  }

  if (!isFuji) {
    return (
      <button 
        onClick={switchNetwork}
        className={`bg-yellow-600 hover:bg-yellow-500 text-white flex items-center justify-between gap-2 shadow-[0_0_15px_rgba(202,138,4,0.5)] ${className}`}
      >
        <span>Switch to Fuji Testnet</span>
      </button>
    );
  }

  // Connected and on Fuji
  return (
    <div className={`flex flex-col items-start bg-[#1a1a1a] rounded-lg border border-avax-border p-2 ${className}`}>
      <div className="flex items-center gap-2 w-full justify-between mb-1">
        <span className="flex items-center gap-1 text-xs text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-400 border border-green-200 shadow-[0_0_5px_#4ade80]"></span>
          Fuji Testnet
        </span>
        <span className="text-xs text-gray-400 font-mono">
          {parseFloat(balance || '0').toFixed(2)} AVAX
        </span>
      </div>
      <div className="px-3 py-1.5 bg-black rounded w-full text-center">
        <span className="text-sm font-mono text-gray-200">
          {address.substring(0, 6)}...{address.substring(address.length - 4)}
        </span>
      </div>
    </div>
  );
};

export default WalletConnect;
