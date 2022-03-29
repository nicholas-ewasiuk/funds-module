/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useConnectedWallet, useSolana } from '@saberhq/use-solana';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';

import { WalletButton } from './components/WalletButton';
import { ManagedFunds } from './components/ManagedFunds';
import { getFunds } from './actions/getFunds';
import { Fund } from './helpers';


export const Body: React.FC = () => {
  const [ managedFunds, setManagedFunds ] = useState<Fund[] | undefined>(undefined);

  const { connection, network, setNetwork } = useSolana();
  const wallet = useConnectedWallet();

  const refetchFunds = useCallback(async () => {
    setNetwork('mainnet-beta');
    console.log(network);
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
      <Sider 
        css={css`background-color: #000;`}
        width={240}>
      </Sider>
      <Layout>
        <StepHeader>
          <WalletButton 
            wallet={wallet}
            onClick={refetchFunds}/>
        </StepHeader>
        <StepContent>
          <ManagedFunds 
            funds={managedFunds}
            keyProp={"1"}
          />
        </StepContent>
      </Layout>
    </Layout>
  );
};

const StepContent = styled(Content)`
  position: relative;
  width: 100;
  max-width: 75vw;
  padding: 0 18px;
  margin: 50px 0 0 0;
  .ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
    padding: 0px !important;
  }
`;

const StepHeader = styled(Header)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0 50px 0 50px;
  background-color: #000;
`;