@echo off
echo.
echo ======================================
echo   GIRO - Iniciando Ambiente de Dev
echo ======================================
echo.

echo Verificando se o MongoDB está rodando...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✓ MongoDB está rodando
) else (
    echo ⚠ MongoDB não encontrado rodando
    echo   Certifique-se de que o MongoDB esteja instalado e rodando
    echo   Ou configure MongoDB Atlas no arquivo .env
)

echo.
echo Iniciando Backend...
start "Giro Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Iniciando Frontend...
start "Giro Frontend" cmd /k "npm run dev"

echo.
echo ======================================
echo   SERVIDORES INICIADOS!
echo ======================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3001
echo Health:   http://localhost:3001/health
echo.
echo Pressione qualquer tecla para fechar este terminal...
pause > nul