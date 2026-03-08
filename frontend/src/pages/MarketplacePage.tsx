import React, { useState } from 'react';
import MintNFT from '../components/MintNFT';
import NFTGallery, { type NFTAsset } from '../components/NFTGallery';
import AssetDetailPage from '../components/AssetDetailPage';

const MOCK_ASSETS: NFTAsset[] = [
  {
    id: '1',
    tokenId: 'AVJZ-001',
    title: 'Kilifi Mangrove Nursery Batch',
    category: 'Agroforestry',
    owner: '0x3F...88A',
    farmer: '0x1A...5C3',
    price: 45.5,
    image: '/nft_mangrove.png',
    emoji: '🌊',
    status: 'Listed',
    plantingDate: '2026-01-15',
    description: 'A fully validated batch of 500 mangrove seedlings planted along the Kilifi coastline in Kenya with 3-stage community verification.'
  },
  {
    id: '2',
    tokenId: 'AVJZ-002',
    title: 'Nairobi Urban Canopy 10x',
    category: 'Nursery',
    owner: '0x99...2B1',
    farmer: '0x99...2B1',
    price: 12.0,
    image: '/nft_urban_tree.png',
    emoji: '🪴',
    status: 'Listed',
    plantingDate: '2026-02-10',
    description: 'Ten productive urban canopy trees planted in Nairobi green zones. Carbon-sequestering and shade providing, verified by AI + community.'
  },
  {
    id: '3',
    tokenId: 'AVJZ-003',
    title: 'Highland Ecotourism Trail Rights',
    category: 'Ecotourism',
    owner: '0x4F...89A',
    farmer: '0x2D...4E5',
    price: 150.0,
    image: '/nft_ecotourism.png',
    emoji: '🏔️',
    status: 'Listed',
    plantingDate: 'N/A',
    description: 'Rights to a verified highland ecotourism trail in the Aberdare range. Includes biodiversity data, visitor logs, and AI-verified stewardship records.'
  },
  {
    id: '4',
    tokenId: 'AVJZ-004',
    title: 'Mt. Kenya Apiary Setup #4',
    category: 'Beekeeping',
    owner: '0x1A...5C3',
    farmer: '0x1A...5C3',
    price: 36.0,
    image: '/nft_beekeeping.png',
    emoji: '🐝',
    status: 'Unlisted',
    plantingDate: '2026-03-01',
    description: 'A productive beekeeping apiary installed in Mt. Kenya forest buffer zone. The asset includes honey production records and ecological impact logs.'
  }
];

const MarketplacePage: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<NFTAsset | null>(null);

  const listedAssets = MOCK_ASSETS.filter(a => a.status === 'Listed');
  const totalVol = '12,450';
  const floorPrice = '12.0';

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page header */}
      <div className="relative pb-6 mb-2 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">AVAJAZ Marketplace</div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-avax-green mb-2">
            NFT Marketplace
          </h1>
          <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
            Trade physically backed, community-verified green asset NFTs. Real environmental work on the blockchain.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Volume', value: `${totalVol} AVAX`, color: 'text-avax-gold' },
          { label: 'Floor Price', value: `${floorPrice} AVAX`, color: 'text-white' },
          { label: 'Live Listings', value: String(listedAssets.length), color: 'text-avax-green' },
          { label: 'My Holdings', value: '1 NFT', color: 'text-purple-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-avax-dark border border-avax-border/50 rounded-2xl p-5 hover:border-purple-500/30 transition-all group">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">{stat.label}</div>
            <div className={`text-2xl font-black ${stat.color} group-hover:scale-105 transition-transform origin-left`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gallery */}
        <div className="lg:col-span-2 space-y-5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></span>
            Live Listings
          </h2>
          <NFTGallery assets={MOCK_ASSETS} onSelectAsset={setSelectedAsset} />
        </div>

        {/* Mint NFT Sidebar */}
        <div className="space-y-5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-avax-green animate-pulse"></span>
            Mint Your Asset
          </h2>
          <div className="sticky top-8">
            <MintNFT />
          </div>
        </div>
      </div>

      {selectedAsset && (
        <AssetDetailPage asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
      )}
    </div>
  );
};

export default MarketplacePage;
