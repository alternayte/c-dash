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
      </Box>
    </Box>
  );
};

export default SimpleSidebarLayout;
