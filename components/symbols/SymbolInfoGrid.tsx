import { CandleOHLCV } from '@/interfaces/atmos';
import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SymbolInfoItem from './SymbolInfoItem';

type Props = {
  symbolInfos: CandleOHLCV[];
};

const SymbolInfoGrid = ({ symbolInfos }: Props) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
      {symbolInfos.map((symbolInfo, index) => (
        <SymbolInfoItem key={index} symbolInfo={symbolInfo} />
      ))}
    </SimpleGrid>
  );
};

export default SymbolInfoGrid;
