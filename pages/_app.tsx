import '../styles/globals.css'
import { FC } from 'react';
import type { AppProps } from 'next/app'
import { WalletKitProvider } from '@gokiprotocol/walletkit';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <WalletKitProvider
      defaultNetwork='mainnet-beta'
      app={{
        name: 'Managed Funds',
      }}
    >
      <Component />
    </WalletKitProvider>
  );
};

export default App
