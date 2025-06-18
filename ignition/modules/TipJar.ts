import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// deploy command
// npx hardhat ignition deploy ignition/modules/SimpleStorage.ts --network sepolia --verify

const TipJarModule = buildModule("TipJarModule", (m) => {
  const TipJar = m.contract("TipJar");
  return { TipJar };
});

export default TipJarModule;