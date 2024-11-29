const level = require('level');
const path = require('path');

class TransactionService {
  constructor() {
    this.db = level(path.join(__dirname, '../../../data/transactions'));
  }

  async saveTransaction(transaction) {
    const key = `tx:${transaction.hash}:${Date.now()}`;
    await this.db.put(key, JSON.stringify(transaction));
  }

  async getTransactionsByWallet(walletAddress) {
    const transactions = [];
    try {
      for await (const [key, value] of this.db.iterator()) {
        const tx = JSON.parse(value);
        if (tx.fromAddress === walletAddress || tx.toAddress === walletAddress) {
          transactions.push(tx);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
    return transactions;
  }

  async getAllTransactions() {
    const transactions = [];
    try {
      for await (const [key, value] of this.db.iterator()) {
        transactions.push(JSON.parse(value));
      }
    } catch (error) {
      console.error('Erro ao buscar todas as transações:', error);
    }
    return transactions;
  }
}

module.exports = new TransactionService();