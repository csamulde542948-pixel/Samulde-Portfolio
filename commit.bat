@echo off
echo ====================================
echo   Portfolio Git Commit Helper
echo ====================================
echo.

REM Check if a commit message was provided
if "%~1"=="" (
    echo Usage: commit.bat "Your commit message here"
    echo Example: commit.bat "Updated contact form styling"
    pause
    exit /b 1
)

echo Adding all changes to Git...
git add .

echo.
echo Committing with message: %~1
git commit -m "%~1"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ✅ Successfully updated your portfolio on GitHub!
echo 🌐 View at: https://github.com/csamulde542948-pixel/Samulde-Portfolio
echo.
pause