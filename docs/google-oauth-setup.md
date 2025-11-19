# 🔐 Configuração da Autenticação Google OAuth

Este guia detalha como configurar a autenticação Google OAuth para o projeto Giro.

## 🎯 Visão Geral

A autenticação Google permite que usuários façam login usando suas contas do Google, simplificando o processo de registro e login.

## 📋 Pré-requisitos

1. Conta no Google Cloud Platform
2. Projeto configurado no Google Cloud Console

## 🛠️ Passo a Passo

### 1. Acesso ao Google Cloud Console

1. Acesse: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Faça login com sua conta Google
3. Selecione ou crie um projeto

### 2. Ativar APIs Necessárias

1. No menu lateral, vá em **APIs e Serviços** > **Biblioteca**
2. Busque e ative as seguintes APIs:
   - **Google+ API** (ou Google People API)
   - **Google OAuth2 API**

### 3. Configurar OAuth 2.0

1. Vá em **APIs e Serviços** > **Credenciais**
2. Clique em **+ CRIAR CREDENCIAIS**
3. Selecione **ID do cliente OAuth 2.0**

### 4. Configurar a Tela de Consentimento

Antes de criar as credenciais, configure a tela de consentimento:

1. Vá em **Tela de consentimento OAuth**
2. Escolha **Externo** (para testes) ou **Interno** (se tiver G Suite)
3. Preencha as informações obrigatórias:
   - **Nome do aplicativo**: Giro Marketplace
   - **Email de suporte do usuário**: seu@email.com
   - **Domínios autorizados**: localhost (para desenvolvimento)
   - **Email de contato do desenvolvedor**: seu@email.com

### 5. Criar ID do Cliente OAuth

1. Volte em **Credenciais** > **+ CRIAR CREDENCIAIS** > **ID do cliente OAuth 2.0**
2. Selecione **Aplicativo da Web**
3. Configure:
   - **Nome**: Giro Frontend
   - **Origens JavaScript autorizadas**: 
     - `http://localhost:5173` (desenvolvimento)
     - `http://localhost:3000` (alternativa)
   - **URIs de redirecionamento autorizados**:
     - `http://localhost:5173` (desenvolvimento)

### 6. Obter as Credenciais

Após criar, você receberá:
- **Client ID**: Vai no frontend (.env)
- **Client Secret**: Vai no backend (.env)

## 📝 Configuração dos Arquivos .env

### Frontend (.env)
```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdef.apps.googleusercontent.com
```

### Backend (backend/.env)
```env
GOOGLE_CLIENT_ID=123456789-abcdef.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-seu_client_secret_aqui
```

## 🧪 Testando a Configuração

### 1. Verificar no Frontend

No navegador, abra as DevTools (F12) e execute:

```javascript
console.log('Google Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
```

### 2. Verificar no Backend

Acesse: `http://localhost:3001/health`

Se estiver configurado corretamente, o servidor deve estar rodando.

### 3. Teste de Login

1. Abra a aplicação frontend
2. Clique em "Entrar"
3. Escolha "Continuar com Google"
4. Complete o fluxo de autorização
5. Verifique se o usuário foi criado no MongoDB

## 🔧 Troubleshooting

### Erro: "redirect_uri_mismatch"

**Problema**: A URL de redirecionamento não está autorizada.

**Solução**:
1. Volte ao Google Cloud Console
2. Edite o ID do cliente OAuth
3. Adicione a URL correta em "URIs de redirecionamento autorizados"

### Erro: "access_blocked"

**Problema**: A aplicação não está verificada pelo Google.

**Solução**:
1. Para desenvolvimento, adicione seu email como "Usuário de teste"
2. Vá em **Tela de consentimento OAuth** > **Usuários de teste**
3. Adicione seus emails de teste

### Erro: "invalid_client"

**Problema**: Client ID ou Client Secret incorretos.

**Solução**:
1. Verifique se copiou as credenciais corretamente
2. Confirme que não há espaços extras
3. Regenere as credenciais se necessário

### Backend não reconhece o token

**Problema**: Token Google não é validado corretamente.

**Solução**:
1. Verifique se o `GOOGLE_CLIENT_ID` no backend está correto
2. Confirme se a biblioteca `google-auth-library` está instalada
3. Verifique os logs do servidor para detalhes do erro

## 🚀 Produção

### URLs para Produção

Quando colocar em produção, adicione as URLs reais:

**Origens JavaScript autorizadas**:
- `https://seudominio.com`

**URIs de redirecionamento autorizados**:
- `https://seudominio.com`

### Verificação da Aplicação

Para uso em produção, você precisará:
1. Verificar a aplicação com o Google
2. Preencher a política de privacidade
3. Adicionar ícones e screenshots da aplicação

## 📚 Recursos Adicionais

- [Documentação Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In para Web](https://developers.google.com/identity/sign-in/web)
- [Biblioteca google-auth-library](https://github.com/googleapis/google-auth-library-nodejs)

## ⚠️ Segurança

1. **Nunca** commite o Client Secret no Git
2. Use variáveis de ambiente para todas as credenciais
3. Configure CORS adequadamente no backend
4. Valide sempre os tokens no backend
5. Implemente rate limiting para as rotas de auth

---

**✅ Checklist de Configuração**

- [ ] Projeto criado no Google Cloud Console
- [ ] APIs ativadas (Google+ API, OAuth2 API)
- [ ] Tela de consentimento configurada
- [ ] ID do cliente OAuth criado
- [ ] URLs de desenvolvimento adicionadas
- [ ] Client ID configurado no frontend
- [ ] Client ID e Secret configurados no backend
- [ ] Teste de login realizado com sucesso