const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgentWallet", function () {
  let AgentWallet, agentWallet;
  let owner, agent, user, other;

  beforeEach(async function () {
    [owner, agent, user, other] = await ethers.getSigners();

    AgentWallet = await ethers.getContractFactory("AgentWallet");
    agentWallet = await AgentWallet.deploy(owner.address, agent.address);
    await agentWallet.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await agentWallet.owner()).to.equal(owner.address);
    });

    it("Should set the right initial agent", async function () {
      expect(await agentWallet.aiAgent()).to.equal(agent.address);
    });
  });

  describe("Treasury Management", function () {
    it("Should accept deposits", async function () {
      const depositAmount = ethers.parseEther("1.0");
      
      await expect(
        owner.sendTransaction({
          to: await agentWallet.getAddress(),
          value: depositAmount,
        })
      ).to.changeEtherBalances([owner, agentWallet], [-depositAmount, depositAmount]);

      expect(await agentWallet.getTreasuryBalance()).to.equal(depositAmount);
    });

    it("Should allow owner to withdraw", async function () {
      const depositAmount = ethers.parseEther("1.0");
      await owner.sendTransaction({ to: await agentWallet.getAddress(), value: depositAmount });

      await expect(agentWallet.connect(owner).withdrawTreasury(depositAmount))
        .to.changeEtherBalances([agentWallet, owner], [-depositAmount, depositAmount]);
    });

    it("Should NOT allow non-owners to withdraw", async function () {
      const depositAmount = ethers.parseEther("1.0");
      await owner.sendTransaction({ to: await agentWallet.getAddress(), value: depositAmount });

      // In OpenZeppelin v5, Custom Errors are used instead of string messages
      await expect(
        agentWallet.connect(other).withdrawTreasury(depositAmount)
      ).to.be.revertedWithCustomError(agentWallet, "OwnableUnauthorizedAccount");
    });
  });

  describe("Agent Rewards", function () {
    const rewardAmount = ethers.parseEther("0.02");

    beforeEach(async function () {
      // Fund the treasury
      await owner.sendTransaction({ to: await agentWallet.getAddress(), value: ethers.parseEther("1.0") });
    });

    it("Should allow the Agent to issue a reward", async function () {
      await expect(
        agentWallet.connect(agent).verifyAndReward(user.address, rewardAmount)
      ).to.changeEtherBalances([agentWallet, user], [-rewardAmount, rewardAmount]);

      expect(await agentWallet.userRewards(user.address)).to.equal(rewardAmount);
    });

    it("Should NOT allow non-agents to issue a reward", async function () {
      await expect(
        agentWallet.connect(other).verifyAndReward(user.address, rewardAmount)
      ).to.be.revertedWith("Only AI Agent can call this");
    });

    it("Should allow owner to change the active agent", async function () {
      await agentWallet.connect(owner).setAIAgent(other.address);
      expect(await agentWallet.aiAgent()).to.equal(other.address);

      // New agent should be able to reward
      await expect(
        agentWallet.connect(other).verifyAndReward(user.address, rewardAmount)
      ).to.changeEtherBalances([agentWallet, user], [-rewardAmount, rewardAmount]);

      // Old agent should fail
      await expect(
        agentWallet.connect(agent).verifyAndReward(user.address, rewardAmount)
      ).to.be.revertedWith("Only AI Agent can call this");
    });
  });
});
