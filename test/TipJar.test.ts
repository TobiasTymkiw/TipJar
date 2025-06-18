import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("TipJar", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTipJarFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const TipJar = await hre.ethers.getContractFactory("TipJar");
    const tipJar = await TipJar.deploy();

    return { tipJar, owner, otherAccount };
  }
  //Check that you receive tips and send an event
  it("Should receive tips and emit an event", async function () {
    const { tipJar, owner, otherAccount } = await loadFixture(
      deployTipJarFixture
    );

    // Send a tip
    const tipAmount = hre.ethers.parseEther("0.1");
    const message = "Great job on the contract!";
    await expect(
      tipJar.connect(otherAccount).tip(message, { value: tipAmount })
    )
      .to.emit(tipJar, "NewTip")
      .withArgs(otherAccount.address, tipAmount, message);

    // Check the balance of the contract
    const contractBalance = await hre.ethers.provider.getBalance(tipJar);
    expect(contractBalance).to.equal(tipAmount);
  });
  //Check that only the owner can withdraw tips
  it("Should allow only the owner to withdraw tips", async function () {
    const { tipJar, owner, otherAccount } = await loadFixture(
      deployTipJarFixture
    );

    // Send a tip
    const tipAmount = hre.ethers.parseEther("0.1");
    await tipJar
      .connect(otherAccount)
      .tip("Great job on the contract!", { value: tipAmount });

    // Try to withdraw from another account
    await expect(tipJar.connect(otherAccount).withdraw()).to.be.revertedWith(
      "Not Authorized: you are not the owner"
    );
  });
  //Check the balance of the contract once the owner withdraws the tips
  it("Should allow the owner to withdraw tips", async function () {
    const { tipJar, owner, otherAccount } = await loadFixture(
      deployTipJarFixture
    );

    // Send a tip
    const tipAmount = hre.ethers.parseEther("0.1");
    await tipJar
      .connect(otherAccount)
      .tip("Great job on the contract!", { value: tipAmount });

    // Check the balance before withdrawal
    const contractBalanceBefore = await hre.ethers.provider.getBalance(tipJar);
    expect(contractBalanceBefore).to.equal(tipAmount);

    // Withdraw the tips
    const withdrawTx = await tipJar.connect(owner).withdraw();
    await withdrawTx.wait();

    // Check the balance after withdrawal
    const contractBalanceAfter = await hre.ethers.provider.getBalance(tipJar);
    expect(contractBalanceAfter).to.equal(0);
  }
  );
});
