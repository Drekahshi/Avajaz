const ethers = require('ethers');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'avajaz_super_secret_key_MVP';

// 1. Endpoint to get a challenge string for a specific address
// (Typically handled in a dedicated auth controller)
const generateChallenge = (walletAddress) => {
  return `Sign to authenticate with AVAJAZ: ${Date.now()}`;
};

// 2. Middleware to verify JWT token in protected routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { walletAddress: '0x...', iat: ..., exp: ... }
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token expired or invalid' });
  }
};

module.exports = {
  generateChallenge,
  verifyToken
};
