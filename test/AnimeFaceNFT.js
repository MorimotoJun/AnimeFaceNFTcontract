const { assert } = require("hardhat");

const AnimeFace = artifacts.require("AnimeFaceNFT");

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("AnimeFaceNFT contract", function () {
  let accounts;

  before(async function () {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
  });

  describe("Deployment", function () {
    it("Should deploy with correct name and owner", async function () {
      const nft = await AnimeFace.new();
      assert.equal(await nft.name(), "AnimeFaceNFT");
      assert.equal(await nft.owner(), accounts[0]);
    });
  });

  describe("Mint", function () {
    it("Should be minted correctly", async function () {
      const nft = await AnimeFace.new();
      let res = await nft.mintNFT(accounts[1], "DUMMY1");
      // console.log(res.logs[0].args.tokenId.words[0]);
      let tokenId = res.logs[0].args.tokenId.words[0];
      assert.equal(await nft.tokenURI(tokenId), "https://gateway.pinata.cloud/ipfs/DUMMY1");
      assert.equal((await nft.balanceOf(accounts[1])).words[0], 1);
      // 増やしてみても同様
      res = await nft.mintNFT(accounts[1], "DUMMY2");
      tokenId = res.logs[0].args.tokenId.words[0];
      assert.equal(await nft.tokenURI(tokenId), "https://gateway.pinata.cloud/ipfs/DUMMY2")
      assert.equal((await nft.balanceOf(accounts[1])).words[0], 2);
    });
  });

  describe("isApprovedForAll", function () {
    it("Should be return correct answer", async function () {
      const nft = await AnimeFace.new();
      await nft.mintNFT(accounts[1], "DUMMY"); // "DUMMY"というIPFS hashをtokenURIに埋め込まれたNFTをmint。accounts[1]のwalletに入る
      // Openseaのアドレスには全てのトークンの転送権限が全て移譲される
      assert.equal(await nft.isApprovedForAll(accounts[1], accounts[0]), false);
      assert.equal(await nft.isApprovedForAll(accounts[1], "0x58807baD0B376efc12F5AD86aAc70E78ed67deaE"), true);
    });
  });

  describe("ownedTokens", function() {
    it("Should be return correct URIs", async function() {
      const nft = await AnimeFace.new();
      await nft.mintNFT(accounts[1], "DUMMY1"); // "DUMMY1"というIPFS hashをtokenURIに埋め込まれたNFTをmint。accounts[1]のwalletに入る
      await nft.mintNFT(accounts[2], "DUMMY2"); // "DUMMY2"というIPFS hashをtokenURIに埋め込まれたNFTをmint。accounts[1]のwalletに入る
      await nft.mintNFT(accounts[3], "DUMMY3"); // "DUMMY3"というIPFS hashをtokenURIに埋め込まれたNFTをmint。accounts[1]のwalletに入る
      await nft.mintNFT(accounts[4], "DUMMY4"); // "DUMMY4"というIPFS hashをtokenURIに埋め込まれたNFTをmint。accounts[1]のwalletに入る
      // Openseaのアドレスには全てのトークンの転送権限が全て移譲される
      assert.deepStrictEqual(await nft.ownedTokens(), [
        'https://gateway.pinata.cloud/ipfs/DUMMY1',
        'https://gateway.pinata.cloud/ipfs/DUMMY2',
        'https://gateway.pinata.cloud/ipfs/DUMMY3',
        'https://gateway.pinata.cloud/ipfs/DUMMY4',
      ]);
    })
  })
});