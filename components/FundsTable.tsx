/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import { Table } from 'antd';
import { ColumnsType } from "antd/lib/table";

import { PositionTools } from './PositionTools';
import { TableData, TooltipData } from '../helpers';
import images from '../assets/index';
import Image from "next/image";

type Props = {
  tableData: TableData[] | undefined
  tooltipDataArr: TooltipData[][] | undefined
}

export const FundsTable = ({ tableData, tooltipDataArr }: Props) => {
  const [ columns, setColumns ] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (tableData && tooltipDataArr) {
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
              <Image 
                src={images.investin_logo}
                alt="Investin"
                width={28}
                height={28}
              />
              <span css={css`margin-left: 7px;`}>{platform}</span>
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
                color: #06D6A0;
                &:hover {
                  color: #07a87e;
                }
              `}
              href={`https://sol.beta.investin.pro/fund-details/${fundName.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {fundName.title}
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
            <PositionTools
              tooltipDataArr={tooltipDataArr}
              value={value}
              recordKey={record.key}
            />
          )
        },
      ]
      setColumns(columns);
    };
  }, [tableData, tooltipDataArr])

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
  .ant-table-thead > tr > th:first-of-type {
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
