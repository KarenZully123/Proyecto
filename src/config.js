import { config } from 'dotenv';
config(); // Cargar las variables del archivo .env

// config.js
export const BD_HOST = process.env.MYSQL_ADDON_HOST || 'bj98sjk3zaotprgbfv2l-mysql.services.clever-cloud.com';
export const BD_DATABASE = process.env.MYSQL_ADDON_DB || 'bj98sjk3zaotprgbfv2l';
export const DB_USER = process.env.MYSQL_ADDON_USER || 'umsril7fkih3irrx';
export const DB_PASSWORD = process.env.MYSQL_ADDON_PASSWORD || 'JtxWhIHwjgPTYE7yzl1K';
export const DB_PORT = process.env.MYSQL_ADDON_PORT || '3306';

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET||'karen123';

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'API2024_2';
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '433167633734676';
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'vN4qTcUiMZA3c_4bJ1f5smyAdFU';
