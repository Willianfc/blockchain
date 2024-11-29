const WebSocket = require('ws');
const { getGPUInfo } = require('node-gpu');
const fs = require('fs');

class MinerClient {
  constructor(serverUrl, walletAddress) {
    this.serverUrl = serverUrl;
    this.walletAddress = walletAddress;
    this.ws = null;
    this.gpuPower = 0;
  }

  async initialize() {
    try {
      const gpuInfo = await getGPUInfo();
      this.gpuPower = this.calculateGPUPower(gpuInfo);
      
      this.ws = new WebSocket(`ws://${this.serverUrl}:6000`);
      
      this.ws.on('open', () => {
        console.log('Conectado ao servidor de mineração');
        this.startMining();
      });

      this.ws.on('message', (data) => {
        const message = JSON.parse(data);
        if (message.type === 'mined') {
          console.log(`Bloco minerado! Recompensa: ${message.reward} CORE`);
          this.startMining(); // Continua minerando
        }
      });
    } catch (error) {
      console.error('Erro ao inicializar minerador:', error);
    }
  }

  calculateGPUPower(gpuInfo) {
    // Cálculo simplificado do poder computacional baseado na GPU
    return gpuInfo.memoryTotal * gpuInfo.clockSpeed / 1000;
  }

  startMining() {
    this.ws.send(JSON.stringify({
      type: 'mine',
      minerAddress: this.walletAddress,
      computationalPower: this.gpuPower
    }));
    console.log('Mineração iniciada com poder computacional:', this.gpuPower);
  }
}

// Inicialização do minerador
if (require.main === module) {
  const config = JSON.parse(fs.readFileSync('config.json'));
  const miner = new MinerClient(config.serverUrl, config.walletAddress);
  miner.initialize();
}

module.exports = MinerClient;