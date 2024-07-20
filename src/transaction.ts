export class Transaction {
    from: string
    to: string
    amount: number
    timestamp: number

    constructor(from: string, to: string, amount: number) {
        this.from = from
        this.to = to
        this.amount = amount
        this.timestamp = Date.now()
    }
}