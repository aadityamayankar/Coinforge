import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Button,
  Flex,
  Spacer,
  Heading,
  Text,
  Stack,
  Image,
  Center,
  Tabs,
  TabList,
  TabPanel,
  Tab,
  TabPanels,
  Stat,
  StatArrow,
  StatHelpText,
  StatNumber,
  StatLabel,
  SimpleGrid,
  Collapse,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { DASHBOARD } from '../constants/routes';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../auth/slices/authSlice';
import NumberFormat from 'react-number-format';
import CoinStats from '../components/Coin/CoinStats';
import CoinGraph from '../components/Coin/CoinGraph';
import Loading from '../components/Loading';
import CoinTransaction from '../components/Coin/CoinTransaction';
import Footer from '../components/Footer/Footer';

const Coin = () => {
  let { id } = useParams();

  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const currentUser = {
    isAuthenticated,
    isLoading,
    user,
  };
  const [coinData, setCoinData] = useState();
  const [coinDataLoading, setCoinDataLoading] = useState(true);
  const [coinDataFailure, setCoinDataFailure] = useState({
    status: false,
    message: null,
  });
  const [readMore, setReadMore] = useState(false);
  const dispatch = useDispatch();

  const setUser = () => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        axios
          .post(
            'http://localhost:8080/api/getUser',
            { sub: currentUser.user.sub },
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            const fetchedUser = response.data;
            if (fetchedUser.length === 0) {
              axios
                .post('http://localhost:8080/api/signup', currentUser.user, {
                  headers: {
                    authorization: `Bearer ${jwtToken}`,
                  },
                })
                .then((response) => {
                  console.log(response.data);
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .finally(() => {
        dispatch(setCurrentUser(currentUser));
      });
  };

  const fetchCoinData = () => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        axios
          .get(`http://localhost:8080/api/coin_data/${id}`, {
            headers: {
              authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((response) => {
            setCoinData(response.data.data.coin);
            setCoinDataLoading(false);
          })
          .catch((e) => {
            setCoinDataFailure({
              status: true,
              message: e.message,
            });
            console.log(e);
          });
      })
      .catch((e) => {
        setCoinDataFailure({
          status: true,
          message: e.message,
        });
        console.log(e);
      });
  };

  useEffect(() => {
    setUser();
    fetchCoinData();
  }, []); //eslint-disable-line

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  if (coinDataLoading) return <Loading pos='fixed' />;

  return (
    <>
      <Container>
        <Box mt={4} p={2}>
          <Breadcrumb
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={DASHBOARD} fontFamily='Inter'>
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink fontFamily='Inter'>
                {coinData.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box p={2} pt={10}>
          <Stack align='center'>
            <Flex>
              <Box h={10} w={10} mr={2}>
                <Image src={coinData.iconUrl} />
              </Box>
              <Heading fontFamily='Inter' fontWeight={600} fontSize='4xl'>
                {coinData.name} ({coinData.symbol})
              </Heading>
            </Flex>
            <Text fontFamily='Poppins' fontSize='md'>
              {coinData.name} ({coinData.symbol}) live price in US dollar (USD).
              View value statistics, market cap and supply.
            </Text>
          </Stack>
        </Box>
        <Box h='100px' p={2}>
          <Flex>
            <Box>
              <Stat>
                <StatLabel fontFamily='Inter' color='gray.500'>
                  {coinData.symbol} Price
                </StatLabel>
                <StatNumber fontFamily='Poppins'>
                  <NumberFormat
                    value={coinData.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale={coinData.price < 100 ? 5 : 2}
                  />
                </StatNumber>
                <StatHelpText fontFamily='Inter'>
                  <StatArrow
                    type={
                      Math.sign(coinData.change) >= 0 ? 'increase' : 'decrease'
                    }
                  />
                  <NumberFormat
                    value={coinData.change}
                    displayType={'text'}
                    suffix={'%'}
                    decimalScale={2}
                    style={{
                      color:
                        Math.sign(coinData.change) >= 0
                          ? 'mediumseagreen'
                          : 'indianred',
                    }}
                  />
                </StatHelpText>
              </Stat>
            </Box>
            <Spacer />
            <CoinTransaction coinData={coinData} />
          </Flex>
        </Box>
        <Box p={2}>
          <Tabs align='center' fontFamily='Poppins'>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Predict</Tab>
            </TabList>
            <TabPanels mt={10} mb={10}>
              <TabPanel>
                <Text
                  fontWeight='700'
                  textAlign='left'
                  fontSize={{ sm: 'lg', md: '2xl' }}
                >
                  {coinData.name} Price Chart
                </Text>
                <CoinGraph id={id} />
              </TabPanel>
              <TabPanel>
                <Text>Coming Soon...</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box p={2} pt={10}>
          <SimpleGrid columns={{ sm: '1', md: '2' }} spacing={10}>
            <Box>
              <Heading
                fontFamily='Inter'
                fontWeight={600}
                fontSize={{ sm: 'lg', md: '2xl' }}
              >
                {coinData.symbol} value statistics
              </Heading>
              <CoinStats coin={coinData} />
            </Box>
            <Box>
              <Heading
                fontFamily='Inter'
                fontWeight={600}
                fontSize={{ sm: 'lg', md: '2xl' }}
              >
                Project Resources
              </Heading>
              <CoinStats coin={coinData} />
            </Box>
          </SimpleGrid>
        </Box>
        <Box p={2}>
          <Heading
            fontFamily='Inter'
            fontWeight={600}
            fontSize={{ sm: 'lg', md: 'xl' }}
          >
            About {coinData.name}
          </Heading>
          <Box
            fontFamily='Poppins'
            as={Collapse}
            startingHeight={80}
            in={readMore}
            p={5}
            dangerouslySetInnerHTML={{ __html: coinData.description }}
          />
          <Button
            variant='unstyled'
            size='sm'
            onClick={handleReadMore}
            mt='1rem'
          >
            Read {readMore ? 'Less' : 'More'}...
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Coin;
