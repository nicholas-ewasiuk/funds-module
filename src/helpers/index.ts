export interface TableData {
  key: number
  platform: string
  fundName: string
  performance: string
  value: string
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
  tooltipData: TooltipData[]
}
