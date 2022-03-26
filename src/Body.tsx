/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Button, Col, Collapse, List, Popover, Row, Table, Tooltip } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { useConnectedWallet, useSolana } from '@saberhq/use-solana';
import { WalletButton } from './components/WalletButton';
import { BulbIcon } from './components/images/BulbIcon';
import { InfoIcon } from './components/images/InfoIcon';
import { getFunds } from './actions/getFunds';
import { InvestinClient, INVESTMENT_MODEL } from '@investin/client-sdk';
import { Fund } from './helpers';

export const Body: React.FC = () => {
  const [ managedFunds, setManagedFunds ] = useState<Fund[] | undefined>(undefined);
  const { connection, network } = useSolana();
  const wallet = useConnectedWallet();

  /*
  const refetchFunds = useCallback(async () => {
    if (wallet) {
      const funds = await getFunds(connection, wallet.publicKey);
      console.log(funds);
      setManagedFunds(funds);
    }
  }, [wallet]);
*/
  const refetchFunds = useCallback(async () => {
    if (wallet) {
      const investinClient = new InvestinClient(connection);
      const funds = await investinClient.getInvestmentsByInvestorAddress(wallet.publicKey);
      console.log(funds);
    }
  }, [wallet]);

  const { Panel } = Collapse;


  const fakeDataSource = [
    {
      key: '1',
      platform: 'Investin',
      name: 'Stablecoin Lending',
      performance: '4.34%',
      value: '$33,204.10'
    },
    {
      key: '2',
      platform: 'Investin',
      name: 'Meme Coin Index',
      performance: '101.07%',
      value: '$5,569.12'
    },
    {
      key: '3',
      platform: 'Investin',
      name: 'NFTs - High APY/Questionable Utility',
      performance: '204.12%',
      value: '$3,052.23'
    },
  ]

  const tooltipDataSource = [
    {
      key: '1',
      amount: '509.80',
      ticker: 'STEP',
      weighting: '33%',
    },
    {
      key: '2',
      amount: '403.02',
      ticker: 'USDC',
      weighting: '34%',
    },
    {
      key: '3',
      amount: '300.22',
      ticker: 'SOL',
      weighting: '32%',
    },
  ]

  const columns = [
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Fund Name',
      dataIndex: 'name',
      key: 'name',
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
      render: (value) => (
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
          <Tooltip 
            css={[cell_row, tooltip]}
            title={
              <>
                <span>Fund Composition</span>
                <List
                  dataSource={tooltipDataSource}
                  renderItem={item => 
                    <>
                      <List.Item css={list_item}>
                        <span>{item.amount}</span>
                        <span>{item.ticker}</span>
                        <span>{item.weighting}</span>
                      </List.Item>
                  </>
                  }
                />
              </>
            }
            placement='bottomRight'
          >
            <span>Across X Assets</span>
            <InfoIcon />
          </Tooltip>
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

  useEffect(() => {
    void refetchFunds();
    console.log(network);
  }, [refetchFunds]);

  useEffect(() => {

  }, [managedFunds])

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
                      <span css={css`margin: auto 35px auto auto;`}>$41,825.45</span>
                    </div>
                  } 
                  key="1"
                >
                  <Table
                    dataSource={managedFunds?.map(fund => fund.tableData)}
                    columns={columns} 
                  >
                  </Table>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
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