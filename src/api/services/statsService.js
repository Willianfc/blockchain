const { WebSocketServer } = require('ws');
const os = require('os');

class StatsService {
  constructor() {
    this.miners = new Map();
    this.startTime = Date.now();
  }

  addMiner(minerAddress, computationalPower) {
    this.miners.set(minerAddress, {
      power: computationalPower,
      lastSeen: Date.now()
    });
  }

  cleanupInactiveMiners() {
    const now = Date.now();
    for (const [address, data] of this.miners.entries()) {
      if (now - data.lastSeen > 300000) { // 5 minutes timeout
        this.miners.delete(address);
      }
    }
  }

  getNetworkStats() {
    this.cleanupInactiveMiners();

    const totalPower = Array.from(this.miners.values())
      .reduce((sum, miner) => sum + miner.power, 0);

    return {
      activeMiners: this.miners.size,
      totalComputationalPower: totalPower,
      averageComputationalPower: totalPower / Math.max(1, this.miners.size),
      networkHashrate: this.calculateNetworkHashrate(),
      connectedPeers: this.miners.size,
      syncStatus: 'synchronized',
      minersList: Array.from(this.miners.entries()).map(([address, data]) => ({
        address,
        power: data.power,
        lastSeen: data.lastSeen
      })),
      uptime: Math.floor((Date.now() - this.startTime) / 1000)
    };
  }

  calculateNetworkHashrate() {
    const totalPower = Array.from(this.miners.values())
      .reduce((sum, miner) => sum + miner.power, 0);
    return totalPower * 1000; // Simplified calculation
  }
}

const statsService = new StatsService();
module.exports = {
  getNetworkStats: () => statsService.getNetworkStats(),
  addMiner: (address, power) => statsService.addMiner(address, power)
};