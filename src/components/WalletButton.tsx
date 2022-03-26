/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useWalletKit } from '@gokiprotocol/walletkit';
import { ConnectedWallet } from '@saberhq/use-solana';
import { Button } from 'antd';
import { RefreshIcon } from './images/RefreshIcon';

type Props = {
  wallet: ConnectedWallet | null;
  onClick: React.MouseEventHandler;
}

export const WalletButton = ({ wallet, onClick }: Props) => {
  const { connect } = useWalletKit();

  return (
    <>
    { wallet ? (
      <>
        <Button css={connected}>
          {wallet.publicKey.toString().slice(0,4) + '...' + wallet.publicKey.toString().slice(-4)}
        </Button>
        <Button 
          css={[connected, css`
            padding: 0 7px 0 7px;
          `]}
          onClick={onClick}
        >
          <div css={css`display: flex;`}>
          <RefreshIcon width={20} height={20}/>
          </div>
        </Button>
      </>
    ) : (
      <Button
        onClick={connect}
      >
        Connect Wallet
      </Button>
    )}
    </>
  )
}

const connected = css`
  background-color: #141414;
  & > span {
    font-size: 14px;
    font-weight: 400;
  }
`;