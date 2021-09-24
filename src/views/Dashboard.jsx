import { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Box, Heading } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { setCurrentUser } from '../auth/slices/authSlice';
import {
  setCryptoData,
  setCryptoDataFailure,
  initCryptoData,
  cryptoDataComplete,
} from '../auth/slices/cryptoDataSlice';
import {
  setCryptoSparklineData,
  setCryptoSparklineDataFailure,
  initCryptoSparklineData,
  cryptoSparklineComplete,
} from '../auth/slices/cryptoSparklineSlice';
import axios from 'axios';
import { Container } from '@material-ui/core';
import CoinRow from '../components/Dashboard/CoinRow';
import Loading from '../components/Loading';

const Dashboard = () => {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const currentUser = {
    isAuthenticated,
    isLoading,
    user,
  };
  const cryptoData = useSelector((state) => state.cryptoData);
  const cryptoSparklineData = useSelector((state) => state.cryptoSparklineData);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser();
    fetchCryptoData();
  }, []); //eslint-disable-line

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

  const fetchCryptoData = () => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        dispatch(initCryptoData());
        axios
          .get('http://localhost:8080/api/crypto_data', {
            headers: {
              authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((response) => {
            dispatch(setCryptoData(response.data));
            sessionStorage.setItem('coinData', JSON.stringify(response.data));
          })
          .catch((e) => {
            dispatch(setCryptoDataFailure(e));
            console.log(e);
          })
          .finally(() => {
            dispatch(cryptoDataComplete());
          });
      })
      .then(() => {
        dispatch(initCryptoSparklineData());
        axios
          .get('http://localhost:8080/api/crypto_sparkline_data', {
            headers: {
              authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((response) => {
            dispatch(setCryptoSparklineData(response.data.data.coins));
          })
          .catch((e) => {
            dispatch(setCryptoSparklineDataFailure(e));
            console.log(e);
          })
          .finally(() => {
            dispatch(cryptoSparklineComplete());
          });
      })
      .catch((e) => {
        dispatch(setCryptoDataFailure(e));
        dispatch(setCryptoSparklineDataFailure(e));
        console.log(e);
      });
  };

  if (cryptoData.isLoading || cryptoSparklineData.isLoading)
    return <Loading pos='fixed' />;

  return (
    <>
      <Container>
        <Box mt={10}>
          <Heading textAlign='center' fontFamily='montserrat' mb={10}>
            All cryptocurrency prices
          </Heading>
          <Box overflowX='auto'>
            <Table variant='simple' fontFamily='Poppins'>
              <Thead>
                <Tr>
                  <Th fontFamily='Inter' isNumeric>
                    #
                  </Th>
                  <Th fontFamily='Inter'>Name</Th>
                  <Th fontFamily='Inter' isNumeric>
                    Price
                  </Th>
                  <Th fontFamily='Inter' isNumeric>
                    24 %
                  </Th>
                  <Th fontFamily='Inter' isNumeric>
                    7d %
                  </Th>
                  <Th fontFamily='Inter' isNumeric>
                    Market Cap
                  </Th>
                  <Th fontFamily='Inter' isNumeric>
                    Volume
                  </Th>
                  <Th fontFamily='Inter' isNumeric>
                    Last 7 Days
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {cryptoData.data.map((coin, i) => (
                  <CoinRow
                    key={coin.id}
                    position={i}
                    color={
                      Math.sign(coin.price_change_percentage_7d_in_currency) >=
                      0
                        ? 'lime'
                        : 'red'
                    }
                    id={coin.id}
                  />
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
