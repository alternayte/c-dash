import { SymbolPair } from '@/interfaces/atmos';
import { getIcon } from '@/styles/crypto-icons';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
import React from 'react';

type Props = {
  symbol: SymbolPair;
};

const SymbolsListItem = ({ symbol: { baseAsset, quoteAsset, symbol, status } }: Props) => {
  return (
    <div>
      <AvatarGroup>
        <Avatar name={baseAsset} src={getIcon(baseAsset)} />
        <Avatar name={quoteAsset} src={getIcon(quoteAsset)} />
      </AvatarGroup>
      {symbol} - status: {status}
    </div>
  );
};

export default SymbolsListItem;
