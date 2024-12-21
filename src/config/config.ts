import dotenv from 'dotenv';
dotenv.config();

export const config = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  PORT: parseInt(process.env.PORT || '3000', 10),
  TELEGRAM_ADMIN_USER_ID: Number(process.env.TELEGRAM_ADMIN_USER_ID || 0),
  TELEGRAM_CHAT_ID: Number(process.env.TELEGRAM_CHAT_ID || 0),
  SOLANA_RPC_URL_MAINNET:process.env.SOLANA_RPC_URL_MAINNET || ""
};