import {Text} from '@chakra-ui/react';
import {Box} from '@chakra-ui/react';

const Copyright = (props) => {
  return(
    <Box {...props}>
      <Text fontFamily='Inter'>
        &copy; {new Date().getFullYear()} Coinforge, Inc. All rights reserved.
      </Text>
    </Box>
  );
}


export default Copyright;