import {FormattedNumber} from "react-intl";
import { cloneDeep } from 'lodash'
import React from "react";

export const lindaAddresses = [
  '282PCxWFrEVsPUxfCtjFyFRahYac2jJu1PA',
  '284sHPAPWKuhkNVC9v9thobcQbDjbymQztn',
  '27qr8bQChPS82jMCEHB7VfJoyCnJAC9FFso',
  '27vDnp8d6A9YnwvvaabtbmRt1Y1dfAthgSa',
];

export async function transactionResultManager(transaction, lindaWeb) {
  
  const signedTransaction = await lindaWeb.lind.sign(transaction, lindaWeb.defaultPrivateKey).catch(e => {
    console.log(e.toString());
    return false;
  });
  
  if (signedTransaction) {
    const broadcast = await lindaWeb.lind.sendRawTransaction(signedTransaction);
    if (!broadcast.result) {
      broadcast.result = false;
    }
    return broadcast;
  } else {
    return false;
  }
}
export async function transactionResultManagerByLedger(transaction, lindaWeb) {
  const signedTransaction = await lindaWeb.lind.sign(transaction, lindaWeb.defaultPrivateKey).catch(e => {
    console.log(e.toString());
    return false;
  });
  if (signedTransaction) {
    const broadcast = await lindaWeb.lind.sendRawTransaction(signedTransaction);
    if (!broadcast.result) {
      broadcast.result = false;
    }
    return { broadcast,signedTransaction };
  } else {
    return false;
  }
}

export async function transactionResultManagerSun(transaction, sunWeb) {
    //sign((transaction = false), (privateKey = this.sidechain.defaultPrivateKey), (useLindaHeader = true), (multisig = false));
   
    const signedTransaction = await sunWeb.sidechain.lind.sign(transaction, sunWeb.sidechain.defaultPrivateKey).catch(e => {
        return false;
    });
  
    if (signedTransaction) {
        const broadcast = await sunWeb.sidechain.lind.sendRawTransaction(signedTransaction);
        if (!broadcast.result) {
            broadcast.result = false;
        }
        return broadcast;
    } else {
        return false;
    }
}

export async function transactionMultiResultManager(unSignTransaction, lindaWeb, permissionId, permissionTime, HexStr) {
    //set transaction expiration time (1H-24H)
    const newTransaction = await lindaWeb.transactionBuilder.extendExpiration(unSignTransaction, (3600*permissionTime-60));
    if(unSignTransaction.extra){
      newTransaction.extra = unSignTransaction.extra;
    }
   
    //sign transaction
    const signedTransaction = await lindaWeb.lind.multiSign(newTransaction, lindaWeb.defaultPrivateKey , permissionId).catch(e => {
        console.log('e',e)
        return false;
    });
    //set transaction hex parameter value
    if(HexStr && signedTransaction){
        signedTransaction.raw_data.contract[0].parameter.value = HexStr;
    }
    // return transaction
    return signedTransaction;
}


export function FormattedLIND(props) {
  return (
    <FormattedNumber
      maximumFractionDigits={7}
      minimunFractionDigits={7}
      {...props} />
  );
}
