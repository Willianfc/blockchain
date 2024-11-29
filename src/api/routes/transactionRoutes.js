const express = require('express');
const router = express.Router();
const { blockchain } = require('../services/blockchainService');

router.post('/eth_getTransactionByHash', (req, res) => {
  const txHash = req.body.params[0];
  let transaction = null;
  let blockNumber = null;

  for (let i = 0; i < blockchain.chain.length; i++) {
    const block = blockchain.chain[i];
    const tx = block.transactions.find(t => t.hash === txHash);
    if (tx) {
      transaction = tx;
      blockNumber = i;
      break;
    }
  }

  if (!transaction) {
    return res.json({
      jsonrpc: '2.0',
      id: req.body.id,
      error: { code: -32602, message: 'Transaction not found' }
    });
  }

  res.json({
    jsonrpc: '2.0',
    id: req.body.id,
    result: {
      hash: txHash,
      blockNumber: '0x' + blockNumber.toString(16),
      from: transaction.fromAddress,
      to: transaction.toAddress,
      value: '0x' + transaction.amount.toString(16),
      timestamp: '0x' + transaction.timestamp.toString(16)
    }
  });
});

router.post('/eth_sendRawTransaction', (req, res) => {
  const signedTx = req.body.params[0];
  try {
    // Adicionar transação ao pool de transações pendentes
    blockchain.addTransaction(signedTx);
    
    res.json({
      jsonrpc: '2.0',
      id: req.body.id,
      result: signedTx.hash
    });
  } catch (error) {
    res.json({
      jsonrpc: '2.0',
      id: req.body.id,
      error: { code: -32602, message: error.message }
    });
  }
});

module.exports = router;