import {Transaction} from "./transaction";
import * as crypto from "node:crypto";

export class Block {
    hash: string
    previousHash: string
    transactions: Transaction[]
    timestamp: number
    nonce: number

    constructor(transactions: Transaction[], previousHash: string) {
        this.previousHash = previousHash
        this.transactions = transactions
        this.timestamp = Date.now()
        this.nonce = 0
        this.hash = this.calculateHash()
    }

    mine(difficulty: number): void {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash()
        }

    }

    private calculateHash(): string {
        return crypto
            .createHash('sha256')
            .update(this.previousHash + this.nonce + this.timestamp + JSON.stringify(this.transactions))
            .digest('hex')
    }
}