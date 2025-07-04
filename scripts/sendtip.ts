import { ethers } from "hardhat";
import TipJarABI from "../artifacts/contracts/TipJar.sol/TipJar.json";
import { vars } from "hardhat/config";

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
//Sepolia private key for account 2 (not the deployer) if you want to test the tip functionality.
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY2");
const TipJarAddress = vars.get("TIP_JAR_ADDRESS");

const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
);

const wallet = new ethers.Wallet(SEPOLIA_PRIVATE_KEY, provider);

const tipJarContract = new ethers.Contract(
  TipJarAddress,
  TipJarABI.abi,
  wallet
);

async function sendTipWithMessage() {
  const tipMessage = "Nice contract, here's a tip for your excellence!";
  const tipAmount = ethers.parseEther("0.01");
  const tipTx = await tipJarContract.tip(tipMessage, {
    value: tipAmount,
  });
  console.log(`⏳ Sending tip of ${ethers.formatEther(tipAmount)} ETH...`);
  await tipTx.wait();
  console.log("✅ Tip sent! Tx hash:", tipTx.hash);
}

async function main() {
  await sendTipWithMessage();
}

main();
