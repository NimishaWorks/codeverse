@echo off
echo ========================================
echo  PPT Converter Backend Setup
echo ========================================
echo.

cd backend

echo [1/4] Installing dependencies...
call npm install

echo.
echo [2/4] Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .env file created! Please edit it and add your Gemini API key.
) else (
    echo .env file already exists.
)

echo.
echo [3/4] Creating uploads folder...
if not exist uploads mkdir uploads

echo.
echo [4/4] Setup complete!
echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo 1. Get your Gemini API key from:
echo    https://makersuite.google.com/app/apikey
echo.
echo 2. Edit backend\.env and add your API key:
echo    GEMINI_API_KEY=your_actual_key_here
echo.
echo 3. Start the server:
echo    cd backend
echo    npm start
echo.
echo ========================================
pause
