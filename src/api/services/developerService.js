const { blockchain } = require('./blockchainService');

class DeveloperService {
  constructor() {
    this.activeRequests = new Map();
  }

  requestComputePower(companyId, requestedPower, duration) {
    // Verificar disponibilidade de poder computacional
    const stats = require('./statsService').getNetworkStats();
    const availablePower = stats.totalComputationalPower * 0.7; // 70% do poder total disponível

    if (requestedPower > availablePower) {
      throw new Error('Poder computacional solicitado não disponível no momento');
    }

    const request = {
      companyId,
      requestedPower,
      duration,
      startTime: Date.now(),
      status: 'active'
    };

    this.activeRequests.set(companyId, request);
    return request;
  }

  getCompanyUsage(companyId) {
    const request = this.activeRequests.get(companyId);
    if (!request) {
      return null;
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - request.startTime;
    
    return {
      ...request,
      elapsedTime,
      remainingTime: request.duration - elapsedTime
    };
  }

  getAllActiveRequests() {
    return Array.from(this.activeRequests.values());
  }
}

module.exports = new DeveloperService();