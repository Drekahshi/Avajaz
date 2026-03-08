// Simulated API Service for MVP Demo Mode

export interface ActivityData {
  type: string;
  cfaGroupId: string;
  gpsLat: string;
  gpsLng: string;
  description: string;
}

export const submitActivityForm = async (_data: ActivityData, _walletAddress: string) => {
  console.log('Mock submitting activity:', _data, 'for', _walletAddress);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: `act_${Date.now()}`,
    status: 'registered',
    message: 'Activity registered on Fuji Testnet (Demo)'
  };
};

export const uploadEvidence = async (_file: File) => {
  console.log('Mock uploading evidence:', _file.name);
  // Simulate IPFS upload delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    ipfs_cid: `Qm${Math.random().toString(36).substring(2, 15)}...`,
    message: 'Evidence successfully pinned to IPFS'
  };
};

export const fetchActivities = async (_walletAddress: string) => {
  console.log('Mock fetching activities for:', _walletAddress);
  await new Promise(resolve => setTimeout(resolve, 500));
  // Mock data representing a progression for demo purposes
  return [
    {
      id: "act_123456",
      type: "tree_planting",
      state: "stage_2",
      confirms: 1,
      required: 2,
      createdAt: new Date().toISOString()
    },
    {
      id: "act_789012",
      type: "seedling_nursery",
      state: "validated",
      confirms: 3,
      required: 2,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];
};
