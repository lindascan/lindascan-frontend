import xhr from "axios";

export class LindaNetworkClient {

  async getMarketInfo() {
    let {data} = await xhr.get(`https://lindacoin.org/api/v1/market_info`);
    return data.data;
  }
}
