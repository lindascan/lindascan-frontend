import Lockr from "lockr";
import uuidv4w from "uuid/v4";
/**
 * 1000000 sun = 1 LIND
 */
export const ONE_LIND = 1000000;

export const IS_TESTNET = process.env.NET === "testnet";
export const IS_DESKTOP = process.env.DESKTOP === "true";

export const NETURL = {
NEWMAINNET: "https://tronscan.io",
  NEWSUNNET: "https://dappchain.tronscan.io",
  // MAINNET: "http://18.217.215.94:65",
  // SUNNET: "http://18.217.215.94:66",
  // MAINNET: "https://debug.tronscan.org",
  // SUNNET: "https://debugdappchain.tronscan.org",
  MAINNET: "https://tronscan.org",
  SUNNET: "https://dappchain.tronscan.org",
};

export const TOKENINFO_UPDATE = "TOKENINFO_UPDATE";

let { NET, NODE_ENV } = process.env;
let MAINNET;
let SUNNET;
let NODEAPI;

if (NODE_ENV == "development") {
  MAINNET = Lockr.get("NET") === "mainnet" || !Lockr.get("NET");
  SUNNET = Lockr.get("NET") === "sunnet";
  // NODEAPI = "https://tronexapi.tronscan.org";
  // NODEAPI = "http://18.222.181.154:9017"
  NODEAPI = process.env.API_URL;
} else {
  MAINNET =
    window.location.origin === NETURL.MAINNET ||
    window.location.origin === NETURL.NEWMAINNET;
  SUNNET =
    window.location.origin === NETURL.SUNNET ||
    window.location.origin === NETURL.NEWSUNNET;
  NODEAPI = process.env.API_URL;
  // NODEAPI = "http://52.15.126.154:9016";
}

export let IS_MAINNET = MAINNET;
export let IS_SUNNET = SUNNET;

export const BLOCK_REWARD = 32;
export const SR_MAX_COUNT = 27;
export const WITNESS_CREATE_COST = 9999;
export const CIRCULATING_SUPPLY = 100000000000;
export const ASSET_ISSUE_COST = 1024 * ONE_LIND;

export const PUBLIC_URL = process.env.PUBLIC_URL || window.location.origin;
//export const API_URL = process.env.API_URL;
//test
//export const API_URL_SUNNET = 'http://3.15.181.169:9000';
//test pro
// export const API_URL_SUNNET = "http://52.15.68.74:10001";
// export const API_URL_SUNNET = "http://52.15.68.74:8898";


export const API_URL_SUNNET = "https://dappchainapi.tronscan.org";
// export const API_URL_SUNNET =  "http://3.15.181.169:9000"  //dappchain tronex
// export const API_URL_SUNNET = "https://debugdappchainapilist.tronscan.org";

export const API_URL = IS_SUNNET ? API_URL_SUNNET : process.env.API_URL;
export const CONTRACT_MAINNET_API_URL = process.env.API_URL;
export const CONTRACT_NODE_API = API_URL;
// export const CONTRACT_NODE_API = API_URL;
//Token issued
export const MARKET_API_URL = "https://platform.tron.network";

//poloniex.org
export const MARKET_HTTP_URL = "https://poloniex.org";

export const ACCOUNT_PRIVATE_KEY = "ACCOUNT_PRIVATE_KEY";
export const ACCOUNT_ADDRESS = "ACCOUNT_ADDRESS";
export const ACCOUNT_LEDGER = "ACCOUNT_LEDGER";
export const ACCOUNT_LINDALINK = "ACCOUNT_LINDALINK";

/**
 * USDJ = 1 USD
 */
export const ONE_USDJ = 1;
export const ONE_JST = 0.003;
export const TOKEN_ID_BTT = "1002000";
export const CONTRACT_ADDRESS_USDT = "LaN7YzfkFM5NYqLfQzu7pghm7K4xezNxiS";
export const CONTRACT_ADDRESS_WIN = "LVpmvFRVm9oXKikSayNgcyxvRrCw3JAbZa";
export const CONTRACT_ADDRESS_GGC = "LLPpWQUXEHTeCQ96RnPtEECo9HuD1BuihY";
export const CONTRACT_ADDRESS_USDJ_TESTNET = "LN1W5vidy4uycoXFDWra3LMEE1ymvuAcUd";
export const CONTRACT_ADDRESS_JED_TESTNET = "Ld5ZFvNRqFCqhMK17kkMrY1azXLtoYL4JK";
export const CONTRACT_ADDRESS_USDJ = "LXBzYhTSEWYaVH8cdtMAbPhgrfcMN7jZko";
export const CONTRACT_ADDRESS_JED = "LMW5bEa41VRjRR9SEjsYTss2F9xTeHFDym";
export const CONTRACT_ADDRESS_JST = "LMW5bEa41VRjRR9SEjsYTss2F9xTeHFDym";


// Deployment to compile
export const FILE_MAX_SIZE = 5 * 1024 * 1024;
export const FILE_MAX_NUM = 10;

// currency type
export const CURRENCYTYPE = {
  LIND: "LIND",
  LRC10: "LRC10",
  LRC20: "LRC20",
};

// mapping energy
export const MAPPINGFEE = 1000;
// feeLimit
export const FEELIMIT = 10000000;
// withdrawFee
export const WITHDRAWFEE = 10;
// depositFee
export const DEPOSITFEE = 0;
// retryFee
export const RETRYFEE = 0;
// deposi min lind
export const LINDDEPOSITMIN = 10;
// withdraw min lind
export const LINDWITHDRAWMIN = 10;
// deposi min trc
export const TRCDEPOSITMIN = 1;
// withdraw min trc
export const TRCWITHDRAWMIN = 1;

// trading type
export const TRADINGMAP = {
  MAPPING: "mapping",
  WITHDRAW: "withdraw",
  DEPOSIT: "deposit",
  APPROVE: "approve",
};

// SunWeb config
export const SUNWEBCONFIG = {
  // for main
  MAINFULLNODE: "https://api.trongrid.io",
  MAINSOLIDITYNODE: "https://api.trongrid.io",
  MAINEVENTSERVER: "https://api.trongrid.io",

  // MAINFULLNODE: "https://api.nileex.io",
  // MAINSOLIDITYNODE: "https://api.nileex.io",
  // MAINEVENTSERVER: "https://event.nileex.io",

  SUNFULLNODE: "https://sun.tronex.io",
  SUNSOLIDITYNODE: "https://sun.tronex.io",
  SUNEVENTSERVER: "https://sun.tronex.io",
  MAINNET: "LVQaNj9GDUicAxFunp5iZAnftcqfS8bLji",
  SIDECHAIN: "LRaZ9mjCUjbT6EBFTKXV8xb8peMCb87k1N",
  SIDEID: "30E209E4DE650F0150788E8EC5CAFA240A23EB8EB7",

  // for shasta
  // MAINFULLNODE: 'http://47.252.84.158:8070',
  // MAINSOLIDITYNODE: 'http://47.252.84.158:8071',
  // MAINEVENTSERVER: 'http://47.252.81.14:8070',
  // SUNFULLNODE: 'http://47.252.85.90:8070',
  // SUNSOLIDITYNODE: 'http://47.252.85.90:8071',
  // SUNEVENTSERVER: 'http://47.252.87.129:8070',
  // MAINNET: 'Ld8VbrnSw5skMhjutwMSqxLrnMJu3SwGoD',
  // SIDECHAIN: 'LaUQ671RjLFuUDt28xDPSorbC4Aj2FUKp2',
  // SIDEID: '303AF23F37DA0D48234FDD43D89931E98E1144481B',

  

  // for tronex
  // MAINFULLNODE: "https://testhttpapi.tronex.io",
  // MAINSOLIDITYNODE: "https://testhttpapi.tronex.io",
  // MAINEVENTSERVER: "https://testapi.tronex.io",

  // SUNFULLNODE: "https://suntest.tronex.io",
  // SUNSOLIDITYNODE: "https://suntest.tronex.io",
  // SUNEVENTSERVER: "https://suntest.tronex.io",

  // MAINNET: "TWaPZru6PR5VjgT4sJrrZ481Zgp3iJ8Rfo",
  // SIDECHAIN: "LRaZ9mjCUjbT6EBFTKXV8xb8peMCb87k1N",
  // SIDEID: "30E209E4DE650F0150788E8EC5CAFA240A23EB8EB7"
};

//Socket config
export const TORNSOCKET = {
  WSSURLMAIN: "wss://apilist.tronscan.org/api/tronsocket",
  WSSURLSUN: "wss://dappchainapi.tronscan.org/api/tronsocket",
};

// export const TORNSOCKET = {
//   WSSURLMAIN: "ws://52.15.68.74:10000/api/tronsocket",
//   WSSURLSUN: "ws://52.15.68.74:10001/api/tronsocket"
// };

// token type
export const TOKENTYPE = {
  TOKEN10: "lrc10",
  TOKEN20: "lrc20",
};

// market basic page
export const MARKETPAGE = {
  CREATE: "create",
  UPDATE: "update",
};

// market token verify status
export const VERIFYSTATUS = {
  HASBEENSUBMITTEDTHREE: -3,
  NOTRECORDED: -2, // No recorded
  HASBEENRECORDED: -1, // Has been recorded
  HASBEENSUBMITTED: 0, // Has been submitted
  NOTRECOMMENDED: 1, // not recommended
  TOAUDIT: 2, // to audit
  APPROVED: 3, // reviewed for recommendation
  RECOMMENDED: 4, // reviewed and recommended
  REJECTED: 5, // rejected
  SHELVES: 6, // Has been off the shelves
  CONFIRMED: 7, // Have been confirmed
  RECOMMENDEDFAILED: 8, // Review recommendation failed
};

// JSEncrypt key
export const JSENCRYPTKEY = `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCezlJJy/F7LO5+fmIcUjWq0APOILbzUEAcMyK/1VK7d5G0vb58thDtG0rK72uzFA1e0SByI2Hdqy0JbE8a2+cSIBN1y9iKw4WW5MJLBZXrMZmUjcgHYCbH7yjbDOOGCXtmINaNeLOcieLVvf7fDQaRAJniNuDgNtqjqtMuOFfApQIDAQAB-----END PUBLIC KEY-----`;

// market token entry fromId
export const FROMID = 1;

// url regexp
/* eslint-disable */
export const URLREGEXP = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\\/~+#]*[\w\-@?^=%&\\/~+#])?$/;

export const ADDRESS_SIZE = 34;
export const ADDRESS_PREFIX = "30";
export const ADDRESS_PREFIX_BYTE = 0x30;
export const ADDRESS_PREFIX_REGEX = /^(30)/;

// contract
export const CONTRACT_LICENSES = [
  "--",
  "None",
  "Unlicense",
  "MIT",
  "GNU GPLv2",
  "GNU GPLv3",
  "GNU LGPLv2.1",
  "GNU LGPLv3",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "MPL-2.0",
  "OSL-3.0",
  "Apache-2.0",
];

export const WARNING_VERSIONS = [];
export const uuidv4 = uuidv4w();

export const ADDRESS_TAG_ICON = [
  "Binance",
  "Bittrex",
  "Gate",
  "Huobi",
  "Kucoin",
  "Okex",
  "Poloniex",
  "Bitfinex",
];
