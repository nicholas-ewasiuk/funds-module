/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Button, Col, Collapse, Row, Table } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { BulbIcon } from './components/images/BulbIcon';

export const Body: React.FC = () => {
  const { Panel } = Collapse;

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
            min-height: calc(100vh - 75px);
            padding: 0 18px;
            margin: 50px 0 0 0;
            `}
          >
          <Row>
            <Col span={24}>
              <div id="funds">
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
                        <span css={css`margin: auto 35px auto auto;`}>(Investin data here)</span>
                      </div>
                    } 
                    key="1"
                  >
                    <Table>
                      
                    </Table>
                  </Panel>
                </Collapse>
              </div>
            </Col>
          </Row>
          <Row>
            content
          </Row>
          <Row>
            content
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};