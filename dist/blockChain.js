"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChain = void 0;
const block_1 = require("./block");
const transaction_1 = require("./transaction");
class BlockChain {
    chain;
    pendingTransactions;
    mineReward;
    mineDifficulty;
    constructor(mineReward, mineDifficulty) {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.mineReward = mineReward;
        this.mineDifficulty = mineDifficulty;
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(block) {
        this.chain.push(block);
    }
    mine(mineRewardAddress) {
        if (this.pendingTransactions.length === 0)
            throw new Error("No pending transactions");
        const rewardTransaction = new transaction_1.Transaction("0", mineRewardAddress, this.mineReward);
        this.addTransaction(rewardTransaction);
        const block = new block_1.Block(this.pendingTransactions, this.getLatestBlock().hash);
        block.mine(this.mineDifficulty);
        this.addBlock(block);
    }
    addTransaction(transaction) {
        if (transaction.from === transaction.to)
            throw new Error("Invalid transaction");
        if (transaction.amount <= 0)
            throw new Error("Invalid transaction");
        if (this.getBalance(transaction.from) < transaction.amount)
            throw new Error("Insufficient balance");
        this.pendingTransactions.push(transaction);
    }
    getBalance(publicKey) {
        let balance = 100;
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.from === publicKey)
                    balance -= transaction.amount;
                if (transaction.to === publicKey)
                    balance += transaction.amount;
            }
        }
        return balance;
    }
    createGenesisBlock() {
        return new block_1.Block([], "0");
    }
}
exports.BlockChain = BlockChain;
