// src/config/index.js
import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    morganFormat: process.env.MORGAN_FORMAT || 'dev'
};

export default config;
