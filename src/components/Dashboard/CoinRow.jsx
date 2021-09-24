import {Tr,Td,Link, Image, HStack,StatArrow, Center,Box} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import CoinChart from './CoinChart';
import {Link as RouterLink} from 'react-router-dom';
import {motion} from 'framer-motion';

import NumberFormat from 'react-number-format';

const CoinRow = ({position,color,id}) => {

    const cryptoData = useSelector(state => state.cryptoData);
    const coin = cryptoData.data[position];
    const coinRoute = 'coins';
    // console.log(coin);

    const MotionBox = motion(Box);

    return (
        <Tr>
            <Td isNumeric>{position+1}</Td>
            <Td>
                <MotionBox style = {{originX:0}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <HStack>
                        <Image boxSize='5' src = {coin.image} alt='btc' />
                        <Link style = {{textDecoration:'none'}} as='div'>
                            <RouterLink to = {`${coinRoute}/${coin.id}`}>{coin.name}</RouterLink>
                        </Link>
                    </HStack>
                </MotionBox>
            </Td>
            <Td isNumeric>
                <NumberFormat
                value={coin.current_price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                />
            </Td>
            <Td isNumeric>
                <StatArrow mr='1' boxSize='2' type={Math.sign(coin.price_change_percentage_24h_in_currency) >= 0 ? 'increase' : 'decrease'} />
                <NumberFormat
                style={{color: Math.sign(coin.price_change_percentage_24h_in_currency) >= 0 ? 'mediumseagreen' : 'indianred'}}
                value={coin.price_change_percentage_24h_in_currency}
                displayType={'text'}
                allowNegative={true}
                decimalScale={2}
                suffix={'%'}
                />
            </Td>
            <Td isNumeric>
                <StatArrow mr='1' boxSize='2' type={Math.sign(coin.price_change_percentage_7d_in_currency) >= 0 ? 'increase' : 'decrease'} />
                <NumberFormat
                style={{color: Math.sign(coin.price_change_percentage_7d_in_currency) >= 0 ? 'mediumseagreen' : 'indianred'}}
                value={coin.price_change_percentage_7d_in_currency}
                displayType={'text'}
                allowNegative={true}
                decimalScale={2}
                suffix={'%'}
                />
            </Td>
            <Td isNumeric>
                <NumberFormat
                value={coin.market_cap}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                />
            </Td>
            <Td isNumeric>
                <NumberFormat
                value={coin.total_volume}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                />
            </Td>
            <Td isNumeric pr={0} pb={0} pl={0} m={0}>
                <Center>
                <CoinChart
                color = {Math.sign(coin.price_change_percentage_7d_in_currency) >= 0 ? 'lime' : 'red'}
                id = {position}
                />
                </Center>
            </Td>
        </Tr>
    );
}

export default CoinRow;