import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";
import path from "path";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: path.resolve(__dirname, "../../", envFile) });

export const env = {
  port: Number(process.env.PORT) || 5000,
  db: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    ssl: process.env.DB_SSL === "true",
  },
  apiVersion: process.env.VITE_API_VERSION,
  jwt: {
    secret: process.env.JWT_SECRET_KEY as string,
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '1h') as SignOptions['expiresIn'],
  },

  contractAddress: {
    polyAvajaz: process.env.VITE_POLY_AVAJAZ_CONTRACT_ADDRESS!,
    stake: process.env.VITE_STAKE_AVAJAZ_CONTRACT_ADDRESS!,
  },

  owner: process.env.ADMIN_PRIVATE_KEY!,
  base: {
    rpcUrl: process.env.AVAX_RPC_URL!,
    chainId: Number(process.env.AVAX_CHAIN_ID),
  }
  
};