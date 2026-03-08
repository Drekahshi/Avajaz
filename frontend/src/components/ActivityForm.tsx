import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { submitActivityForm } from '../services/apiService';

const ActivityForm: React.FC = () => {
  const { address } = useWallet();
  const [formData, setFormData] = useState({
    type: 'tree_planting',
    cfaGroupId: '',
    gpsLat: '',
    gpsLng: '',
    description: '',
    count: 1
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData(prev => ({
          ...prev,
          gpsLat: position.coords.latitude.toFixed(6),
          gpsLng: position.coords.longitude.toFixed(6)
        }));
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert('Please connect wallet first');
      return;
    }
    setLoading(true);
    setSuccess('');
    
    try {
      const res = await submitActivityForm(formData, address);
      setSuccess(`Success! Activity ID: ${res.id}`);
      setFormData({ ...formData, description: '', count: 1 }); // reset some fields
    } catch (err) {
      console.error(err);
      alert('Failed to submit activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-avax-surface border border-avax-border p-6 rounded-2xl max-w-2xl text-white">
      <h2 className="text-2xl font-bold mb-6">Register Environmental Activity</h2>
      
      {success && (
        <div className="mb-6 p-4 bg-green-900/40 border border-green-500 rounded-lg text-green-400">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Activity Type</label>
          <select 
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full bg-avax-dark border border-avax-border rounded-lg px-4 py-2 focus:outline-none focus:border-avax-red"
          >
            <option value="tree_planting">Tree Planting / Agroforestry</option>
            <option value="seedling_nursery">Seedling Nursery</option>
            <option value="beekeeping">Beekeeping</option>
            <option value="ecotourism">Ecotourism Management</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">CFA Group ID</label>
            <input 
              type="text" 
              required
              placeholder="e.g. KEFRI-042"
              value={formData.cfaGroupId}
              onChange={(e) => setFormData({...formData, cfaGroupId: e.target.value})}
              className="w-full bg-avax-dark border border-avax-border rounded-lg px-4 py-2 focus:outline-none focus:border-avax-red"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Count (Trees/Hives)</label>
            <input 
              type="number" 
              min="1"
              required
              value={formData.count}
              onChange={(e) => setFormData({...formData, count: parseInt(e.target.value)})}
              className="w-full bg-avax-dark border border-avax-border rounded-lg px-4 py-2 focus:outline-none focus:border-avax-red"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">GPS Location</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              readOnly
              placeholder="Latitude"
              value={formData.gpsLat}
              className="w-1/2 bg-avax-dark border border-avax-border rounded-lg px-4 py-2 text-gray-300"
            />
            <input 
              type="text" 
              readOnly
              placeholder="Longitude"
              value={formData.gpsLng}
              className="w-1/2 bg-avax-dark border border-avax-border rounded-lg px-4 py-2 text-gray-300"
            />
            <button 
              type="button" 
              onClick={handleGetLocation}
              className="bg-gray-700 hover:bg-gray-600 px-4 rounded-lg text-sm font-semibold transition"
            >
              Get GPS
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
          <textarea 
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-avax-dark border border-avax-border rounded-lg px-4 py-2 focus:outline-none focus:border-avax-red"
            placeholder="Describe the activity..."
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || !formData.gpsLat}
          className={`w-full py-3 rounded-lg font-bold transition-all ${
            loading || !formData.gpsLat ? 'bg-avax-red/50 cursor-not-allowed' : 'bg-avax-red hover:bg-red-600'
          }`}
        >
          {loading ? 'Registering on Fuji Testnet...' : 'Submit Activity'}
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;
