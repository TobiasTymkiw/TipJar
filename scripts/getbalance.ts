import { ethers } from "hardhat";
import { vars } from "hardhat/config";

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const TipJarAddress = vars.get("TIP_JAR_ADDRESS");

const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
);

async function getBalance() {
  console.log("Getting balance...");
  const balance = await provider.getBalance(TipJarAddress);
  console.log(`Balance:${balance}`);
  console.log(`Balance:${ethers.formatEther(balance)}`);
}

async function main() {
  await getBalance();
}

main();
