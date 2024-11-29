const express = require('express');
const router = express.Router();
const { blockchain } = require('../services/blockchainService');

// Chain ID e Informações da Rede
router.get('/eth_chainId', (req, res) => {
  res.json({
    jsonrpc: '2.0',
    id: 1,
    result: '0x1' // Mainnet ID
  });
});

router.get('/web3_clientVersion', (req, res) => {
  res.json({
    jsonrpc: '2.0',
    id: 1,
    result: 'CoreHiveAi/v0.1.0'
  });
});

router.get('/net_version', (req, res) => {
  res.json({
    jsonrpc: '2.0',
    id: 1,
    result: '1' // Mainnet
  });
});

router.get('/net_listening', (req, res) => {
  res.json({
    jsonrpc: '2.0',
    id: 1,
    result: true
  });
});

module.exports = router;