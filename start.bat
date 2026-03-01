@echo off
echo Starting Agro Bazar Backend...
start cmd /k "cd backend && npm start"

echo Starting Agro Bazar Frontend...
start cmd /k "npm run dev"

echo Both servers are starting!
