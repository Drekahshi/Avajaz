import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { useDisconnect } from 'wagmi';
import { useRef, useState, useEffect } from 'react';

const ConnectWalletButton = () => {
  const { disconnect } = useDisconnect();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <motion.button
                    onClick={openConnectModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-6 py-2.5 rounded-lg font-medium text-sm
                      bg-gradient-to-r from-primary to-primary/80
                      text-primary-foreground
                      shadow-lg shadow-primary/25
                      hover:shadow-xl hover:shadow-primary/40
                      transition-all duration-300
                      flex items-center gap-2
                      overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <Wallet className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">Connect Wallet</span>
                  </motion.button>
                );
              }

              if (chain.unsupported) {
                return (
                  <motion.button
                    onClick={openChainModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-lg font-medium text-sm
                      bg-destructive text-destructive-foreground
                      shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Wrong network
                  </motion.button>
                );
              }

              return (
                <div className="flex gap-2">
                  {/* Chain button */}
                  <motion.button
                    onClick={openChainModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 rounded-lg font-medium text-sm
                      border bg-background/50 backdrop-blur-sm
                      hover:bg-muted/50 transition-all duration-300
                      flex items-center gap-2"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <img
                          alt={chain.name ?? 'Chain icon'}
                          src={chain.iconUrl}
                          className="w-5 h-5"
                        />
                      </div>
                    )}
                  </motion.button>

                  {/* Account dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg font-medium text-sm
                        border bg-background/50 backdrop-blur-sm
                        hover:bg-muted/50 transition-all duration-300
                        flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      {account.displayName}
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-48 rounded-lg border
                            bg-background/90 backdrop-blur-sm shadow-xl z-50
                            overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              disconnect();
                              setDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5
                              text-sm text-destructive
                              hover:bg-destructive/10 transition-colors duration-150
                              cursor-pointer"
                          >
                            <LogOut className="h-4 w-4" />
                            Disconnect
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton;