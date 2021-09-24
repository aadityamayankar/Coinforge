import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Loading from '../Loading';

const CoinTransaction = ({ coinData }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [transactionType, setTransactionType] = useState(null);
  const [level, setLevel] = useState(0);
  const [data, setData] = useState();
  const [dataLoading, setDataLoading] = useState(true);
  const [dataFailure, setDataFailure] = useState({
    status: false,
    message: null,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useSelector((state) => state.auth);

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
            { sub: auth.user.sub },
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            setData(response.data);
            setDataLoading(false);
          })
          .catch((e) => {
            setDataFailure({
              status: true,
              message: e.message,
            });
            console.log(e);
          });
      })
      .catch((e) => {
        setDataFailure({
          status: true,
          message: e.message,
        });
        console.log(e);
      });
  };

  useEffect(() => {
    getPortfolio();
  }, []); //eslint-disable-line

  const handleTransaction = (type) => {
    setTransactionType(type);
    onOpen();
  };

  const handleBuy = () => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        axios
          .post(
            'http://localhost:8080/api/buyCoin',
            {
              sub: auth.user.sub,
              asset: coinData,
              amount: (data.currBal * level) / 100,
              currBal : data.currBal,
              assets: data.assets
            },
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            getPortfolio();
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSell = () => {
    console.log(coinData);
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        axios
          .post(
            'http://localhost:8080/api/sellCoin',
            {
              sub: auth.user.sub,
              asset: coinData,
              amount: (getHoldings() * level) / 100,
              currBal : data.currBal,
              assets: data.assets,
            },
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            getPortfolio();
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  const getHoldings = () => {
    const assets = data.assets;
    // let holdings = 0;
    let holdings = assets.filter((asset)=>{
      return asset.id === coinData.uuid;
    });
    return holdings.length === 0 ? 0 : holdings[0].holdings;
  }

  // console.log(data);
  
  if (dataLoading) return <Loading />;
  return (
    <>
      <Box mt='auto' mb='auto'>
        <ButtonGroup isAttached>
          <Button
            fontFamily = 'poppins'
            onClick={() => handleTransaction('Buy')}
            size='sm'
            borderRadius='xl'
            colorScheme='green'
          >
            BUY
          </Button>
          <Button
            fontFamily = 'poppins'
            onClick={() => handleTransaction('Sell')}
            size='sm'
            borderRadius='xl'
            colorScheme='red'
            disabled = {getHoldings() === 0 ? true : false}
          >
            SELL
          </Button>
          <Modal
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            motionPreset='slideInBottom'
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{transactionType}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box>
                  <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    <GridItem colSpan={2}>
                      <Slider
                        defaultValue={level}
                        aria-label='slider-ex-5'
                        onChange={(val) => setLevel(val)}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </GridItem>
                    <GridItem colEnd={4}>{level}%</GridItem>
                  </Grid>
                </Box>
                {transactionType === 'Buy' ? (
                  <Text fontStyle='italic' textAlign='center'>
                  ${(data.currBal * level) / 100} / {data.currBal}
                  </Text>
                ) : (
                  <Text fontStyle='italic' textAlign='center'>
                  ${(getHoldings() * level) / 100} / {getHoldings()}
                  </Text>
                )}
              </ModalBody>
              <ModalFooter>
                <ButtonGroup>
                  <Button onClick={transactionType === 'Buy' ? handleBuy : handleSell}>
                    Confirm
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default CoinTransaction;
