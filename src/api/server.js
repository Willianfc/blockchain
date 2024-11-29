const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { WebSocketServer } = require('ws');
const config = require('../../config.json');

// Import routes
const chainRoutes = require('./routes/chainRoutes');
const blockRoutes = require('./routes/blockRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const developerRoutes = require('./routes/developerRoutes');
const { addMiner } = require('./services/statsService');
const transactionService = require('./services/transactionService');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', chainRoutes);
app.use('/api', blockRoutes);
app.use('/api', transactionRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/dev', developerRoutes);

// WebSocket setup for miners
const wss = new WebSocketServer({ port: config.wsPort });

wss.on('connection', (ws) => {
  console.log('Novo minerador conectado');
  let minerAddress;
  
  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    if (data.type === 'mine') {
      minerAddress = data.minerAddress;
      addMiner(data.minerAddress, data.computationalPower);
      const block = blockchain.minePendingTransactions(data.minerAddress, data.computationalPower);
      
      // Registrar transação de recompensa
      if (block && block.transactions.length > 0) {
        for (const tx of block.transactions) {
          await transactionService.saveTransaction(tx);
        }
      }
      
      ws.send(JSON.stringify({ type: 'mined', reward: blockchain.miningReward }));
    }
  });

  ws.on('close', () => {
    console.log('Minerador desconectado:', minerAddress);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    jsonrpc: '2.0',
    id: req.body.id || null,
    error: {
      code: -32603,
      message: 'Internal error',
      data: err.message
    }
  });
});

app.listen(config.apiPort, () => {
  console.log(`Servidor rodando em http://${config.serverUrl}:${config.apiPort}`);
});