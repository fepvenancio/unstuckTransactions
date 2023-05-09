const ethers = require('ethers');
require('dotenv').config();

async function main() {
  // ... your provider, wallet and other setup code
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ENDPOINT);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Use getFeeData() to get suggested gas fees
  const feeData = await provider.getFeeData();

  const transaction = {
    to: '', // add a recipient address here
    value: ethers.utils.parseEther('0.1'), // Change this value as required
    gasLimit: ethers.utils.hexlify(21000),
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    maxFeePerGas: feeData.maxFeePerGas,
  };

  // Send the transaction and wait for the receipt
  const txResponse = await wallet.sendTransaction(transaction);
  console.log('Transaction hash:', txResponse.hash);
  const txReceipt = await txResponse.wait();
  console.log('Transaction receipt:', txReceipt);
}

main().catch((error) => {
  console.error('Error:', error);
});