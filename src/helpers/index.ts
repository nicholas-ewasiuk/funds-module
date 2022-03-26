export interface TableData {
  key: number
  platform: string
  fundName: string
  performance: string
  value: number
}

export interface TooltipData {
  amount: number
  ticker: string
  price: number | undefined
  weighting: number
}


export interface Fund {
  fundBalance: number
  tableData: TableData
  composition: TooltipData[]
}