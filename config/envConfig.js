import { config } from "dotenv";
import path from "path";

// Determine which .env file to load
const env = process.env.NODE_ENV || 'development';
const envFile = env === 'production' ? '.env.production' : '.env.development';

// Load environment variables from the appropriate .env file
config({ path: path.resolve(process.cwd(), envFile) });

// Log which env file is loaded (optional)
console.log(`Loaded ${envFile} file for ${env} environment`);

export default envFile;