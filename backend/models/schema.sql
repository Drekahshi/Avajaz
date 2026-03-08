CREATE TYPE IF NOT EXISTS activity_state AS ENUM (
  'unregistered', 'registered',
  'stage_1', 'stage_2', 'stage_3',
  'validated', 'productized'
);

CREATE TABLE IF NOT EXISTS users (
  wallet_address VARCHAR(42) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_count INT DEFAULT 0,
  reputation_score INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS activities (
  id VARCHAR(255) PRIMARY KEY,
  owner_wallet VARCHAR(42) REFERENCES users(wallet_address),
  type VARCHAR(50), -- tree_planting, seedling_nursery, beekeeping, ecotourism
  cfa_group_id VARCHAR(100),
  gps_lat DECIMAL(10,8),
  gps_lng DECIMAL(11,8),
  description TEXT,
  state activity_state DEFAULT 'registered',
  ipfs_cid VARCHAR(255),
  tx_hash VARCHAR(66),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS verifications (
  id SERIAL PRIMARY KEY,
  activity_id VARCHAR(255) REFERENCES activities(id),
  verifier_wallet VARCHAR(42) REFERENCES users(wallet_address),
  vote BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nfts (
  token_id INT PRIMARY KEY,
  activity_id VARCHAR(255) REFERENCES activities(id),
  owner_wallet VARCHAR(42) REFERENCES users(wallet_address),
  metadata_uri VARCHAR(255),
  minted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tx_hash VARCHAR(66)
);

CREATE TABLE IF NOT EXISTS rewards (
  id SERIAL PRIMARY KEY,
  recipient_wallet VARCHAR(42) REFERENCES users(wallet_address),
  amount_avax DECIMAL(18,8),
  type VARCHAR(50), -- verification, game
  tx_hash VARCHAR(66),
  claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chess_matches (
  id VARCHAR(255) PRIMARY KEY,
  player1 VARCHAR(42) REFERENCES users(wallet_address),
  player2 VARCHAR(42) REFERENCES users(wallet_address),
  wager_avax DECIMAL(18,8),
  winner VARCHAR(42),
  settled BOOLEAN DEFAULT FALSE,
  contract_match_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS prediction_markets (
  id SERIAL PRIMARY KEY,
  question TEXT,
  yes_pool DECIMAL(18,8) DEFAULT 0,
  no_pool DECIMAL(18,8) DEFAULT 0,
  resolved BOOLEAN DEFAULT FALSE,
  outcome BOOLEAN,
  close_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS prediction_bets (
  id SERIAL PRIMARY KEY,
  market_id INT REFERENCES prediction_markets(id),
  bettor_wallet VARCHAR(42) REFERENCES users(wallet_address),
  side BOOLEAN,
  amount_avax DECIMAL(18,8),
  settled BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS image_hashes (
  id SERIAL PRIMARY KEY,
  phash VARCHAR(64),
  activity_id VARCHAR(255) REFERENCES activities(id),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
