class ProofOfContribution {
  constructor(difficulty = 4) {
    this.difficulty = difficulty;
    this.minimumComputationalPower = 10; // Minimum computational power required
  }

  validateContribution(computationalPower) {
    return computationalPower >= this.minimumComputationalPower;
  }

  calculateMiningSpeed(computationalPower) {
    // Higher computational power = faster mining
    return Math.floor(computationalPower / this.difficulty);
  }

  adjustDifficulty(averageComputationalPower) {
    // Adjust difficulty based on network's average computational power
    if (averageComputationalPower > this.difficulty * 2) {
      this.difficulty++;
    } else if (averageComputationalPower < this.difficulty / 2) {
      this.difficulty = Math.max(1, this.difficulty - 1);
    }
  }
}

module.exports = ProofOfContribution;