/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Button, Col, Collapse, Row } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';

export const Body: React.FC = () => {
  const { Panel } = Collapse;

  return (
    <Layout>
      <Sider>
      </Sider>
      <Layout>
        <Header>
          Navbar
        </Header>
        <Content>
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
                        className='icon-header'
                      >
                        <img src="" />
                        <span>Managed Funds</span>
                        <span>(Investin data here)</span>
                      </div>
                    } 
                    role="button" 
                    key="1"
                  >
                    <p>
                      placeholder
                    </p>
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