import { InvestinClient, raydiumPools, orcaPools, COINGECKO_TOKEN } from "@investin/client-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { Fund } from "../helpers";
import { SolanaFunds } from "../helpers/solanaFunds";

interface Token {
  symbol: string
  mint: PublicKey
  balance: number
  decimals: BN
}

const getTokenPrice = (
  token: Token, 
  prices: COINGECKO_TOKEN[]
) => {
  const coinSymbol = [...raydiumPools, ...orcaPools].find(p => p.coin.mintAddress == token.mint.toBase58());
  let price;
  if (coinSymbol) {
    price = prices
      .find((p) =>
        p.symbol.toLowerCase() == coinSymbol.coin.symbol.toLowerCase()
      );
  }
  return price;
};

const getFundName = (
  fundAddress: string,
  funds: any[]
): string => {
  const fund = funds.find((f) => 
    fundAddress == f.address)
  return fund.name;
};


/**
 * Retrieve's fund account data and maps it to Fund object. 
 * Compare's fund address to fund name from Investin server data. 
 * Not exposed in investin/client-sdk, currently using snapshot from 
 * https://capitalfund-api-1-8ftn8.ondigitalocean.app/solanaFunds.
 * 
 * @param connection 
 * @param owner 
 * @returns 
 */
export const getFunds = async (
  connection: Connection, 
  owner: PublicKey
): Promise<Fund[]> => {
  const investinClient = new InvestinClient(connection);
  const investments = await investinClient.getInvestmentsByInvestorAddress(owner);
  const prices = await investinClient.fetchAllTokenPrices();
  
  const funds: Fund[] = investments
    .map((fund, index) => ({
      fundBalance: 0,
      tableData: {
        key: index,
        platform: 'Investin',
        fundName: { title: getFundName(fund.fundAddress, SolanaFunds), address: fund.fundAddress },
        performance: fund.currentPerformance.toFixed(2)+'%',
        value: fund.status === 'inActive' ? fund.amountInRouter.toString() : fund.currentReturns.toString(),
      },
      tooltipData: fund.tokens.map((t) => ({
        amount: t.balance.valueOf()/1000000,
        ticker: t.symbol,
        price: t.symbol == 'USDC' ? 1 : getTokenPrice(t, prices)?.price,
        weighting: 0,
      }))
    })
  );
  funds.forEach((f) => {
    f.tooltipData.forEach((t) => {
      if (t.price && t.amount) {
        f.fundBalance += t.price * t.amount;
      }
    });
  });
  funds.forEach((f) => {
    f.tooltipData.forEach((t) => {
      if (t.price && t.amount) {
        t.weighting = t.price * t.amount / f.fundBalance * 100;
      }
    });
  });
  return funds;
};
