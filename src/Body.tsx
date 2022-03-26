/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Col, Collapse, Row } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { useConnectedWallet, useSolana } from '@saberhq/use-solana';
import { WalletButton } from './components/WalletButton';
import { BulbIcon } from './components/images/BulbIcon';
import { getFunds } from './actions/getFunds';
import { Fund } from './helpers';
import { FundsTable } from './components/FundsTable';
import { InvestinClient } from '@investin/client-sdk';
import { PublicKey } from '@solana/web3.js';

export const Body: React.FC = () => {
  const [ managedFunds, setManagedFunds ] = useState<Fund[] | undefined>(undefined);

  const { connection, network } = useSolana();
  const wallet = useConnectedWallet();

  const { Panel } = Collapse;
  
  
  const refetchFundsOld = useCallback(async () => {
    if (wallet) {
      const address = new PublicKey('6KQDNrJoPJRa1UHX7C4Wf5FHgjvnswLMTePyUTySFKeQ')
      const investinClient = new InvestinClient(connection);
      const funds = await investinClient.getInvestmentsByInvestorAddress(address);
      console.log(funds);
    }
  }, [wallet]);

    useEffect(() => {
      void refetchFundsOld();
    }, [refetchFundsOld]);
  

  const calculateTotalBalance = (funds: Fund[] | undefined) => {
    if (funds) {
      let total = 0;
      funds.forEach((fund) => {
        total += parseInt(fund.tableData.value.slice(1), 10);
      });
      return total.toFixed(2);
    }
  };

  const refetchFunds = useCallback(async () => {
    if (wallet) {
      const funds = await getFunds(connection, wallet.publicKey);
      setManagedFunds(funds);
    }
  }, [wallet]);

  useEffect(() => {
    void refetchFunds();
  }, [refetchFunds]);

  return (
    <Layout>
      <Sider width={240}>
      </Sider>
      <Layout>
        <Header
          css={css`
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            & > button {
              margin-right: 20px;
            }
          `}
        >
          <WalletButton 
            wallet={wallet}
            onClick={refetchFunds}/>
        </Header>
        <Content
          css={css`
            position: relative;
            width: 100;
            max-width: 75vw;
            padding: 0 18px;
            margin: 50px 0 0 0;
            `}
          >
          <Row>
            <Col span={24}>
              <Collapse 
                bordered={false}
                expandIconPosition='right'
                ghost={true}
              >
                <Panel
                  header={
                    <div
                      css={css`
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 43.5px;
                        background-color: #000;
                        & > span {
                          font-size: 22px;
                          font-weight: bold;
                        }
                      `}
                    >
                      <div                             
                        css={css`
                          margin-right: 10px;
                        `}>
                        <BulbIcon width={27}/>
                      </div>
                      <span>Managed Funds</span>
                      <span css={css`margin: auto 35px auto auto;`}>
                        {managedFunds ? "$"+calculateTotalBalance(managedFunds) : "-- "}
                      </span>
                    </div>
                  } 
                  key="1"
                >
                  <FundsTable
                    tableData={managedFunds?.map(fund => fund.tableData)}
                    toolTipDataArr={managedFunds?.map(fund => fund.tooltipData)}
                   />
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};