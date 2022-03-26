import { InvestinClient, raydiumPools, orcaPools, COINGECKO_TOKEN } from "@investin/client-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { Fund } from "../helpers";

interface Token {
  symbol: string
  mint: PublicKey
  balance: number
  decimals: BN
}

function getTokenPrice(token: Token, prices: COINGECKO_TOKEN[]){
  const coinSymbol = [...raydiumPools, ...orcaPools].find(p => p.coin.mintAddress == token.mint.toBase58());
  let price;
  if (coinSymbol) {
    price = prices
      .find((p) =>
        p.symbol.toLowerCase() == coinSymbol.coin.symbol.toLowerCase()
      );
  }
  return price;
}

export const getFunds = async (connection: Connection, owner: PublicKey): Promise<Fund[]> => {
  const investinClient = new InvestinClient(connection);
  const investments = await investinClient.getInvestmentsByInvestorAddress(owner);
  const prices = await investinClient.fetchAllTokenPrices();

  const funds: Fund[] = investments
    .map((fund, index) => ({
      fundBalance: 0,
      tableData: {
        key: index,
        platform: "Investin",
        fundName: fund.fundName.toString(),
        performance: fund.currentPerformance.toFixed(2),
        value: fund.amount.valueOf() + fund.amountInRouter.valueOf(),
      },
      composition: fund.tokens.map((t) => ({
        amount: t.balance.valueOf()/1000000,
        ticker: t.symbol,
        price: t.symbol == 'USDC' ? 1 : getTokenPrice(t, prices)?.price,
        weighting: 0,
      }))
    })
  );
  funds.forEach((f) => {
    f.composition.forEach((c) => {
      if (c.price && c.amount) {
        f.fundBalance += c.price * c.amount;
      }
    });
  });
  funds.forEach((f) => {
    f.composition.forEach((c) => {
      if (c.price && c.amount) {
        c.weighting = c.price * c.amount / f.fundBalance;
      }
    });
  });

  return funds;
}
