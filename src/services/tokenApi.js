import { API_URL_SUNNET, API_URL } from "../constants.js";
import xhr from "axios/index";
class ApiClientToken {
  constructor() {
    this.apiUrl = {
      mainnet: API_URL,
      sunnet: API_URL_SUNNET
    };
  }

  //get lind/usd price
  async getUsdPrice(){
    // let eurWinkLindabetURL = encodeURI(`https://api.coinmarketcap.com/v1/ticker/tronix/?convert=EUR`);
    // let lindPriceData = await xhr.get(`${API_URL}/api/system/proxy?url=${eurWinkLindabetURL}`);
    // let priceUSD = lindPriceData && lindPriceData.data && lindPriceData.data[0] && lindPriceData.data[0].price_usd;
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=LIND&convert=USD'
    let { data } = await xhr({
      method: "post",
      url: `${API_URL}/api/system/proxy`,
      data: {
        url
      }
    });
    let priceUSD = data.data &&
                    data.data.LIND &&
                    data.data.LIND.quote &&
                    data.data.LIND.quote['USD'] && 
                    data.data.LIND.quote['USD'].price
    return priceUSD
  }
  //get coinId
  async getCoinId(address, type) {
    let url = this.apiUrl[type || "mainnet"];
    let obj = { address };
    let { data } = await xhr({
      method: "get",
      url: `${url}/api/token/id-mapper`,
      params: obj
    });
    return data;
  }
   // get address number
   async getParticipateassetissue(params){
    let res = await xhr.get(`${API_URL}/api/tokens/participateassetissue`,{
      params:params} );
    let data = res && res.data
    return data
  }

  //get wink total supply
  async getWinkFund(){
    let res = await xhr.get(`${API_URL}/api/wink/fund`);
    return res && res.data
  }

   //get transfer Number
   async getTransferNumber(params){
    let res = await xhr.get(`${API_URL}/api/token_lrc20/transfers`,{
      params:params} );
    return res && res.data
  }

  //get transactioninfo
  async getTransactionInfo(id){
    const param = {
      value: id,
      visible: true
    }
    let res = await xhr.get('https://api.lindagrid.lindacoin.org/wallet/gettransactioninfobyid', {params:param});
    return res && res.data
  }
  async getTransaction(id){
    const param = {
      value: id,
      visible: true
    }
    let res = await xhr.get('https://api.lindagrid.lindacoin.org/wallet/gettransactionbyid', {params:param});
    return res && res.data
  }

}

export default new ApiClientToken();
