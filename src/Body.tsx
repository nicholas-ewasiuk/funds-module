/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Button, Col, Collapse, Row, Table } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { BulbIcon } from './components/images/BulbIcon';
import { InfoIcon } from './components/images/InfoIcon';

export const Body: React.FC = () => {
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
            & > span {
              margin: 0 0 5px 0;
              font-weight: bold;
            }
          `}
        >
          <span>{value}</span>
          <div css={cell_row}>
            <span>Across X Assets</span>
            <InfoIcon />
          </div>
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

  return (
    <Layout>
      <Sider width={240}>
      </Sider>
      <Layout>
        <Header>
          Navbar
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
                    dataSource={fakeDataSource}
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