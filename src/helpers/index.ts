export interface TableData {
  key: number
  platform: string
  fundName: string
  performance: string
  value: number
}

export interface IToken {
  amount: string
  ticker: string
  weighting: string
}


export interface Fund {
  tableData: TableData
  composition: IToken[]
}