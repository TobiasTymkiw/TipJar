# TipJar - Proyecto final del Módulo 4 de ETH-Kipu

Asegurate de tener configuradas con npx hardhat vars set "variables" las siguientes variables:
- ALCHEMY_API_KEY
- SEPOLIA_PRIVATE_KEY (cuenta que deploya el contrato)
- SEPOLIA_PRIVATE_KEY2 (cuenta que envia el tip)
- ETHERSCAN_API_KEY
- TIP_JAR_ADDRESS (address del contrato una vez deployado)

### Pasos para compilar el proyecto:

1. En la terminal: npm install --save-dev hardhat
2. En la terminal: npx hardhat compile
3. En la terminal: npx hardhat ignition deploy ignition/modules/TipJar.ts --network sepolia --verify
4. Una vez verificado el contrato copia la address y setea la variable TIP_JAR_ADDRESS

### Comandos para Ejecutar los scripts en la terminal:

1. SendTip: npx hardhat run ./scripts/sendtip.ts 
2. GetBalance: npx hh run ./scripts/getbalance.ts 
3. Withdraw: npx hh run ./scripts/withdraw.ts 

