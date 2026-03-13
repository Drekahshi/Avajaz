import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import { AppDataSource } from './config/db';
import { env } from './config/env';
import { authMiddleware } from './middleware/auth';
import actuator from 'express-actuator';
import UserRouter from "./controller/user";

const app = express();
const PORT = env.port;


app.use(cors({ exposedHeaders: ['x-error-type'] }));
app.use(express.json());        // 1. parse body FIRST
app.use(authMiddleware);        // 2. then auth
app.use(actuator());            // 3. then actuator
app.use(`${env.apiVersion}/users`, UserRouter); // 4. then routes

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }

  console.error(err.stack);
  res.status(err.status ?? 500).json({
    error: err.message ?? 'Internal server error',
  });
});

/**
 * 🚀 startup bootstrap
 */
async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Data Source initialized!');

    // Only seed if tables are empty (avoids re-seeding on every restart)
    // const result = await AppDataSource.query(
    //   `SELECT COUNT(*) as count FROM company`
    // );
    // const isEmpty = parseInt(result[0].count) === 0;

    // if (isEmpty) {
    //   const seedPath = path.join(__dirname, "migration/data.sql");
    //   const seedSql = fs.readFileSync(seedPath, "utf8");
    //   await AppDataSource.query(seedSql);
    //   console.log("🌱 Seed data inserted");
    // } else {
    //   console.log("⏭️  Seed skipped — data already exists");
    // }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}${env.apiVersion}`);
    });
  } catch (err) {
    console.error('❌ Failed to initialize database:', err);
    process.exit(1);
  }
}

startServer();
