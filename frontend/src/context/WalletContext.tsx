/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';

interface WalletContextType {
  address: string | null;
  balance: string | null;
  networkId: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new BrowserProvider(window.ethereum as any);
        const accounts = await provider.send('eth_requestAccounts', []);
        
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          const bal = await provider.getBalance(accounts[0]);
          // format balance simply by dividing by 1e18 or using ethers.formatEther
          setBalance((Number(bal) / 1e18).toFixed(4));
          
          const network = await provider.getNetwork();
          setNetworkId(network.chainId.toString());
        }
      } catch (err) {
        console.error('Failed to connect wallet', err);
      }
    } else {
      alert('Please install MetaMask to use AVAJAZ.');
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setBalance(null);
    setNetworkId(null);
  };

  const switchNetwork = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await (window.ethereum as any).request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xA869' }], // 43113 in hex
        });
        setNetworkId('43113');
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await (window.ethereum as any).request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0xA869',
                  chainName: 'Avalanche Fuji Testnet',
                  nativeCurrency: {
                    name: 'AVAX',
                    symbol: 'AVAX',
                    decimals: 18,
                  },
                  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
                  blockExplorerUrls: ['https://testnet.snowtrace.io'],
                },
              ],
            });
            setNetworkId('43113');
          } catch (addError) {
            console.error('Failed to add Fuji network', addError);
          }
        }
      }
    }
  };

  // listen to window.ethereum events
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAddress(accounts[0]);
        }
      };

      const handleChainChanged = (chainId: string) => {
        setNetworkId(parseInt(chainId, 16).toString());
        // standard recommendation is to reload page
        // window.location.reload();
      };

      (window.ethereum as any).on('accountsChanged', handleAccountsChanged);
      (window.ethereum as any).on('chainChanged', handleChainChanged);

      return () => {
        if ((window.ethereum as any).removeListener) {
          (window.ethereum as any).removeListener('accountsChanged', handleAccountsChanged);
          (window.ethereum as any).removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{ address, balance, networkId, connectWallet, disconnectWallet, switchNetwork }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
