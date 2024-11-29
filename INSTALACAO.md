# Guia de Instalação CoreHiveAi

## 1. Instalação no Servidor Linux (Ubuntu)

### 1.1 Preparação do Sistema
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar dependências do sistema
sudo apt install -y build-essential git
```

### 1.2 Instalação do CoreHiveAi
```bash
# Clonar repositório
git clone https://github.com/corehiveai/blockchain.git
cd corehiveai-blockchain

# Instalar dependências
npm install
```

### 1.3 Configuração do Serviço
```bash
# Criar arquivo de serviço
sudo nano /etc/systemd/system/corehiveai.service

# Adicionar o seguinte conteúdo:
[Unit]
Description=CoreHiveAi Blockchain Node
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/corehiveai-blockchain
ExecStart=/usr/bin/npm run api
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target

# Habilitar e iniciar o serviço
sudo systemctl enable corehiveai
sudo systemctl start corehiveai

# Verificar status
sudo systemctl status corehiveai
```

### 1.4 Configuração do Firewall
```bash
sudo ufw allow 5000/tcp
sudo ufw allow 6000/tcp
sudo ufw enable
```

## 2. Guia para Mineradores (Windows)

### 2.1 Requisitos
- Windows 10 ou superior
- Node.js 18+ (https://nodejs.org)
- GPU NVIDIA ou AMD com drivers atualizados

### 2.2 Instalação do Software de Mineração

1. Baixe o pacote do minerador
```bash
git clone https://github.com/corehiveai/miner-windows.git
cd miner-windows
npm install
```

2. Configure o arquivo `config.json`:
```json
{
  "serverUrl": "3.1.94.250",
  "walletAddress": "SEU_ENDERECO_DE_WALLET",
  "gpu": {
    "enabled": true,
    "intensity": 80
  }
}
```

### 2.3 Gerando sua Wallet

1. Execute:
```bash
npm run generate-wallet
```

2. Sua wallet será criada em `wallets/wallet-[TIMESTAMP].json`
3. Copie o endereço público para o arquivo config.json

### 2.4 Iniciando a Mineração

1. Execute:
```bash
npm run mine
```

2. O minerador se conectará automaticamente ao servidor 3.1.94.250:5000

### 2.5 Monitoramento
- Acesse http://3.1.94.250:5000/dashboard para ver estatísticas
- Use http://3.1.94.250:5000/api/balance/[SEU_ENDERECO] para ver seu saldo

## 3. Recompensas e Dificuldade

- Recompensa por bloco: 10 CHAI
- Dificuldade atual: 4
- Tempo médio de bloco: 15 segundos
- Ajuste de dificuldade: A cada 2016 blocos

## 4. Suporte

- Discord: https://discord.gg/corehiveai
- Email: suporte@corehiveai.com
- Documentação: https://docs.corehiveai.com