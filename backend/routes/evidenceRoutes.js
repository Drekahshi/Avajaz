const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temp local storage
const { pinFileToIPFS } = require('../services/ipfsService');
// const { verifyToken } = require('../middleware/walletAuth');

router.post('/', upload.single('evidence'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // In a full implementation, we would calculate pHash and check GPS metadata here
    
    // Upload to IPFS via Pinata
    // Mock for demo mode if keys are not set:
    let cid = `mock_cid_${Date.now()}`;
    if (process.env.PINATA_API_KEY) {
      cid = await pinFileToIPFS(req.file.path);
    }
    
    // Save to DB associated with activity ID from req.body

    res.status(200).json({ 
      message: 'Evidence uploaded successfully',
      ipfs_cid: cid
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
