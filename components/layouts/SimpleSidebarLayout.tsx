import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
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
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  );
};

export default SimpleSidebarLayout;
