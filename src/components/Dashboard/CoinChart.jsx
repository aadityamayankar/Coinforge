import { useState, useEffect, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useColorMode } from '@chakra-ui/react';

const CoinChart = ({ id, color }) => {
  const { colorMode } = useColorMode();
  const cryptoSparklineData = useSelector((state) => state.cryptoSparklineData);
  const coin = cryptoSparklineData.data[id];
  // console.log(coin);
  const LinearGradientFill = (stopColor) => {
    return (
      <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
        <stop
          offset='0%'
          stopColor={colorMode === 'light' ? 'black' : 'white'}
          stopOpacity='1'
        />
        <stop
          offset='100%'
          stopColor={colorMode === 'light' ? 'black' : 'white'}
          stopOpacity='0'
        />
      </linearGradient>
    );
  };

  return (
    <>
      <Sparklines svgHeight={50} svgWidth={150} data={coin.sparkline}>
        <svg>
          <defs>
            <LinearGradientFill />
          </defs>
        </svg>

        <SparklinesLine
          style={{
            strokeWidth: '2',
            fill: 'url(#gradient)',
          }}
          color={color}
        />
      </Sparklines>
    </>
  );
};

export default CoinChart;
