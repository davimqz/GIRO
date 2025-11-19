# 🎯 Giro - Marketplace Platform

Plataforma completa de marketplace estilo OLX para compra e venda de produtos, desenvolvida com React + Vite no frontend e Node.js + Express no backend.

## 🚀 Funcionalidades

### ✅ Já Implementado
- **Frontend React** com Vite e TailwindCSS
- **Backend Node.js** com Express e MongoDB
- **Autenticação completa** (tradicional + Google OAuth)
- **Sistema de usuários** com perfis e avatars
- **CRUD de posts** com categorização
- **Upload de imagens** via Cloudinary
- **Sistema de favoritos**
- **Busca avançada** com filtros
- **Design responsivo**
- **Landing page** com seções informativas

### 🔄 Em Desenvolvimento
- Integração completa Frontend ↔ Backend
- Chat em tempo real
- Sistema de pagamentos
- Notificações push
- Geolocalização

## 🏗️ Arquitetura

```
giro/
├── src/                    # Frontend React
│   ├── components/         # Componentes React
│   ├── contexts/          # Context API (Auth, etc)
│   ├── config/            # Configurações
│   └── assets/            # Imagens e recursos
├── backend/               # Backend Node.js
│   ├── models/           # Modelos MongoDB
│   ├── routes/           # Rotas da API
│   ├── middleware/       # Middlewares Express
│   └── uploads/          # Upload local (dev)
├── public/               # Arquivos públicos
└── docs/                 # Documentação
```

## 🛠️ Tecnologias

### Frontend
- **React 19** - Interface de usuário
- **Vite** - Build tool e dev server
- **TailwindCSS** - Estilização
- **Framer Motion** - Animações
- **React Router** - Roteamento
- **Lucide React** - Ícones

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **Google OAuth 2.0** - Login social
- **Cloudinary** - CDN para imagens
- **Bcrypt** - Hash de senhas

## 🚀 Quick Start

### 1. Setup Automático (Recomendado)

```bash
# Clone o repositório
git clone <seu-repo>
cd giro

# Execute o setup automático
setup.bat
```

### 2. Setup Manual

```bash
# Instalar dependências
npm install
cd backend && npm install && cd ..

# Configurar variáveis de ambiente
cp .env.example .env
cp backend/.env.example backend/.env

# Editar os arquivos .env com suas configurações
```

### 3. Configurações Necessárias

#### MongoDB
- **Local**: Instale MongoDB Community Edition
- **Cloud**: Crie conta no [MongoDB Atlas](https://www.mongodb.com/atlas)

#### Google OAuth
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie projeto e ative APIs
3. Configure OAuth 2.0 client
4. Adicione URLs autorizadas

#### Cloudinary (Upload de Imagens)
1. Crie conta no [Cloudinary](https://cloudinary.com/)
2. Copie credenciais do dashboard

### 4. Executar o Projeto

```bash
# Opção 1: Script automático
start-dev.bat

# Opção 2: Manual
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

**URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- API Health: http://localhost:3001/health

## 📋 Variáveis de Ambiente

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
VITE_GOOGLE_CLIENT_ID=seu_google_client_id
```

### Backend (backend/.env)
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/giro
JWT_SECRET=seu_jwt_secret_seguro
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
CLOUDINARY_CLOUD_NAME=seu_cloudinary_cloud_name
CLOUDINARY_API_KEY=sua_cloudinary_api_key
CLOUDINARY_API_SECRET=seu_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

## 🔌 API Endpoints

### Autenticação
```http
POST   /api/auth/register     # Registro
POST   /api/auth/login        # Login tradicional
POST   /api/auth/google       # Login Google OAuth
GET    /api/auth/validate     # Validar token
GET    /api/auth/me          # Dados do usuário
```

### Usuários
```http
GET    /api/users/profile     # Perfil atual
PUT    /api/users/profile     # Atualizar perfil
GET    /api/users/:id         # Perfil público
GET    /api/users/:id/posts   # Posts do usuário
```

### Posts/Anúncios
```http
GET    /api/posts             # Listar (com filtros)
POST   /api/posts             # Criar anúncio
GET    /api/posts/:id         # Detalhes
PUT    /api/posts/:id         # Atualizar
DELETE /api/posts/:id         # Remover
POST   /api/posts/:id/favorite # Favoritar
```

### Upload
```http
POST   /api/upload/post-images # Upload imagens
POST   /api/upload/avatar      # Upload avatar
DELETE /api/upload/image/:id   # Deletar imagem
```

## 🎨 Componentes Principais

### Frontend
- `<LoginModal />` - Modal de login/registro
- `<CreatePost />` - Criação de anúncios
- `<Feed />` - Lista de posts
- `<UserProfile />` - Perfil do usuário
- `<Navbar />` - Navegação principal
- `<Hero />` - Landing page hero

### Backend
- `User` - Model de usuários
- `Post` - Model de anúncios
- `authRoutes` - Rotas de autenticação
- `postRoutes` - Rotas de posts
- `uploadRoutes` - Upload de arquivos

## 🔐 Autenticação

O sistema suporta dois tipos de autenticação:

### 1. Tradicional (Email/Senha)
```javascript
// Registro
POST /api/auth/register
{
  "name": "João Silva",
  "email": "joao@email.com", 
  "password": "MinhaSenh@123",
  "confirmPassword": "MinhaSenh@123"
}

// Login
POST /api/auth/login
{
  "email": "joao@email.com",
  "password": "MinhaSenh@123"
}
```

### 2. Google OAuth
```javascript
// Frontend - Google Sign-In
POST /api/auth/google
{
  "credential": "google_jwt_token"
}
```

## 🎯 Próximos Passos

### Fase 1: Integração Frontend ↔ Backend
- [ ] Atualizar AuthContext para usar nova API
- [ ] Implementar hooks para API calls
- [ ] Conectar componentes ao backend
- [ ] Testes de integração

### Fase 2: Funcionalidades Avançadas  
- [ ] Chat em tempo real (Socket.io)
- [ ] Sistema de avaliações
- [ ] Notificações push
- [ ] Geolocalização

### Fase 3: Produção
- [ ] Deploy na nuvem
- [ ] CI/CD
- [ ] Monitoramento
- [ ] Analytics

## 🧪 Testando

```bash
# Backend
cd backend
npm test

# Frontend  
npm test

# API com curl
curl http://localhost:3001/health
```

## 🐛 Troubleshooting

### MongoDB não conecta
```bash
# Verificar se está rodando
sudo service mongod status
sudo service mongod start
```

### Google OAuth não funciona
1. Verifique Client ID no Google Console
2. Confirme URLs autorizadas
3. Verifique se API está ativa

### Upload de imagens falha
1. Verifique credenciais Cloudinary
2. Confirme limites da conta
3. Verifique tamanho dos arquivos (max 5MB)

## 📄 Licença

Este projeto está sob licença ISC. Veja [LICENSE](LICENSE) para detalhes.

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)  
5. Abra um Pull Request

---

**Desenvolvido com ❤️ por Davio**

🚀 **Status**: Em desenvolvimento ativo
🎯 **Objetivo**: Plataforma completa de marketplace
📅 **Próxima milestone**: Integração Frontend ↔ Backend
