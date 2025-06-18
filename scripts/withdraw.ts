import { ethers } from "hardhat";
import TipJarABI from "../artifacts/contracts/TipJar.sol/TipJar.json";
import { vars } from "hardhat/config";

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
//If you want to test witrhdrawing, you can use the deployer account.
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");
const TipJarAddress = "0xB6792A049c604Ca8b37E7692628C88c94e342596";

const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
);

const wallet = new ethers.Wallet(SEPOLIA_PRIVATE_KEY, provider);

const tipJarContract = new ethers.Contract(
  TipJarAddress,
  TipJarABI.abi,
  wallet
);

async function withdraw() {
  console.log("Withdrawing ether...");
  const txWithdraw = await tipJarContract.withdraw();
  await txWithdraw.wait();
  console.log(`Successfully withdraw!`);
}


async function main() {
  await withdraw();
}

main();
