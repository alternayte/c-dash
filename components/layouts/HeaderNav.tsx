import { SYMBOLS } from '@/api/atmos/symbols';
import { SymbolResults } from '@/interfaces/atmos';
import { symbolsAtom } from '@/store';
import { getIcon } from '@/styles/crypto-icons';
import { useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';

interface HeaderNavProps extends FlexProps {
  onOpen: () => void;
}
const HeaderNav = ({ onOpen, ...rest }: HeaderNavProps) => {
  const [search, setSearch] = useState('');
  const [symbolList, setSymbolList] = useAtom(symbolsAtom);
  const { loading, error, data } = useQuery<SymbolResults>(SYMBOLS, {
    variables: { exchange: 'Binance' },
  });

  useEffect(() => {
    if (data) {
      setSymbolList(data.symbols);
      console.log('set symbols');
    }
  }, [data]);

  const symbolFilter = (query) => {
    let filterTimeout;
    clearTimeout(filterTimeout);
    if (query.length > 0) {
      filterTimeout = setTimeout(() => {
        setSearch(query.toLowerCase());
        //console.log('set search', query, search);
        // setSymbolList(
        //   data.symbols.filter(symbol => {
        //     return symbol.symbol.toLowerCase().includes(query.toLowerCase());
        //   }),
        // );
      }, 500);
    }
  };

  return (
    <Flex
      ml={{ base: 0, md: 20 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'
      >
        Logo
      </Text>
      <Text display={{ base: 'none', md: 'flex' }}>Chart</Text>
      <Spacer />
      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <IconButton size='lg' variant='ghost' aria-label='open menu' icon={<FiBell />} /> */}

        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size='sm' src={getIcon('ETH')} background='none' />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm'>ETHUSDT</Text>
                  <Text fontSize='xs' color='gray.600'>
                    Binance
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              zIndex={10}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <Input
                key='search'
                placeholder='Search Symbol'
                onChange={(e) => symbolFilter(e.target.value)}
              />
              {/* <DebouncedInput onChange={(e) => symbolFilter(e.target.value)} /> */}
              <MenuDivider />
              {symbolList
                .filter((s) => s.symbol.toLowerCase().includes(search))
                .slice(0, 10)
                .map((symbol) => (
                  <MenuItem
                    key={symbol.symbol}
                    onClick={(e) => {
                      console.log('select symbol', e, symbol);
                    }}
                  >
                    <HStack>
                      <Avatar
                        size='xs'
                        name={symbol.symbol}
                        src={getIcon(symbol.baseAsset)}
                        background='none'
                      />
                      <VStack
                        display={{ base: 'none', md: 'flex' }}
                        alignItems='flex-start'
                        spacing='1px'
                        ml='2'
                      >
                        <Text fontSize='sm'>{symbol.symbol}</Text>
                        <Text fontSize='xs' color='gray.600'>
                          Binance
                        </Text>
                      </VStack>
                    </HStack>
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

// interface DebouncedProps {
//   onChange: ChangeEventHandler<HTMLInputElement>;
// }
// const DebouncedInput = ({ onChange }: DebouncedProps) => {
//   return <Input placeholder='Search Symbol' onChange={onChange} />;
// };

export default HeaderNav;
