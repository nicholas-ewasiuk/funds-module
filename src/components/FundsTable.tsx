/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from '@emotion/react';
import { Button, List, Table, Tooltip } from 'antd';
import { TableData, TooltipData } from '../helpers';
import { InfoIcon } from "./images/InfoIcon";
import { ColumnsType } from "antd/lib/table";

type Props = {
  tableData: TableData[] | undefined
  toolTipDataArr: TooltipData[][] | undefined
}

export const FundsTable = ({ tableData, toolTipDataArr }: Props) => {
  const [ columns, setColumns ] = useState<ColumnsType<TableData> | undefined>(undefined);

  useEffect(() => {
    if (tableData && toolTipDataArr) {
      const columns: ColumnsType<TableData> = [
        {
          title: 'Platform',
          dataIndex: 'platform',
          key: 'platform',
        },
        {
          title: 'Fund Name',
          dataIndex: 'fundName',
          key: 'fundName',
        },
        {
          title: 'Fund Performance',
          dataIndex: 'performance',
          key: 'performance',
        },
        {
          title: 'Value of Your Position',
          key: 'value',
          dataIndex: 'value',
          align: 'right',
          render: (value, record) => (
            <div 
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <span
                css={css`
                  margin: 0 0 5px 0;
                  font-weight: bold;
                `}
              >
                {value}
              </span>
              { toolTipDataArr && 
              <Tooltip 
                css={[cell_row, tooltip]}
                title={
                  <>
                    <span>Fund Composition</span>
                    <List
                      dataSource={toolTipDataArr[record.key]}
                      renderItem={item => 
                        <>
                          <List.Item css={list_item}>
                            <span>{'$'+item.amount.toFixed(2)}</span>
                            <span>{item.ticker}</span>
                            <span>{item.weighting.toFixed(2)+'%'}</span>
                          </List.Item>
                      </>
                      }
                    />
                  </>
                }
                placement='bottomRight'
              >
                <span>Across {toolTipDataArr[record.key].length} Assets</span>
                <InfoIcon />
              </Tooltip>
              }
              <div css={cell_row}>
                <Button>
                  Step in
                </Button>
                <Button css={btn_secondary}>
                  Step out
                </Button>
              </div>
            </div>
          )
        },
      ]
      setColumns(columns);
    };
  }, [tableData, toolTipDataArr])

  return (
    <Table
      dataSource={tableData}
      columns={columns} 
    />
  );
};

const btn_secondary = css`
  margin: 0 0 0 10px;
  border-style: none;
  background-color: #3D3D3D;
  color: #B2B2B2;
  &:hover {
    background-color: #B2B2B2;
    color: #000;
  }
`;

const cell_row = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const tooltip = css`
  margin: 0 0 10px 0;
  & > span {
    margin-right: 5px;
    font-size: 10px;
    font-weight: normal;
  }
`

const list_item = css`
  display: flex;
  justify-content: space-around;
  width: 185px;
`