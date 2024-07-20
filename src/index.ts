import {ec} from "elliptic";
import {BlockChain} from "./blockChain";
import {Transaction} from "./transaction";

const elliptic = new ec('secp256k1');

const privateKey = elliptic.keyFromPrivate('privateKey');
const publicKey = privateKey.getPublic('hex');

const qcoin = new BlockChain(100, 2);

const tx1 = new Transaction(publicKey, 'publicKey2', 10);
qcoin.addTransaction(tx1)

console.log(qcoin.getBalance(publicKey))

qcoin.mine(publicKey)

console.log(qcoin.getBalance(publicKey))