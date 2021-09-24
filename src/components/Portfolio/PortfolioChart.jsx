import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { useColorMode,Box,Text,Divider } from '@chakra-ui/react';
import {format} from 'date-fns';

const PortfolioChart = ({ assets, priceChange }) => {
  console.log(priceChange);
  const [portfolioChart, setPortfolioChart] = useState();
  const [portfolioChartLoading, setPortfolioChartLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();
  const { colorMode } = useColorMode();

  const getPortfolioChart = () => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        axios
          .post(
            'http://localhost:8080/api/portfolio_chart',
            { assets: assets, priceHistory: priceChange },
            {
              headers: {
                authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            setPortfolioChart(response.data.portfolioChart);
            setPortfolioChartLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(()=>{
    getPortfolioChart();
  },[])
  

  if(portfolioChartLoading === true) return <></>


  const CustomTootip = ({active,payload,label}) => {
    if(active && payload && payload.length){
      const price = Number(payload[0].value).toFixed(2);
      const date = format(label,'EEEE, d MMM, h:m a');
      return (
        <Box className="custom-tooltip" bg="black" opacity={0.7} borderRadius='md' p = {2}>
          <Text fontSize = 'xl' fontWeight = {600} color = 'white' className="label">$ {price}</Text>
        <Divider/>
          <Text fontWeight = {600} color = 'white' className="label">{date}</Text>
        </Box>
      );
    }
    else return null;
  }

  // console.log(portfolioChartLoading);
  // console.log(portfolioChart);

  let coinData = [];

  if(portfolioChartLoading === false){
    coinData = portfolioChart.map((dataPoint) => ({
      price: dataPoint.price,
      timestamp: new Date(dataPoint.timestamp * 1000),
    }));
  }


  return (
    <>
        <ResponsiveContainer width='100%' height={400}>
            <AreaChart
            data={coinData}
            margin={{ top: 10, right: 40, left: 0, bottom: 0 }}
            >
            <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                <stop
                    offset='5%'
                    stopColor={colorMode === 'light' ? '#85b4ff' : '#0060fa'}
                    stopOpacity={0.8}
                />
                <stop
                    offset='95%'
                    stopColor={colorMode === 'light' ? '#85b4ff' : '#0060fa'}
                    stopOpacity={0}
                />
                </linearGradient>
            </defs>
            <XAxis
                axisLine={{ stroke: '#dae8ff' }}
                tick={{
                stroke: colorMode !== 'light' ? '#EBF8FF' : '#1A365D',
                fontSize: '10px',
                fontWeight: '400',
                }}
                tickFormatter={(date) => format(date,'d MMM')}
                domain={['auto', 'auto']}
                dataKey='timestamp'
            />
            <YAxis hide={true} domain={['auto', 'auto']} dataKey='price' />
            <Tooltip content = {<CustomTootip/>} />
            <Area
                baseValue='dataMax'
                type='monotone'
                dataKey='price'
                stroke={colorMode === 'light' ? '#0060fa' : '#85b4ff'}
                strokeWidth='2'
                fillOpacity={1}
                fill='url(#colorUv)'
            />
            </AreaChart>
        </ResponsiveContainer>
    </>
);
};

export default PortfolioChart;
