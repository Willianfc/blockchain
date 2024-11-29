const express = require('express');
const router = express.Router();
const { blockchain } = require('../services/blockchainService');

// Consultas de Blocos e Transações
router.get('/eth_blockNumber', (req, res) => {
  const blockNumber = blockchain.chain.length - 1;
  res.json({
    jsonrpc: '2.0',
    id: 1,
    result: '0x' + blockNumber.toString(16)
  });
});

router.post('/eth_getBlockByNumber', (req, res) => {
  const blockNumber = parseInt(req.body.params[0], 16);
  const block = blockchain.chain[blockNumber];
  
  if (!block) {
    return res.json({
      jsonrpc: '2.0',
      id: req.body.id,
      error: { code: -32602, message: 'Block not found' }
    });
  }

  res.json({
    jsonrpc: '2.0',
    id: req.body.id,
    result: {
      number: '0x' + blockNumber.toString(16),
      hash: block.hash,
      parentHash: block.previousHash,
      timestamp: '0x' + block.timestamp.toString(16),
      transactions: block.transactions
    }
  });
});

router.post('/eth_getBlockByHash', (req, res) => {
  const blockHash = req.body.params[0];
  const block = blockchain.chain.find(b => b.hash === blockHash);

  if (!block) {
    return res.json({
      jsonrpc: '2.0',
      id: req.body.id,
      error: { code: -32602, message: 'Block not found' }
    });
  }

  const blockIndex = blockchain.chain.indexOf(block);
  res.json({
    jsonrpc: '2.0',
    id: req.body.id,
    result: {
      number: '0x' + blockIndex.toString(16),
      hash: block.hash,
      parentHash: block.previousHash,
      timestamp: '0x' + block.timestamp.toString(16),
      transactions: block.transactions
    }
  });
});

module.exports = router;