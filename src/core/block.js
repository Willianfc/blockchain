const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    this.computationalPower = 0; // For PoC consensus
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce +
      this.computationalPower
    ).toString();
  }

  // Proof of Contribution mining
  mineBlock(computationalPower) {
    this.computationalPower = computationalPower;
    this.hash = this.calculateHash();
    return this.hash;
  }
}

module.exports = Block;