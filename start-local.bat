@echo off
title ZPay Local Deployment
cd /d "%~dp0"
echo ===================================================
echo   Starting ZPay Production Server Locally...
echo ===================================================
node server.js
pause
