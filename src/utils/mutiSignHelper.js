import { byteArray2hexStr } from "@lindascan/client/src/utils/bytes";
export function getOperationsHexStrByContractIdArr(contractIdArr) {
    contractIdArr.sort(function(a,b){return a-b});
    let list = (contractIdArr.slice(0).slice(0));
    var operations = (function (s) {
        var a = []; while (s-- > 0)
            a.push(0); return a;
    })(32);
    list.forEach((function (operations) {
        return function (e) {
            operations[(e / 8 | 0)] |= (1 << e % 8);
        };
    })(operations));
    return byteArray2hexStr(operations);
}
function hex_to_bin(str) {
    let hex_array = [{ key: 0, val: "0000" }, { key: 1, val: "0001" }, { key: 2, val: "0010" }, { key: 3, val: "0011" }, { key: 4, val: "0100" }, { key: 5, val: "0101" }, { key: 6, val: "0110" }, { key: 7, val: "0111" },
    { key: 8, val: "1000" }, { key: 9, val: "1001" }, { key: 'a', val: "1010" }, { key: 'b', val: "1011" }, { key: 'c', val: "1100" }, { key: 'd', val: "1101" }, { key: 'e', val: "1110" }, { key: 'f', val: "1111" }]

    let value = ""
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < hex_array.length; j++) {
            if (str.charAt(i) == hex_array[j].key) {
                value = value.concat(hex_array[j].val)
                break
            }
        }
    }
    return value
}
export function getContractIdByHex(strHex) {
    const contractBin = hex_to_bin(strHex);
    let contractBinArr = contractBin.match(/\d{8}/g);
    contractBinArr = contractBinArr.map(item => {
        return item.split('').reverse().join('');

    })
    let contractStr = contractBinArr.join('');
    const contractIdArr = [];

    for (let i = 0; i < contractStr.length; i++) {
        if (parseInt(contractStr[i])) {
            contractIdArr.push(i);
        }
    }
    return contractIdArr;
}

function getAllContractTypes() {
    return {
        0: 'Account Create',
        1: 'LIND Transfer',
        2: 'LRC10 Transfer',
        // 3: 'VoteAssetContract',
        4: 'Vote',
        5: 'Representatives Create',
        6: 'LRC10 Issue',
        8: 'Representatives Info Update',
        9: 'LRC10 Issue Participate',
        10: 'Account Name Update',
        11: 'LIND Freeze',
        12: 'LIND Unfreeze',
        13: 'Reward Withdraw',
        14: 'LRC10 Unfreeze',
        15: 'LRC10 Parameters Update',
        16: 'Proposal Create',
        17: 'Proposal Approve',
        18: 'Proposal Cancel',
        // 19: 'SetAccountIdContract',
        // 20: 'CustomContract',
        // BuyStorageContract = 21,
        // BuyStorageBytesContract = 22,
        // SellStorageContract = 23,
        30: 'Smart Contract Create',
        31: 'Smart Contract Trigger (LRC20 Transfer)',
        // 32: 'GetContract',
        33: 'Contract Setting Update',
        41: 'Bancor Exchange Create',
        42: 'Bancor Exchange Inject',
        43: 'Bancor Exchange Withdraw',
        44: 'Bancor Transaction',
        45: 'Contract Energy Limit Update',
        46: 'Account Permissions Update',
        48: 'Contract ABI Clear',
        49: 'Representatives Brokerage Update',
    }
}
export function getContractTypesByGroup() {
    return [
        {
            key: 'Balance',
            value: [
                { name: 'TransferContract', value: 1,alias:'LIND Transfer'},
                { name: 'FreezeBalanceContract', value: 11,alias:'LIND Freeze' },
                { name: 'UnfreezeBalanceContract', value: 12,alias:'LIND Unfreeze' }
            ]
        },
        {
            key: 'Account',
            value: [
                { name: 'AccountCreateContract', value: 0 ,alias:'Account Create'},
                { name: 'AccountUpdateContract', value: 10,alias:'Account Name Update' },
                { name: 'AccountPermissionUpdateContract', value: 46,alias:'Account Permissions Update' }
            ]
        },
        {
            key: 'LRC10',
            value: [
                { name: 'TransferAssetContract', value: 2,alias:'LRC10 Transfer' },
                { name: 'ParticipateAssetIssueContract', value: 9,alias:'LRC10 Issue Participate' },
                { name: 'AssetIssueContract', value: 6 ,alias:'LRC10 Issue'},
                { name: 'UnfreezeAssetContract', value: 14,alias:'LRC10 Unfreeze' },
                { name: 'UpdateAssetContract', value: 15,alias:'LRC10 Parameters Update' }
            ]
        },
        {
            key: 'SmartContract',
            value: [
                { name: 'TriggerSmartContract', value: 31,alias:'Smart Contract Trigger (LRC20 Transfer)' },
                { name: 'CreateSmartContract', value: 30,alias:'Smart Contract Create' },
                { name: 'UpdateSettingContract', value: 33,alias:'Contract Setting Update' },
                { name: 'UpdateEnergyLimitContract', value: 45 ,alias:'Contract Energy Limit Update'},
                { name: 'ClearABIContract', value: 48,alias:'Contract ABI Clear' },
            ]
        },
        {
            key: 'Representatives',
            value: [
                { name: 'VoteWitnessContract', value: 4,alias:'Vote' },
                { name: 'WithdrawBalanceContract', value: 13,alias:'Reward Withdraw' },
                { name: 'ProposalCreateContract', value: 16 ,alias:'Proposal Create'},
                { name: 'ProposalApproveContract', value: 17,alias:'Proposal Approve' },
                { name: 'ProposalDeleteContract', value: 18 ,alias:'Proposal Cancel'},
                { name: 'WitnessCreateContract', value: 5,alias:'Representatives Create' },
                { name: 'WitnessUpdateContract', value: 8,alias:'Representatives Info Update' },
                { name: 'UpdateBrokerageContract', value: 49,alias:'Representatives Brokerage Update' }
            ]
        },
        {
            key: 'Bancor',
            value: [
                { name: 'ExchangeTransactionContract', value: 44,alias:'Bancor Transaction' },
                { name: 'ExchangeCreateContract', value: 41 ,alias:'Bancor Exchange Create'},
                { name: 'ExchangeInjectContract', value: 42,alias:'Bancor Exchange Inject' },
                { name: 'ExchangeWithdrawContract', value: 43,alias:'Bancor Exchange Withdraw' }
            ]
        }
    ]
}
export function getContractTypesByIds(ids) {
    const contractFilteredType = [];
    const allContractTypes = getAllContractTypes();
    let { entries } = Object;
    ids.forEach(id => {
        for (let [key, value] of entries(allContractTypes)) {
            if (id == key) {
                contractFilteredType.push({ id, value })
            }
        }
    })
    return contractFilteredType;
}

export function getContractTypesByHex(strHex) {
    const contractIds = getContractIdByHex(strHex);
    return getContractTypesByIds(contractIds);
}
