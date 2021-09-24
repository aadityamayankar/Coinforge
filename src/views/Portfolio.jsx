import {useState,useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import { setCurrentUser } from "../auth/slices/authSlice";
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Box,
  Text,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Button,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Container } from '@material-ui/core';
import { DASHBOARD } from '../constants/routes';
import AssetTable from '../components/Portfolio/AssetTable';
import Loading from '../components/Loading';
import PortfolioChart from '../components/Portfolio/PortfolioChart';
import AssetGraph from '../components/Portfolio/AssetGraph';
import NumberFormat from 'react-number-format';

const Portfolio = () => {

  const { isAuthenticated,isLoading,user,getAccessTokenSilently } = useAuth0();
  const currentUser = {
    isAuthenticated,isLoading,user
  }
  const [data, setData] = useState();
  const [priceChange, setPriceChange] = useState();
  const [priceChangeLoading, setPriceChangeLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataFailure, setDataFailure] = useState({
    status: false,
    message: null,
  });
  const dispatch = useDispatch();

  const setUser = () => {
    let jwtToken;
    getAccessTokenSilently()
    .then((token)=>{
        jwtToken = token;
    })
    .then(()=>{
        axios.post('http://localhost:8080/api/getUser',{sub : currentUser.user.sub},{
            headers:{
                authorization: `Bearer ${jwtToken}`, 
            }
        })
        .then(()=>{
          dispatch(setCurrentUser(currentUser));
        })
        .then(()=>{
          getPortfolio();
        })
        .catch((e)=>{
            console.log(e);
        })
    })
    .catch((e)=>{
      console.log(e);
    })
  }

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
            { sub: currentUser.user.sub },
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            setData(response.data);
            setDataLoading(false);
            getHistory(response.data);
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

  const getPriceChange = (portfolio) => {
    console.log(portfolio); 
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        axios
          .post(
            'http://localhost:8080/api/priceChange',
            { sub: currentUser.user.sub, portfolio : portfolio },
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            // console.log(response.data.history);
            sessionStorage.setItem('history', JSON.stringify(response.data.history));
            setPriceChange(response.data.history);
            setPriceChangeLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const getHistory = (portfolio) => {
    let history = sessionStorage.getItem('history');
    // console.log(history);
    if(history === null){
      console.log('from api');
      getPriceChange(portfolio);
    }
    else{
      console.log('from sesion storage');
      setPriceChange(history);
      setPriceChangeLoading(false);
    }
  }

  useEffect(() => {
    setUser();
    getPortfolio();
    getHistory();
  }, []); //eslint-disable-line

  if(dataLoading || priceChangeLoading) return <Loading pos = 'fixed'/>
  // console.log(priceChange);
  return (
    <>
      <Container>
        <Box mt={4} p={2}>
          <Breadcrumb
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={DASHBOARD} fontFamily = 'Inter'>
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink fontFamily = 'Inter'>Portfolio</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box>
            <Box p = {2} mt = {10} mb = {10} >
                <Heading textAlign = 'center' fontFamily = 'montserrat' mb = {10}>Your Portfolio</Heading>
            </Box>
            <Box >
                <Stat>
                    <StatLabel fontSize = {{md:'md',lg:'lg'}} fontWeight = {600} fontFamily = 'Poppins'>Current Balance</StatLabel>
                    <StatNumber fontFamily = 'Poppins'>
                      <NumberFormat
                      value={data.holdings}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                      decimalScale = {4}
                      />
                    </StatNumber>  
                    <StatHelpText>
                        <StatArrow type = 'increase' />
                        $5,000
                        <Badge ml={1} fontSize = 'x-small' variant = 'subtle' borderRadius = 'xl'>24h</Badge>
                    </StatHelpText>
                </Stat>
            </Box>
            <Box mt = {10}>
              <PortfolioChart assets = {data.assets} priceChange = {priceChange} />
            </Box>
            <Box mt = {10}>
              <Heading fontSize = {{md:'md',lg:'lg'}} fontWeight = {600} fontFamily = 'Poppins'>Portfolio Breakdown</Heading>
              <AssetGraph assets = {data.assets}/>
            </Box>
            <Box mt = {10}>
                <Heading fontSize = {{md:'md',lg:'lg'}} fontWeight = {600} fontFamily = 'Poppins'>Your Assets</Heading>
                <Box m = '1' mt = '10' bg = 'blackAlpha.100'>
                  <AssetTable assets = {data.assets} />
                </Box>
            </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Portfolio;