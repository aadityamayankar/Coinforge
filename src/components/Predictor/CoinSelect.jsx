import {useState} from 'react';
import {Search2Icon} from '@chakra-ui/icons';
import {Select,Box,IconButton, HStack} from '@chakra-ui/react';

const coins = [    
  { id: 'bitcoin', label: 'Bitcoin'},
  { id: 'ethereum', label: 'Ethereum'},
  { id: 'binancecoin', label: 'Binancecoin'},
  { id: 'tether', label: 'Tether'},
  { id: 'dogecoin', label: 'Dogecoin'},
  { id: 'polkadot', label: 'Polkadot'},
  { id: 'uniswap', label: 'Uniswap'},
  { id: 'bitcoincash', label: 'Bitcoin Cash'},
  { id: 'litecoin', label: 'Litecoin'},
  { id: 'ethereumclassic', label: 'Ethereum Classic'},
  { id: 'stellar', label: 'Stellar'},
  { id: 'vechain', label: 'Vechain'},
  { id: 'filecoin', label: 'Filecoin'},
  { id: 'tron', label: 'Tron'},
  { id: 'cosmos', label: 'Cosmos'},
  { id: 'eos', label: 'Eos'},
  { id: 'dash', label: 'Dash'},
  { id: 'zcash', label: 'Zcash'},
  { id: 'qtum', label: 'Qtum'},
  { id: 'basicattentiontoken', label: 'Basic Attention Token'},
];

const Option = ({label,id}) => {
  return(
    <option value = {id} onClick = {()=>alert('label: ' + label+ ', id: '+id)}>
    {label}
    </option>
  );
}

const CoinSelect = ({update}) => {

  const [coin,setCoin] = useState('');

  const handleChange = (event) => {
    setCoin(event.target.value);
  }

  const handleSubmit = (event) => {
    update(coin);
    event.preventDefault();
  }

  return (
    <>
      <form onSubmit = {handleSubmit}>
        <HStack>
          <Select isInvalid = {!coins.some((c)=>(coin === c.id))} onChange = {handleChange} placeholder="Select Cryptocurrency">
            {coins.map((coin,idx) => (
              <Option key = {coin.id} label = {coin.label} id = {coin.id} />
              ))}
          </Select>
          <IconButton type = 'submit' icon = {<Search2Icon/>}/>
        </HStack>
      </form>
    </>
  );
}

export default CoinSelect;