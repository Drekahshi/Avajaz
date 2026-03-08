const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // 1. AgentWallet
  const AgentWallet = await hre.ethers.getContractFactory("AgentWallet");
  const agentWallet = await AgentWallet.deploy(deployer.address, deployer.address);
  await agentWallet.waitForDeployment();
  console.log("AgentWallet deployed to:", await agentWallet.getAddress());

  // 2. ActivityRegistry
  const ActivityRegistry = await hre.ethers.getContractFactory("ActivityRegistry");
  const activityRegistry = await ActivityRegistry.deploy();
  await activityRegistry.waitForDeployment();
  const registryAddr = await activityRegistry.getAddress();
  console.log("ActivityRegistry deployed to:", registryAddr);

  // 3. VerificationContract
  const VerificationContract = await hre.ethers.getContractFactory("VerificationContract");
  const verification = await VerificationContract.deploy(registryAddr);
  await verification.waitForDeployment();
  console.log("VerificationContract deployed to:", await verification.getAddress());

  // 4. NFTMintContract
  const NFTMintContract = await hre.ethers.getContractFactory("NFTMintContract");
  const nftMint = await NFTMintContract.deploy();
  await nftMint.waitForDeployment();
  console.log("NFTMintContract deployed to:", await nftMint.getAddress());

  // 5. RewardDistribution
  const RewardDistribution = await hre.ethers.getContractFactory("RewardDistribution");
  const rewardDist = await RewardDistribution.deploy();
  await rewardDist.waitForDeployment();
  console.log("RewardDistribution deployed to:", await rewardDist.getAddress());

  // 6. GameController
  const GameController = await hre.ethers.getContractFactory("GameController");
  const gameCtrl = await GameController.deploy();
  await gameCtrl.waitForDeployment();
  console.log("GameController deployed to:", await gameCtrl.getAddress());

  // 7. PredictionMarket
  const PredictionMarket = await hre.ethers.getContractFactory("PredictionMarket");
  const predMarket = await PredictionMarket.deploy(deployer.address);
  await predMarket.waitForDeployment();
  console.log("PredictionMarket deployed to:", await predMarket.getAddress());

  // 8. StakingPool
  const StakingPool = await hre.ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.deploy(deployer.address);
  await stakingPool.waitForDeployment();
  console.log("StakingPool deployed to:", await stakingPool.getAddress());

  // 9. BadgeNFT
  const BadgeNFT = await hre.ethers.getContractFactory("BadgeNFT");
  const badgeNFT = await BadgeNFT.deploy(deployer.address);
  await badgeNFT.waitForDeployment();
  console.log("BadgeNFT deployed to:", await badgeNFT.getAddress());

  // 10. NFTMarketplace
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy(deployer.address);
  await nftMarketplace.waitForDeployment();
  console.log("NFTMarketplace deployed to:", await nftMarketplace.getAddress());

  // 11. EscrowManager
  const EscrowManager = await hre.ethers.getContractFactory("EscrowManager");
  const escrow = await EscrowManager.deploy(deployer.address);
  await escrow.waitForDeployment();
  console.log("EscrowManager deployed to:", await escrow.getAddress());

  // 12. CommunityGovernance
  const CommunityGovernance = await hre.ethers.getContractFactory("CommunityGovernance");
  const governance = await CommunityGovernance.deploy(deployer.address);
  await governance.waitForDeployment();
  console.log("CommunityGovernance deployed to:", await governance.getAddress());

  console.log("\n✅ All 12 contracts deployed successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
