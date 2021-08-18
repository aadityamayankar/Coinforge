import {useEffect,useState,useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {setCurrentUser} from '../auth/slices/authSlice';
import {useAuth0} from "@auth0/auth0-react";
import {Button,Box, Grid, GridItem,Avatar,Text,Icon,InputLeftElement, FormControl, FormLabel, Input,Stack, InputGroup, IconButton, Badge, VStack, useTab, Flex} from '@chakra-ui/react';
import {RiEyeLine,RiEyeOffLine} from 'react-icons/ri';
import {BiChevronsDown} from 'react-icons/bi'
import {Container} from '@material-ui/core';
import Footer from "../components/Footer/Footer";
import '@fontsource/raleway';

const Account = () => {

    const {isAuthenticated,isLoading,user} = useAuth0();
    const payload = {
        isAuthenticated,isLoading,user
    }
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setCurrentUser(payload));
    });
    const auth = useSelector(state => state.auth);
    const [showPass, setShowPass] = useState(false);
    const [premium, setPremium] = useState(false);
    const bx1 = useRef(null);
    const bx2 = useRef(null);
    const bx3 = useRef(null);
    const handlePassClick = () => setShowPass(!showPass);
    const handlePremiumClick = () => setPremium(!premium);
    const handleScrollClick = (reference) => {reference.current.scrollIntoView({
        behavior:'smooth',
        block:"start",
        inline:"nearest"
    })};
    console.log(auth);

// email: "aadityamayankar@gmail.com"
// email_verified: false
// name: "aadityamayankar@gmail.com"
// nickname: "aadityamayankar"
// picture: "https://s.gravatar.com/avatar/ff48521a87cedfa2d636ca8f6166e013?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Faa.png"
// sub: "auth0|60e7c2a9043c3c00697c8435"
// updated_at: "2021-07-30T11:13:46.818Z"
    return (    
        auth.isAuthenticated && (
            <>
                <Container>
                    <Box ml='auto' mr='auto' mt='10'>
                        <Grid
                        templateRows={{base:"repeat(2, 1fr)",md:"repeat(1, 1fr)"}}
                        templateColumns={{base:"repeat(1, 1fr)",md:"repeat(3, 1fr)"}}
                        gap={4}
                        >
                            <GridItem bg="tomato">
                                <VStack align="center">
                                    <Box>
                                        <Avatar size="2xl" name={user.name} src={user.picture} />
                                    </Box>
                                    <Box>
                                        {premium ? 
                                            <Stack align="center">
                                                <Box>
                                                    <Badge variant="solid" colorScheme="red"> PREMIUM </Badge> 
                                                </Box>
                                                <Box>
                                                    <Button variant="outline" size="sm" onClick={handlePremiumClick}> Go Free </Button>
                                                </Box>
                                            </Stack>
                                            :
                                            <Stack align="center">
                                                <Box>
                                                    <Badge variant="solid" colorScheme="green"> FREE </Badge>
                                                </Box>
                                                <Box>
                                                    <Button variant="outline" size="sm" onClick={handlePremiumClick}> Go Premium </Button>
                                                </Box>
                                            </Stack>
                                        }
                                    </Box>
                                </VStack>
                            </GridItem>
                            <GridItem bg="black" p={5}>
                                <Stack bg="violet" borderRadius="md" spacing={5}>
                                    <FormControl>
                                        <FormLabel>Username</FormLabel>
                                        <Input variant="unstyled" isReadOnly size="sm" defaultValue={user.nickname}></Input>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Email</FormLabel>
                                        <Input variant="unstyled" isReadOnly size="sm" defaultValue={user.email}></Input>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup maxW="20rem">
                                        <Input
                                        size="sm"
                                        type={showPass ? "text" : "password"}
                                        defaultValue="password"
                                        isReadOnly
                                        border="none"
                                        />
                                        <InputLeftElement width="" height="">
                                            <IconButton onClick={handlePassClick} size="sm">
                                                {showPass ? <RiEyeLine/> : <RiEyeOffLine/>}
                                            </IconButton>
                                        </InputLeftElement>
                                        </InputGroup>
                                    </FormControl>
                                </Stack>   
                            </GridItem>
                            <GridItem p={5} display={{base:'none',md:'grid'}} bg="saddlebrown">
                                <Stack>
                                    <Box mb={4}>
                                        <Text fontSize="xs">Jump To...</Text>
                                    </Box>
                                    <Button variant="ghost" onClick={() => handleScrollClick(bx1)} rightIcon={<BiChevronsDown/>}>LINK I</Button>
                                    <Button variant="ghost" onClick={() => handleScrollClick(bx2)} rightIcon={<BiChevronsDown/>}>LINK II</Button>
                                    <Button variant="ghost" onClick={() => handleScrollClick(bx3)} rightIcon={<BiChevronsDown/>}>LINK III</Button>
                                </Stack>
                            </GridItem>
                        </Grid>
                    </Box>
                    <Box bg="cornflowerblue" h="400px" ref={bx1}></Box>
                    <Box bg="pink" h="400px" ref={bx2}></Box>
                    <Box bg="green.100" h="400px" ref={bx3}></Box>
                </Container>
                <Footer/>
            </>
        )
    );
}

export default Account;