import { CandleOHLCV } from '@/interfaces/atmos';
import { getIcon } from '@/styles/crypto-icons';
import { Avatar, Box, HStack, Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

type Props = {
  symbolInfo: CandleOHLCV;
};

const SymbolInfoItem = ({ symbolInfo }: Props) => {
  return (
    <HStack borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Box as='span' mr='2'>
        <Avatar size='sm' name='SYMBOL' />
      </Box>
      <Stack spacing={1}>
        <Box as='span' fontWeight='semibold'>
          SYMBOL
        </Box>
        <Box as='span' fontWeight='semibold'>
          {symbolInfo.close}
        </Box>
      </Stack>
    </HStack>
  );
};

export default SymbolInfoItem;
