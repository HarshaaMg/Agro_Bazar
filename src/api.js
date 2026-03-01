// src/api.js

// Using Vite's environment variables to determine if it's production or local
const isProd = import.meta.env.PROD;

// Replace this production URL with your actual backend URL once hosted (e.g. Render/Heroku)
export const API_BASE_URL = isProd
    ? "https://agrobazar-backend.onrender.com"
    : "http://localhost:8001";

export const API_UPLOADS_URL = isProd
    ? "https://agrobazar-backend.onrender.com/uploads"
    : "http://localhost:8001/uploads";
