# 🗄️ Configuração do MongoDB

Este guia explica como configurar o MongoDB para o projeto Giro, tanto local quanto na nuvem.

## 🎯 Opções de Configuração

1. **MongoDB Local** - Para desenvolvimento
2. **MongoDB Atlas** - Para produção (recomendado)

## 🔧 Opção 1: MongoDB Local

### Windows

#### Método 1: Download Oficial
1. Acesse: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Baixe **MongoDB Community Server** para Windows
3. Execute o instalador (.msi)
4. Siga o assistente de instalação:
   - Escolha "Complete" installation
   - Instale como serviço do Windows
   - Use as configurações padrão

#### Método 2: Chocolatey
```bash
# Se tiver o Chocolatey instalado
choco install mongodb
```

#### Verificar Instalação
```bash
# Verificar se está rodando
sc query MongoDB

# Ou verificar a versão
mongo --version
```

#### Iniciar/Parar Serviço
```bash
# Iniciar
net start MongoDB

# Parar
net stop MongoDB

# Reiniciar
net stop MongoDB && net start MongoDB
```

### Linux (Ubuntu/Debian)

```bash
# Atualizar pacotes
sudo apt update

# Instalar dependências
sudo apt install wget curl gnupg2 software-properties-common apt-transport-https ca-certificates lsb-release

# Adicionar chave GPG oficial do MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/mongodb-server-7.0.gpg

# Adicionar repositório
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Instalar MongoDB
sudo apt update
sudo apt install mongodb-org

# Iniciar serviço
sudo systemctl start mongod
sudo systemctl enable mongod

# Verificar status
sudo systemctl status mongod
```

### macOS

```bash
# Usando Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Iniciar serviço
brew services start mongodb-community

# Verificar se está rodando
brew services list | grep mongodb
```

### Configuração Local

#### Criar Banco de Dados
```bash
# Conectar ao MongoDB
mongo

# Criar banco de dados
use giro

# Criar usuário (opcional, para produção)
db.createUser({
  user: "girouser",
  pwd: "suasenha123",
  roles: ["readWrite"]
})
```

#### String de Conexão Local
```env
# .env do backend
MONGODB_URI=mongodb://localhost:27017/giro

# Com autenticação
MONGODB_URI=mongodb://girouser:suasenha123@localhost:27017/giro
```

## ☁️ Opção 2: MongoDB Atlas (Recomendado)

### Vantagens do Atlas
- ✅ Gratuito até 512MB
- ✅ Backups automáticos
- ✅ Escalabilidade automática
- ✅ Monitoramento incluído
- ✅ Segurança avançada
- ✅ Global

### Passo a Passo

#### 1. Criar Conta
1. Acesse: [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Clique em "Try Free"
3. Preencha os dados de registro
4. Confirme o email

#### 2. Criar Cluster
1. Escolha "Build a Database"
2. Selecione **M0 Sandbox** (gratuito)
3. Escolha a região mais próxima (ex: São Paulo, Brazil)
4. Nome do cluster: `giro-cluster`
5. Clique em "Create Cluster"

#### 3. Configurar Usuário
1. Vá em **Security** > **Database Access**
2. Clique em "Add New Database User"
3. Configure:
   - **Username**: `giro-admin`
   - **Password**: Gere uma senha segura
   - **Database User Privileges**: Atlas admin
4. Clique em "Add User"

#### 4. Configurar Rede
1. Vá em **Security** > **Network Access**
2. Clique em "Add IP Address"
3. Para desenvolvimento, clique em "Allow Access from Anywhere" (0.0.0.0/0)
4. Para produção, adicione apenas os IPs necessários

#### 5. Obter String de Conexão
1. Vá em **Deployment** > **Database**
2. Clique em "Connect" no seu cluster
3. Escolha "Connect your application"
4. Selecione "Node.js" e versão atual
5. Copie a string de conexão

#### Exemplo de String
```
mongodb+srv://giro-admin:<password>@giro-cluster.abc123.mongodb.net/?retryWrites=true&w=majority&appName=giro-cluster
```

#### 6. Configurar no Backend
```env
# backend/.env
MONGODB_URI=mongodb+srv://giro-admin:suasenha123@giro-cluster.abc123.mongodb.net/giro?retryWrites=true&w=majority&appName=giro-cluster
```

## 🧪 Testando a Conexão

### Script de Teste
Crie um arquivo `test-db.js`:

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔍 Testando conexão com MongoDB...');
    console.log('URI:', process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conexão bem-sucedida!');

    // Testar operação
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'Hello MongoDB', timestamp: new Date() });
    console.log('✅ Operação de escrita bem-sucedida!');

    const result = await testCollection.findOne({ test: 'Hello MongoDB' });
    console.log('✅ Operação de leitura bem-sucedida:', result);

    // Limpeza
    await testCollection.deleteOne({ test: 'Hello MongoDB' });
    console.log('✅ Limpeza concluída!');

    await mongoose.disconnect();
    console.log('✅ Desconectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
    process.exit(1);
  }
};

testConnection();
```

### Executar Teste
```bash
cd backend
node test-db.js
```

## 🛠️ Tools Úteis

### MongoDB Compass (GUI)
1. Download: [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)
2. Instale e conecte usando a string de conexão
3. Visualize dados, coleções e execute queries

### Extensão VS Code
1. Instale: **MongoDB for VS Code**
2. Conecte usando a string de conexão
3. Navegue pelo banco diretamente no VS Code

### CLI Tools
```bash
# Instalar MongoDB CLI (mongocli)
npm install -g mongodb-cli

# Conectar ao Atlas
mongocli atlas clusters list
```

## 📊 Monitoramento

### Atlas Dashboard
- Métricas de performance
- Uso de storage
- Número de conexões
- Query performance

### Logs
```javascript
// Ativar logs no Mongoose
mongoose.set('debug', true);

// No código do servidor
mongoose.connection.on('connected', () => {
  console.log('📊 MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erro no MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📊 MongoDB desconectado');
});
```

## 🔧 Troubleshooting

### Erro: "MongoNetworkError"
**Problema**: Não consegue conectar ao MongoDB

**Soluções**:
1. Verifique se o serviço está rodando
2. Confirme a string de conexão
3. Verifique configurações de firewall
4. No Atlas, verifique Network Access

### Erro: "Authentication failed"
**Problema**: Credenciais incorretas

**Soluções**:
1. Verifique usuário e senha
2. Confirme se o usuário foi criado corretamente
3. No Atlas, verifique Database Access

### Erro: "Server selection timeout"
**Problema**: Não consegue encontrar o servidor

**Soluções**:
1. Verifique a URL de conexão
2. Confirme se o cluster está ativo
3. Teste conectividade de rede

### Performance Lenta
**Soluções**:
1. Crie índices nas consultas frequentes
2. Use projeção para buscar apenas campos necessários
3. Implemente paginação
4. Use aggregation pipelines eficientes

## 🚀 Produção

### Atlas Production Cluster
1. Upgrade para cluster M10+ (pago)
2. Configure replica sets
3. Ative backup contínuo
4. Configure alertas
5. Implemente monitoramento avançado

### Segurança
1. Use autenticação sempre
2. Configure network whitelisting específico
3. Ative auditoria
4. Use conexões TLS/SSL
5. Rotacione senhas regularmente

## 📚 Recursos Adicionais

- [Documentação MongoDB](https://docs.mongodb.com/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [MongoDB University](https://university.mongodb.com/)

---

**✅ Checklist de Configuração**

**MongoDB Local:**
- [ ] MongoDB instalado
- [ ] Serviço rodando
- [ ] Banco 'giro' criado
- [ ] String de conexão configurada
- [ ] Teste de conexão realizado

**MongoDB Atlas:**
- [ ] Conta criada
- [ ] Cluster M0 criado
- [ ] Usuário de banco configurado
- [ ] Network access liberado
- [ ] String de conexão obtida
- [ ] Configurado no backend
- [ ] Teste de conexão realizado