const Blockchain = require('./core/blockchain');
const ProofOfContribution = require('./consensus/proofOfContribution');

// Initialize the blockchain
const CoreHiveAi = new Blockchain();
const consensus = new ProofOfContribution();

console.log('CoreHiveAi Blockchain initialized!');
console.log(`Consensus: Proof of Contribution (PoC)`);
console.log(`Initial difficulty: ${consensus.difficulty}`);