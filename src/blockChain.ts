import {Block} from "./block";
import {Transaction} from "./transaction";

export class BlockChain {
    private chain: Block[]
    private pendingTransactions: Transaction[]

    private mineReward: number
    private mineDifficulty: number

    constructor(mineReward: number, mineDifficulty: number) {
        this.chain = [this.createGenesisBlock()]
        this.pendingTransactions = []
        this.mineReward = mineReward
        this.mineDifficulty = mineDifficulty
    }

    private getLatestBlock(): Block {
        return this.chain[this.chain.length - 1]
    }

    private addBlock(block: Block): void {
        this.chain.push(block)
    }

    mine(mineRewardAddress: string): void {
        if (this.pendingTransactions.length === 0)
            throw new Error("No pending transactions")

        const rewardTransaction = new Transaction("0", mineRewardAddress, this.mineReward)
        this.addTransaction(rewardTransaction)

        const block = new Block(this.pendingTransactions, this.getLatestBlock().hash)

        block.mine(this.mineDifficulty)

        this.addBlock(block)
    }

    addTransaction(transaction: Transaction): void {
        if (transaction.from === transaction.to)
            throw new Error("Invalid transaction")

        if (transaction.amount <= 0)
            throw new Error("Invalid transaction")

        if (this.getBalance(transaction.from) < transaction.amount)
            throw new Error("Insufficient balance")

        this.pendingTransactions.push(transaction)
    }

    getBalance(publicKey: string): number {
        let balance = 0

        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.from === publicKey)
                    balance -= transaction.amount

                if (transaction.to === publicKey)
                    balance += transaction.amount
            }
        }

        return balance
    }

    private createGenesisBlock(): Block {
        return new Block([], "0")
    }
}