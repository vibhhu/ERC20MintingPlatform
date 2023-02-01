const main = async () => {
  // Here 'hre' is injected automatically by hardhat, no need to import it explicitly.
  const DevToken = await hre.ethers.getContractFactory("HKPtoken");
  // Any value passed to deploy() will be passed to contructor of our contract as parameters.

  const devToken = await DevToken.deploy();

  // 'deploy()' in previous line deploys the contract.
  // 'deployed() in next line checks if contract is deployed.
  await devToken.deployed();

  // Once deployed (in 20-30 seconds) you will see the contract address in console. You can also check the transaction on etherscan goerli network.
  console.log("Contract deployed to: ", devToken.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(
//     `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
