import React from 'react';
import { WalletKitProvider } from '@gokiprotocol/walletkit';
import { Body } from './Body';
import './index.css';


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