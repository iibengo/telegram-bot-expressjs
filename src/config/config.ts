import dotenv from 'dotenv';
dotenv.config();

export const config = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  PORT: parseInt(process.env.PORT || '3000', 10),
  ADMIN_USER_ID: Number(process.env.ADMIN_USER_ID || 0),
};