import { Box, BoxProps, CloseButton, Flex, useColorModeValue, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu } from 'react-icons/fi';
import { NextChakraLink } from '../NextChakraLink';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, href: '/' },
  { name: 'Trending', icon: FiTrendingUp, href: '/symbols/ETHUSDT' },
  { name: 'Explore', icon: FiCompass, href: '/explore' },
  { name: 'Favourites', icon: FiStar, href: '/favourites' },
  { name: 'Configs', icon: FiSettings, href: '/configs' },
];

interface Props extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: Props) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 20 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        {/* <Text fontSize='2xl' fontWeight='bold'>
          Logo
        </Text> */}
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {/* {link.name} */}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;

interface NavItemProps {
  icon: IconType;
  href: string;
  children: React.ReactNode;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <NextChakraLink href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NextChakraLink>
  );
};
