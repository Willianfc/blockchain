const express = require('express');
const router = express.Router();
const { blockchain } = require('../services/blockchainService');
const { getNetworkStats } = require('../services/statsService');

router.get('/dashboard', (req, res) => {
  const stats = getNetworkStats();
  res.json({
    totalBlocks: blockchain.chain.length,
    totalMiners: stats.activeMiners,
    totalPower: stats.totalComputationalPower,
    lastBlock: blockchain.getLatestBlock(),
    networkHashrate: stats.networkHashrate
  });
});

router.get('/status', (req, res) => {
  const stats = getNetworkStats();
  res.json({
    status: 'online',
    uptime: process.uptime(),
    peers: stats.connectedPeers,
    syncStatus: stats.syncStatus
  });
});

router.get('/miners', (req, res) => {
  const stats = getNetworkStats();
  res.json({
    activeMiners: stats.minersList,
    totalPower: stats.totalComputationalPower,
    averagePower: stats.averageComputationalPower
  });
});

module.exports = router;