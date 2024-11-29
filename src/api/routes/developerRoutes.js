const express = require('express');
const router = express.Router();
const developerService = require('../services/developerService');
const transactionService = require('../services/transactionService');

// Endpoint para solicitar poder computacional
router.post('/compute-request', async (req, res) => {
  try {
    const { companyId, computePower, duration } = req.body;
    const request = developerService.requestComputePower(companyId, computePower, duration);
    res.json({
      success: true,
      request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Consultar uso atual
router.get('/compute-usage/:companyId', (req, res) => {
  const usage = developerService.getCompanyUsage(req.params.companyId);
  if (!usage) {
    return res.status(404).json({
      success: false,
      error: 'Empresa não encontrada ou sem uso ativo'
    });
  }
  res.json({
    success: true,
    usage
  });
});

// Listar todas as transações de uma wallet
router.get('/transactions/:walletAddress', async (req, res) => {
  try {
    const transactions = await transactionService.getTransactionsByWallet(req.params.walletAddress);
    res.json({
      success: true,
      transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Histórico completo de transações
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json({
      success: true,
      transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;