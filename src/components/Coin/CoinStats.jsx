import {Box,Table,Td,Tr,Tbody, Heading} from '@chakra-ui/react';
import NumberFormat from 'react-number-format';

const CoinStats = ({coin}) => {
    return (
        <Table variant="simple" mt = '3' fontFamily = 'Poppins' fontSize = 'sm'>
            <Tbody>
                <Tr>
                    <Td>Price To USD</Td>
                    <Td isNumeric>
                        <NumberFormat
                        value={coin.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        decimalScale = {2}
                        />
                    </Td>
                </Tr>
                <Tr>
                    <Td>Price to BTC</Td>
                    <Td isNumeric>
                        <NumberFormat
                        value={coin.btcPrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix = {' BTC'}
                        decimalScale = {2}
                        />
                    </Td>
                </Tr>
                <Tr>
                    <Td>Rank</Td>
                    <Td isNumeric>#{coin.rank}</Td>
                </Tr>
                <Tr>
                    <Td>24 h Volume</Td>
                    <Td isNumeric>
                        <NumberFormat
                        value={coin['24hVolume']}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        decimalScale = {2}
                        />
                    </Td>
                </Tr>
                <Tr>
                    <Td>Market Cap</Td>
                    <Td isNumeric>
                        <NumberFormat
                        value = {coin.marketCap}
                        displayType = {'text'}
                        thousandSeparator = {true}
                        prefix = {'$'}
                        decimalScale = {2}
                        />
                    </Td>
                </Tr>
                <Tr>
                    <Td>Number of Markets</Td>
                    <Td isNumeric>
                        <NumberFormat
                        value = {coin.numberOfMarkets}
                        displayType = {'text'}
                        thousandSeparator = {true}
                        />
                    </Td>
                </Tr>
                <Tr>
                    <Td>Number of Exchanges</Td>
                    <Td isNumeric>
                        <NumberFormat
                        value = {coin.numberOfExchanges}
                        displayType = {'text'}
                        thousandSeparator = {true}
                        />
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    );
}

export default CoinStats;