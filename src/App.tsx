import React from 'react';
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import { Body } from './Body';
import './app.less';


const App: React.FC = () => {
  return (
    <WalletKitProvider
      defaultNetwork='mainnet-beta'
      app={{
        name: 'Managed Funds',
      }}
    >
      <Body />
    </WalletKitProvider>
  );
};

export default App;