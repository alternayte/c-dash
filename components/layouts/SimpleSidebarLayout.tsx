import { getIcon } from '@/styles/crypto-icons';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
  VStack,
  FlexProps,
  Spacer,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import packageInfo from '../../package.json';
import HeaderNav from './HeaderNav';
import SidebarContent from './SidebarContent';

type Props = {
  children?: ReactNode;
  title?: string;
};

const SimpleSidebarLayout = ({ children, title = 'C-Dash' }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      {/* Drawer */}
      {/* Mobile Nav */}
      <HeaderNav onOpen={onOpen} />

      <Box ml={{ base: 0, md: 20 }} p='4'>
        {children}
        <Box
          as='footer'
          mt='8'
          pt='4'
          borderTopWidth='1px'
          borderTopColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <Text fontSize='sm' color={useColorModeValue('gray.600', 'gray.400')}>
            v{packageInfo.version}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SimpleSidebarLayout;
