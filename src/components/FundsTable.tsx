/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import { Button, Table } from 'antd';
import { ColumnsType } from "antd/lib/table";

import { FundTooltip } from './FundTooltip';
import { TableData, TooltipData } from '../helpers';
import images from '../assets/index';

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
          render: (platform) => (
            <div 
              css={css`
                display: flex;
                align-items: flex-start;
              `}
            >
              <img 
                css={css`
                  width: 28px;
                  margin: 0 10px 0 0;
                `}
                src={images.investin_logo}
              />
              <span>{platform}</span>
            </div>
          )
        },
        {
          title: 'Fund Name',
          dataIndex: 'fundName',
          key: 'fundName',
          render: (fundName) => (
            <a
              css={css`
                color: #00f8b7;
              `}
              href={`https://sol.beta.investin.pro/fund-details/${fundName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {fundName.slice(0,4) + '...' + fundName.slice(-4)}
            </a>
          )
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
                {'$'+parseFloat(value).toFixed(2)}
              </span>
              { toolTipDataArr && 
                <FundTooltip 
                  tooltipData={toolTipDataArr[record.key]}
                />
              }
              <div css={css`
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-end;
                  align-items: center;
                `}
              >
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
    <StepTabs
      dataSource={tableData}
      columns={columns}
      pagination={false}
    />
  );
};

const StepTabs = styled(Table)`
  .ant-table-content > table {
    border-collapse: separate;
    border-spacing: 0px 10px;
  }
  .ant-table-thead > tr > th {
    border: none;
    background-color: inherit;
    font-weight: normal;
    color: #B2B2B2;
    user-select: none;
    &::before {
      visibility: hidden;
    }
  }
  .ant-table-thead > tr > th:first-child {
    padding-left: 0px;
  }
  .ant-table-thead > tr > th:last-child {
    padding-right: 0px;
  }
  .ant-table-tbody > tr > td {
    vertical-align: top;
    padding: 16px;
    border: none;
    background-color: #202020;
  }
  .ant-table-tbody > tr:hover > td {
    vertical-align: top;
    padding: 16px;
    border: none;
    background-color: #202020;
  }
`;

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