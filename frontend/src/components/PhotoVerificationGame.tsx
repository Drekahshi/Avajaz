import React, { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { BrowserProvider, parseEther } from 'ethers';

// Declare ethereum on window for TS
declare global {
  interface Window {
    ethereum?: any;
  }
}

const REWARD_AMOUNT_AVAX = '0.001';
const REWARD_RECIPIENT = '0xB13727161583e38185530755a1A96D00fcCae870';

const PhotoVerificationGame: React.FC = () => {
  const { address, balance } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Construct URL with wallet parameters and embed flag
  const iframeSrc = `/guide/index.html?address=${address || ''}&balance=${balance || '0'}&embed=true`;

  useEffect(() => {
    const handleIframeMessage = async (event: MessageEvent) => {
      // Allow messages from the same origin (the iframe)
      if (event.data?.type === 'VERIFICATION_SUCCESS') {
        console.log('Verification Success received from iframe:', event.data.payload);
        
        if (!address) {
          setError("Wallet not connected. Connect to receive rewards.");
          return;
        }

        try {
          setIsProcessing(true);
          setError(null);
          setTxHash(null);

          // Get provider from MetaMask
          if (!window.ethereum) throw new Error("MetaMask not found!");
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          console.log(`Sending ${REWARD_AMOUNT_AVAX} AVAX to ${REWARD_RECIPIENT}...`);

          // Send transaction
          const tx = await signer.sendTransaction({
            to: REWARD_RECIPIENT,
            value: parseEther(REWARD_AMOUNT_AVAX)
          });

          console.log('Transaction sent:', tx.hash);
          setTxHash(tx.hash);
          
          // Optional: Wait for confirmation
          // await tx.wait();
          
        } catch (err: unknown) {
          console.error("Reward transaction failed:", err);
          if (err instanceof Error) {
            setError(err.message || "Transaction failed");
          } else {
            setError("Transaction failed");
          }
        } finally {
          setIsProcessing(false);
        }
      }
    };

    window.addEventListener('message', handleIframeMessage);
    return () => window.removeEventListener('message', handleIframeMessage);
  }, [address]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-avax-surface rounded-2xl border border-avax-border shadow-2xl overflow-hidden relative">
      <div className="bg-avax-dark px-6 py-3 border-b border-avax-border flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="ml-2 font-mono text-xs text-gray-500 uppercase tracking-widest">Gamified Verification Node</span>
        </div>
        <div className="text-xs text-avax-red font-mono font-bold animate-pulse">
          LIVE SYNC ACTIVE
        </div>
      </div>
      
      {/* Overlay Transaction Status */}
      {(isProcessing || txHash || error) && (
        <div className="absolute top-16 right-4 z-20 max-w-sm w-full bg-avax-dark/95 backdrop-blur-md border border-avax-border rounded-xl p-4 shadow-xl transform transition-all animate-fade-in-down">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              {isProcessing && <div className="w-4 h-4 rounded-full border-2 border-avax-gold border-t-transparent animate-spin"></div>}
              {isProcessing ? 'Processing Reward...' : 
               txHash ? 'Reward Sent! 🎉' : 'Transaction Failed ❌'}
            </h4>
            <button 
              onClick={() => { setTxHash(null); setError(null); }}
              className="text-gray-500 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="text-sm text-gray-400">
            {isProcessing && `Waiting for wallet approval to dispatch ${REWARD_AMOUNT_AVAX} AVAX...`}
            {txHash && (
              <div className="mt-2 text-avax-green">
                <span className="block mb-1">TransactionHash:</span>
                <a 
                  href={`https://testnet.snowtrace.io/tx/${txHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs break-all hover:underline text-avax-gold"
                >
                  {txHash}
                </a>
              </div>
            )}
            {error && <div className="text-avax-red mt-1">{error}</div>}
          </div>
        </div>
      )}

      <iframe 
        src={iframeSrc}
        className="flex-1 w-full border-none relative z-0"
        title="AVAJAZ Gamified Verification"
        allow="camera; clipboard-read; clipboard-write; microphone"
      />
    </div>
  );
};

export default PhotoVerificationGame;
