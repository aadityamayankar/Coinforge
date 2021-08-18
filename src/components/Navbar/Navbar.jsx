import React from 'react';
import {Box,Flex,Avatar,HStack,Link,IconButton,Button,Menu,MenuButton,MenuList,MenuItem,MenuDivider,useDisclosure,useColorModeValue,Stack,DrawerBody,DrawerCloseButton,DrawerContent,DrawerFooter,DrawerHeader,DrawerOverlay,Drawer,Divider,useColorMode} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom';
import {DASHBOARD,PORTFOLIO,PREDICTOR,ACCOUNT,NEWS} from '../../constants/routes';
import { HamburgerIcon, CloseIcon,MoonIcon } from '@chakra-ui/icons';
import {BsLightningFill} from 'react-icons/bs'
import { useAuth0 } from '@auth0/auth0-react';

const Links = [{link:'Dashboard',route:DASHBOARD},{link:'Predictor',route:PREDICTOR},{link:'Portfolio',route:PORTFOLIO},{link:'News',route:NEWS}];

const NavLink = ({ children,active,...props }) => {
    return (<Link
    as="div"
    color={children===active ? 'blue': ''}
    px={2}
    py={1}
    rounded={'md'}
    transition = '0.5s ease'
    _hover={{
        color: 'blue',
        transition:'0.5s ease',
        textDecoration: 'none',
    }}>
        <RouterLink to={props.route}>
            {children}
        </RouterLink>
  </Link>
);
}

const Navbar = (props) => {
    
    const btnRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {colorMode,toggleColorMode} = useColorMode();
    const {user,logout} = useAuth0();
    return(
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        ref={btnRef}
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Coinforge</DrawerHeader>
                            <Box width="85%" ml="auto" mr="auto">
                                <Divider/>
                            </Box>
                            <DrawerBody>
                            <Stack as={'nav'} spacing={4}>
                            {Links.map((routelink,idx) => (
                                <NavLink active={props.active} key={idx} route={routelink.route}>{routelink.link}</NavLink>
                            ))}
                            </Stack>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant="outline" mr={3}>
                                    ADDD MORE STUFF
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>COINFORGE</Box>
                        <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}>
                        {Links.map((routelink,idx) => (
                            <NavLink active = {props.active} key={idx} route={routelink.route}>{routelink.link}</NavLink>
                        ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <IconButton
                        mr='5'
                        size='md'
                        rounded='xl'
                        icon={colorMode === 'light' ? <MoonIcon /> : <BsLightningFill/>}
                        onClick={toggleColorMode}
                        />
                        <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar
                            name={user.nickname}
                            size={'sm'}
                            src={
                                user.picture
                                // 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                            }
                            />
                        </MenuButton>
                        <MenuList>
                            <RouterLink to={ACCOUNT}>
                                <MenuItem>Profile</MenuItem>
                            </RouterLink>
                            <MenuItem>Link</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick = {() => logout({
                            returnTo: window.location.origin,
                            })}>Logout</MenuItem>
                        </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                    {Links.map((routelink,idx) => (
                        <NavLink key={idx} route={routelink.route}>{routelink.link}</NavLink>
                    ))}
                    </Stack>
                </Box>
                ) : null}
            </Box>
        </>
    );
}

export default Navbar;