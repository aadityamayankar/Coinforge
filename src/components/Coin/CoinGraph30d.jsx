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


const CoinGraph30d = ({data}) => {

    const { colorMode } = useColorMode();

    const coinData = data.map((dataPoint) => ({
        price: dataPoint.price,
        timestamp: new Date(dataPoint.timestamp * 1000),
    }));

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

export default CoinGraph30d;
  