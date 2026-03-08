import React, { useState } from 'react';
import { uploadEvidence } from '../services/apiService';

interface EvidenceUploadProps {
  activityId?: string;
  onUploadSuccess?: (cid: string) => void;
}

const EvidenceUpload: React.FC<EvidenceUploadProps> = ({ activityId, onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadEvidence(file);
      setCid(res.ipfs_cid);
      if (onUploadSuccess) onUploadSuccess(res.ipfs_cid);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-avax-surface border border-avax-border p-6 rounded-2xl max-w-2xl text-white mt-6">
      <h3 className="text-xl font-bold mb-4">Upload Evidence {activityId && `for ${activityId}`}</h3>
      
      {!cid ? (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-avax-border rounded-xl p-8 text-center bg-avax-dark">
            <input 
              type="file" 
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden" 
              id="file-upload" 
            />
            <label 
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center text-gray-400 hover:text-white transition"
            >
              <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              <span className="font-semibold">{file ? file.name : 'Click to select photo/video'}</span>
              <span className="text-sm mt-1">Max 10MB (JPG, PNG, MP4)</span>
            </label>
          </div>
          <button 
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full py-2 rounded-lg font-bold transition-all ${
              !file || uploading ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-avax-dark hover:bg-white'
            }`}
          >
            {uploading ? 'Pinning to IPFS...' : 'Upload to IPFS'}
          </button>
        </div>
      ) : (
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-between">
          <div>
            <p className="text-green-400 font-semibold mb-1">✓ Evidence Uploaded Successfully</p>
            <p className="text-xs text-gray-400 font-mono break-all">IPFS CID: {cid}</p>
          </div>
          <a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" rel="noreferrer" className="text-avax-red hover:underline text-sm font-semibold whitespace-nowrap ml-4">View File</a>
        </div>
      )}
    </div>
  );
};

export default EvidenceUpload;
