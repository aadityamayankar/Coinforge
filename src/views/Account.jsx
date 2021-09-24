import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../auth/slices/authSlice';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  Box,
  Grid,
  GridItem,
  Avatar,
  Text,
  InputLeftElement,
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  IconButton,
  Badge,
  VStack,
} from '@chakra-ui/react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Container } from '@material-ui/core';
import Footer from '../components/Footer/Footer';
import NumberFormat from 'react-number-format';
import Loading from '../components/Loading';

const Account = () => {
  const [portfolio, setPortfolio] = useState();
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const payload = {
    isAuthenticated,
    isLoading,
    user,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentUser(payload));
    getPremiumStatus();
    getPortfolio();
  }, []); //eslint-disable-line
  const auth = useSelector((state) => state.auth);
  const [showPass, setShowPass] = useState();
  const [premium, setPremium] = useState();
  const handlePassClick = () => setShowPass(!showPass);
  const getPremiumStatus = () => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        axios
          .post(
            'http://localhost:8080/api/setPremium',
            { sub: user.sub },
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            setPremium(response.data.premium);
          })
          .catch((e) => {
            console.log(e);
          });
      });
  };

  const setPremiumStatus = (status) => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        axios
          .post(
            'http://localhost:8080/api/setPremium',
            { sub: user.sub, premium: status },
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            getPremiumStatus();
          })
          .catch((e) => {
            console.log(e);
          });
      });
  };

  const getPortfolio = () => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        axios
          .post(
            'http://localhost:8080/api/portfolio',
            { sub: user.sub },
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            setPortfolio(response.data);
            setPortfolioLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      });
  };

  if (portfolioLoading === true) return <Loading pos='fixed' />;

  return (
    auth.isAuthenticated && (
      <>
        <Container>
          <Box ml='auto' mr='auto' mt='10' fontFamily='Poppins' mb='100'>
            <Grid
              templateRows={{ base: 'repeat(2, 1fr)', md: 'repeat(1, 1fr)' }}
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
              gap={4}
            >
              <GridItem>
                <VStack align='center'>
                  <Box>
                    <Avatar size='2xl' name={user.name} src={user.picture} />
                  </Box>
                  <Box>
                    {premium ? (
                      <Stack align='center'>
                        <Box>
                          <Badge variant='solid' colorScheme='red'>
                            {' '}
                            PREMIUM{' '}
                          </Badge>
                        </Box>
                        <Box>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setPremiumStatus(false)}
                          >
                            {' '}
                            Go Free{' '}
                          </Button>
                        </Box>
                      </Stack>
                    ) : (
                      <Stack align='center'>
                        <Box>
                          <Badge variant='solid' colorScheme='green'>
                            {' '}
                            FREE{' '}
                          </Badge>
                        </Box>
                        <Box>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setPremiumStatus(true)}
                          >
                            {' '}
                            Go Premium{' '}
                          </Button>
                        </Box>
                      </Stack>
                    )}
                  </Box>
                </VStack>
              </GridItem>
              <GridItem p={5}>
                <Stack borderRadius='md' spacing={5}>
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                      variant='unstyled'
                      isReadOnly
                      size='sm'
                      defaultValue={user.nickname}
                    ></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      variant='unstyled'
                      isReadOnly
                      size='sm'
                      defaultValue={user.email}
                    ></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Unique ID</FormLabel>
                    <InputGroup maxW='20rem'>
                      <Input
                        size='sm'
                        type={showPass ? 'text' : 'password'}
                        defaultValue={user.sub}
                        isReadOnly
                        border='none'
                      />
                      <InputLeftElement width='' height=''>
                        <IconButton onClick={handlePassClick} size='sm'>
                          {showPass ? <RiEyeLine /> : <RiEyeOffLine />}
                        </IconButton>
                      </InputLeftElement>
                    </InputGroup>
                  </FormControl>
                </Stack>
              </GridItem>
              <GridItem p={5}>
                <Stack spacing={5}>
                  <Text fontSize='xl'>Currnet Balance</Text>
                  <NumberFormat
                    value={portfolio.currBal}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                  <Text fontSize='xl'>Your Holdings</Text>
                  <NumberFormat
                    value={portfolio.holdings}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale={3}
                  />
                </Stack>
              </GridItem>
            </Grid>
          </Box>
        </Container>
        <Footer />
      </>
    )
  );
};

export default Account;
