import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI = process.env.MONGO_URI;
export const POSTGRES_URI = process.env.POSTGRES_URI;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;