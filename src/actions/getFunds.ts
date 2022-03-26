import { InvestinClient } from "@investin/client-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import { TableData } from "../helpers";

export const getFunds = async (connection: Connection, owner: PublicKey): Promise<TableData[]> => {
  const investinClient = new InvestinClient(connection);
  const funds = await investinClient.getInvestmentsByInvestorAddress(owner);

  return funds
    .map((fund, index) => ({
      key: index,
      platform: "Investin",
      fundName: fund.fundName.toString(),
      performance: fund.currentPerformance.toFixed(2),
      value: fund.amount.valueOf() + fund.amountInRouter.valueOf(),
    }));
}

/*
return funds
.map((fund, index) => ({
  tableData: {
    key: index,
    platform: "Investin",
    fundName: fund.fundName.toString(),
    performance: fund.currentPerformance.toFixed(2),
    value: fund.amount.valueOf() + fund.amountInRouter.valueOf(),
  },
  composition: 
    fund.tokens.map((t) => {
      amount: t.balance.toFixed(4),
      ticker: t.symbol,
      weighting: "33%",
    })
  }
  */