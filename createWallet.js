//importando as dependencias
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const { BIP32Path } = require('bitcoinjs-lib/src/types');

//definir a rede
//bitcoin - rede principal - mainnet
//testnet - rede para testes
const network = bitcoin.networks.testnet;

//derivação carteira - HD (hierárquico deterministico)
const path = "m/49'/1'/0'/0";

//criação da senha mnemonica (seed)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//raiz da carteira HD
let root = bip32.fromSeed(seed, network);

//criando conta - par de keys publica/privada
let account = root.derivePath(path);
let node = account.derive(0).derive(0);


let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address;


console.log("Carteira Gerada");
console.log("endereço: ",btcAdress);
console.log("Chave Privada: ",node.toWIF());
console.log("Seed",mnemonic);












