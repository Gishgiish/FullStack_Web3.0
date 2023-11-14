const main = async () => {
  //generate instances of the contract
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy({
    //value: hre.ethers.parseEther("0.001"),
  });

  await transactions.deployed();

  console.log("Transactions deployed to address: ", transactions.address);
};

const runMain = async () => {
  try {
    await main();
    //if process went successfully
    process.exit(0);
  } catch (error) {
    console.error(error);
    //if process fails
    process.exit(1);
  }
};

runMain();
