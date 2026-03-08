const express = require('express');
const router = express.Router();
// const { verifyToken } = require('../middleware/walletAuth');
// const db = require('../models/db'); // assuming a pg pool export

// GET all activities (for a wallet or all if no param)
router.get('/:walletAddress?', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    let query = 'SELECT * FROM activities ORDER BY created_at DESC';
    let values = [];
    
    if (walletAddress) {
      query = 'SELECT * FROM activities WHERE owner_wallet = $1 ORDER BY created_at DESC';
      values = [walletAddress];
    }
    
    // const result = await db.query(query, values);
    // res.json(result.rows);
    res.json([]); // mock response for MVP boilerplate
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST register new activity
router.post('/', async (req, res) => {
  try {
    const { owner_wallet, type, cfa_group_id, gps_lat, gps_lng, description } = req.body;
    
    // In demo mode or actual implementation, we'd insert into DB and call the blockchain
    const mockId = `act_${Date.now()}`;
    
    res.status(201).json({ 
      id: mockId,
      status: 'registered',
      message: 'Activity registered successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
