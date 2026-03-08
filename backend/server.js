require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Import mock routes for now
// const activityRoutes = require('./routes/activityRoutes');
// const evidenceRoutes = require('./routes/evidenceRoutes');
// app.use('/api/activities', activityRoutes);
// app.use('/api/evidence', evidenceRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`AVAJAZ Backend listening on port ${PORT}`);
});
