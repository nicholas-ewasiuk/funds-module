/** @jsxImportSource @emotion/react */
import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useConnectedWallet, useSolana } from '@saberhq/use-solana';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { getFunds } from '../actions/getFunds';

import { WalletButton } from '../components/WalletButton';
import { ManagedFunds } from '../components/ManagedFunds';
import { Fund } from '../helpers';


const Home: NextPage = () => {
  const [ managedFunds, setManagedFunds ] = useState<Fund[] | undefined>(undefined);

  const { connection, network, setNetwork, setEndpoints } = useSolana();
  const wallet = useConnectedWallet();

  const refetchFunds = async () => {
    if (wallet) {
      const funds = await getFunds(connection, wallet.publicKey);
      setManagedFunds(funds);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      console.log(`fetching Investin data`);
      refetchFunds();
    }, 25000);

    return () => clearInterval(timerId)
  }, [wallet]);

  useEffect(() => {
    setEndpoints({
      name: "genesysgo",
      endpoint: "https://ssc-dao.genesysgo.net/"
    } as any);
    setNetwork('genesysgo');
    console.log(network);
  }, [wallet]);

  return (
    <Layout>
      <StepSider 
        width={240}
        breakpoint='md'
      >
      </StepSider>
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

export default Home

const StepSider = styled(Sider)`
  background-color: #000;
`

const StepHeader = styled(Header)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0 50px 0 50px;
  background-color: #000;
`;

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

