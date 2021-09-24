import { useState, useEffect } from 'react';
import {
  ButtonGroup,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react';
import CoinGraph24h from './CoinGraph24h';
import CoinGraph7d from './CoinGraph7d';
import CoinGraph30d from './CoinGraph30d';
import CoinGraph3m from './CoinGraph3m';
import CoinGraph1y from './CoinGraph1y';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Loading';

const CoinGraph = ({ id }) => {
  const [timeScale, setTimeScale] = useState(0);
  const [coinGraphData, setCoinGraphData] = useState();
  const [coinGraphDataLoading, setCoinGraphDataLoading] = useState(true);
  const [coinGraphDataError, setCoinGraphDataError] = useState();
  const { getAccessTokenSilently } = useAuth0();

  const timePeriod = ['24h', '7d', '30d', '3m', '1y'];

  const fetchCoinGraphData = (ts) => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        setCoinGraphDataLoading(true);
        axios
          .get(
            `http://localhost:8080/api/crypto_chart/${id}?timePeriod=${timePeriod[ts]}`,
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            setCoinGraphData(response.data);
            setCoinGraphDataLoading(false);
          })
          .catch((e) => {
            setCoinGraphDataError(e);
            console.log(e.message);
          }); 
      });
  };

  useEffect(() => {
    fetchCoinGraphData(timeScale);
  }, []); //eslint-disable-line

  const handleTimeScaleChange = (ts) => {
    setTimeScale(ts);
    fetchCoinGraphData(ts);
  };

  const RenderCoinGraph = ({ timeScale }) => {
    switch (timeScale) {
      case 0:
        return <CoinGraph24h data={coinGraphData.data.history} />;
      case 1:
        return <CoinGraph7d data={coinGraphData.data.history} />;
      case 2:
        return <CoinGraph30d data={coinGraphData.data.history} />;
      case 3:
        return <CoinGraph3m data={coinGraphData.data.history} />;
      case 4:
        return <CoinGraph1y data={coinGraphData.data.history} />;
      default:
        return <CoinGraph24h data={coinGraphData.data.history} />;
    }
  };

  // console.log(coinGraphData);

  return (
    <>
      <Box p={2}>
        {coinGraphDataLoading && coinGraphDataError === undefined ? (
          <Flex alignItems='center' justifyContent='center' h='400px'>
            <Loading />
          </Flex>
        ) : (
          <RenderCoinGraph timeScale={timeScale} />
        )}
        <Box m={3}>
          <ButtonGroup size='sm' isAttached variant='solid'>
            <Button
              colorScheme={timeScale === 0 ? 'messenger' : 'gray'}
              onClick={() => handleTimeScaleChange(0)}
            >
              24 H
            </Button>
            <Button
              colorScheme={timeScale === 1 ? 'messenger' : 'gray'}
              onClick={() => handleTimeScaleChange(1)}
            >
              7 D
            </Button>
            <Button
              colorScheme={timeScale === 2 ? 'messenger' : 'gray'}
              onClick={() => handleTimeScaleChange(2)}
            >
              30 D
            </Button>
            <Button
              colorScheme={timeScale === 3 ? 'messenger' : 'gray'}
              onClick={() => handleTimeScaleChange(3)}
            >
              3 M
            </Button>
            <Button
              colorScheme={timeScale === 4 ? 'messenger' : 'gray'}
              onClick={() => handleTimeScaleChange(4)}
            >
              1 Y
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};

export default CoinGraph;
