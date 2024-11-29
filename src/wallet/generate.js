const EC = require('elliptic').ec;
const fs = require('fs');
const path = require('path');

const ec = new EC('secp256k1');

function generateWallet() {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic('hex');
  const privateKey = key.getPrivate('hex');

  const wallet = {
    publicKey,
    privateKey,
    address: publicKey // Endereço é a chave pública neste caso
  };

  const walletDir = path.join(process.cwd(), 'wallets');
  if (!fs.existsSync(walletDir)) {
    fs.mkdirSync(walletDir);
  }

  fs.writeFileSync(
    path.join(walletDir, `wallet-${Date.now()}.json`),
    JSON.stringify(wallet, null, 2)
  );

  return wallet;
}

if (require.main === module) {
  console.log('Gerando nova wallet...');
  const wallet = generateWallet();
  console.log('Wallet gerada com sucesso!');
  console.log('Endereço público:', wallet.address);
  console.log('IMPORTANTE: Guarde sua chave privada em local seguro!');
}

module.exports = { generateWallet };