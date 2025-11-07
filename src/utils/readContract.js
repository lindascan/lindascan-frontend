import { StringToBytes, ArrayNumToBytes } from "./readContractDataType";
export function formatInput(inputValue, inputType) {
  if (inputType.indexOf("[") > -1) {
    if (Array.isArray(JSON.parse(inputValue))) {
      let arrayType = inputType.slice(0, inputType.indexOf("["));
      let arrayInput = JSON.parse(inputValue).map(item => {
        return formatInput(item, arrayType)
      });
      return arrayInput;
    } else {
      throw "Array is expected. Ex: [1,2,3]";
    }
  }
  else {
    if (inputType.indexOf("bytes") > -1) {
      let numByte = Number(inputType.substr(5));
      try {
        if (Array.isArray(JSON.parse(inputValue))) {
          return ArrayNumToBytes(JSON.parse(inputValue), numByte)
        } else {
          throw "treat as string";
        }
      } catch (e) {
        //if error treat like string
        return StringToBytes(inputValue, numByte);
      }
    }
    else {
      return inputValue;
    }
  }
}

export function getLindaExplorer() {
  if (!window.lindaWeb) {
    return "";
  }
  return window.lindaWeb.eventServer.host.indexOf("shasta") > 0 ? "https://shasta.lindascan.org/#" : "https://lindascan.org/#";
}

export function getCurrentNet() {
  if (!window.lindaWeb) {
    return "";
  }
  return window.lindaWeb.eventServer.host.indexOf("shasta") > 0 ? "testnet" : "mainnet";
}

export function formatOutput(value, type) {
  if (type.indexOf("[") > -1) {
    return value.map(item => {
      let itemType = type.slice(0, type.indexOf("["))
      return formatOutput(item, itemType)
    })
  }
  if (type == "address") {
    return window.lindaWeb.address.fromHex(value);
  } else if (type.indexOf("uint") > -1) {
    return Number(value.toString()).toLocaleString();
  } else if (type.indexOf("byte") > -1 || type == "string") {
    return value;
  } else {

    return JSON.stringify(value);
  }
}
