import { Spinner } from '@chakra-ui/react';

const Loading = ({ pos }) => {
  return (
    <Spinner
      position={pos}
      top='50%'
      left='50%'
      thickness='5px'
      speed='0.7s'
      emptyColor='white'
      color='gray.600'
      size='xl'
    />
  );
};

export default Loading;
