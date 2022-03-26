/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Button, Col, Row } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';

export const Body: React.FC = () => {
  return (
    <Layout>
      <Header>
        header
      </Header>
      <Content>
        <Row>
          <Col>Content</Col>
        </Row>
        <Row>
          content
        </Row>
        <Row>
          content
        </Row>
      </Content>
    </Layout>
  );
};