# 🔧 Google OAuth Setup - INSTRUÇÕES IMPORTANTES

## ❗ CONFIGURAÇÃO NECESSÁRIA

Para o login com Google funcionar, você precisa:

### 1. 📋 Configurar Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Crie/selecione um projeto
3. Ative a "Google+ API" ou "Google People API"
4. Vá em "Credenciais" > "Criar credenciais" > "ID do cliente OAuth 2.0"
5. Configure:
   - **Tipo**: Aplicação da web
   - **Origens JavaScript autorizadas**: `http://localhost:5173`
   - **URIs de redirecionamento**: `http://localhost:5173`

### 2. 🔑 Configurar as variáveis de ambiente

**Frontend (.env):**
```env
VITE_GOOGLE_CLIENT_ID=seu_google_client_id_aqui.apps.googleusercontent.com
```

**Backend (backend/.env):**
```env
GOOGLE_CLIENT_ID=seu_google_client_id_aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu_google_client_secret_aqui
```

### 3. ✅ Arquivos criados/atualizados:

- ✅ `GoogleSignIn.jsx` - Componente Google Sign-In
- ✅ `LoginModal.jsx` - Atualizado para usar GoogleSignIn
- ✅ `.env` - Arquivo de configuração frontend
- ✅ Backend já configurado com endpoint `/api/auth/google`

### 4. 🧪 Para testar:

1. Configure o Client ID no `.env`
2. Reinicie o frontend: `npm run dev`
3. Abra http://localhost:5173
4. Clique em "Entrar" > "Continuar com Google"

### 5. 📝 Log de debug:

O console do navegador mostrará:
- `🔍 Google response received:` - Token recebido do Google
- `🔍 Backend response:` - Resposta da API backend
- `✅ Login Google bem-sucedido:` - Login completo

## 🚨 Erros comuns:

### "Endpoint não encontrado"
- ✅ **RESOLVIDO**: Backend agora está rodando na porta 3001

### "Client ID not configured"
- ❌ **PENDENTE**: Configure VITE_GOOGLE_CLIENT_ID no .env

### "Origin not whitelisted" 
- ❌ **PENDENTE**: Adicione http://localhost:5173 no Google Cloud Console

---

## 🎯 STATUS ATUAL:

- ✅ Backend funcionando (porta 3001)
- ✅ Frontend funcionando (porta 5173) 
- ✅ Rota /api/auth/google respondendo
- ✅ Componente GoogleSignIn implementado
- ⏳ **FALTA**: Configurar Google Client ID

**Próximo passo: Configure o Google Client ID e teste!** 🚀