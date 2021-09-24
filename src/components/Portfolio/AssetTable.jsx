import NumberFormat from 'react-number-format';
import { Table, Th, Td, Tr, Thead, Tbody,Box } from '@chakra-ui/react';

const AssetTable = ({ assets }) => {

  const sessionData = JSON.parse(sessionStorage.getItem('coinData'));
  const coinData = {};
  sessionData.forEach((coin)=>{
    coinData[coin.name] = coin;
  })
  console.log(coinData);
  const TRow = ({ name, price, price_change, holdings, avg_price, profit }) => {
    return (
      <Tr>
        <Td fontFamily = 'Poppins'>{name}</Td>
        <Td fontFamily = 'Poppins' isNumeric>
        <NumberFormat
          value={price}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
        </Td>
        <Td fontFamily = 'Poppins' isNumeric>
          <NumberFormat
            value={price_change}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Td>
        <Td fontFamily = 'Poppins' isNumeric>
          <NumberFormat
            value={holdings}
            decimalScale={2}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />  
        </Td>
        <Td fontFamily = 'Poppins' isNumeric>
          <NumberFormat
            value={avg_price}
            decimalScale={2}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Td>
        <Td fontFamily = 'Poppins' isNumeric>
          <NumberFormat
            value={profit}
            decimalScale={2}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Td>
      </Tr>
    );
  };

  return (
    <Box overflowX = 'auto' >
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>24 h</Th>
            <Th isNumeric>Holdings</Th>
            <Th isNumeric>Avg. Buy Price</Th>
            <Th isNumeric>Profit / Loss</Th>
          </Tr>
        </Thead>
        <Tbody>
          {assets.map((asset,i) => (
              i === 0 ? null : 
            <TRow
							key = {asset.id}
              name={asset.name}
              price={coinData[asset.name].current_price}
              price_change={coinData[asset.name].price_change_24h}
              holdings={asset.holdings}
              avg_price={asset.avg_price}
              profit={asset.profit}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AssetTable;
