@echo off
echo.
echo ======================================
echo     GIRO - Setup do Projeto
echo ======================================
echo.

echo 1. Instalando dependências do Backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependências do backend
    pause
    exit /b 1
)

echo.
echo 2. Instalando dependências do Frontend...
cd ..
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependências do frontend
    pause
    exit /b 1
)

echo.
echo 3. Configurando arquivos de ambiente...

if not exist .env (
    echo Criando .env para o frontend...
    copy .env.example .env > nul
    echo Frontend .env criado! Configure suas variáveis.
) else (
    echo Frontend .env já existe.
)

if not exist backend\.env (
    echo Criando .env para o backend...
    copy backend\.env.example backend\.env > nul
    echo Backend .env criado! Configure suas variáveis.
) else (
    echo Backend .env já existe.
)

echo.
echo ======================================
echo       SETUP CONCLUÍDO COM SUCESSO!
echo ======================================
echo.
echo PRÓXIMOS PASSOS:
echo.
echo 1. Configure o arquivo .env na raiz do projeto
echo 2. Configure o arquivo backend\.env
echo 3. Configure Google OAuth no Google Cloud Console
echo 4. Configure Cloudinary para upload de imagens
echo 5. Configure MongoDB (local ou Atlas)
echo.
echo Para rodar o projeto:
echo   - Backend:  cd backend && npm run dev
echo   - Frontend: npm run dev
echo.
echo Ou use o script: start-dev.bat
echo.
pause