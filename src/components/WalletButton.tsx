/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useWalletKit } from '@gokiprotocol/walletkit';
import { ConnectedWallet } from '@saberhq/use-solana';
import { Button } from 'antd';

type Props = {
  wallet: ConnectedWallet | null;
}

export const WalletButton = ({ wallet }: Props) => {
  const { connect } = useWalletKit();

  return (
    <>
    { wallet ? (
      <Button css={connected}>
        {wallet.publicKey.toString().slice(0,4) + '...' + wallet.publicKey.toString().slice(-4)}
      </Button>
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