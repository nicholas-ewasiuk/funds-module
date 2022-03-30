/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Col, Collapse, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { BulbIcon } from './images/BulbIcon';
import { ArrowIcon } from './images/ArrowIcon';
import { FundsTable } from './FundsTable';
import { Fund } from "../helpers";

type Props = {
  funds: Fund[] | undefined
  keyProp: string
}

/**
 * Displays managed funds data for the connected user. 
 */
export const ManagedFunds = ({ funds, keyProp }: Props) => {

  const calculateTotalBalance = (funds: Fund[] | undefined) => {
    if (funds) {
      let total = 0;
      funds.forEach((fund) => {
        total += parseFloat(fund.tableData.value.slice());
      });
      return total.toFixed(2);
    }
  };  

  const { Panel } = Collapse;
  const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <Row>
    <Col span={24}>
      <StepCollapse 
        bordered={false}
        expandIconPosition='right'
        ghost={true}
      >
        <Panel
          header={
            <div css={table_header}>
              <div                             
                css={css`
                  margin-right: 10px;
                `}>
                <BulbIcon width={25}/>
              </div>
              <span>Managed Funds</span>
              <div css={css`margin: auto 40px auto auto;`}>
                { !funds && <Spin indicator={loadIcon} />}
                <span>
                  {funds ? "$"+calculateTotalBalance(funds) : "-- "}
                </span>
              </div>
              <div 
                css={css`padding-top: 4px;`}
                className='ant-collapse-arrow'
              >
                <ArrowIcon />
              </div>
            </div>
          } 
          key={keyProp}
          showArrow={false}
        >
          <FundsTable
            tableData={funds?.map(fund => fund.tableData)}
            tooltipDataArr={funds?.map(fund => fund.tooltipData)}
           />
        </Panel>
      </StepCollapse>
    </Col>
  </Row>
  );
};

const StepCollapse = styled(Collapse)`
  background-color: #141414;
  .ant-collapse-content-box {
    padding: 5px 30px 20px 30px !important;
  }
  div > .ant-collapse-header {
    padding: 0px;
    user-select: none;
  }
  .ant-collapse-item-active > div > div > .ant-collapse-arrow > svg {
    transform: scaleY(-1);
  }
  .ant-spin {
    color: #06D6A0;
  }
`;

const table_header = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 43.5px;
  background-color: #000;
  & > span {
    font-size: 22px;
    font-weight: bold;
  }
  & > div > span {
    margin-left: 10px;
    font-size: 22px;
    font-weight: bold;
  }
`;