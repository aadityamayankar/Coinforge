import { Box, Text } from '@chakra-ui/react';

const FeatureCard = ({ title, data, icon }) => {
  return (
    <Box maxW='300px' borderRadius='5px' overflow='hidden' textAlign='center'>
      <Box>{icon}</Box>
      <Box p={5}>
        <Box>
          <Text fontSize='md' fontWeight='bold'>
            {title}
          </Text>
        </Box>
        <Box>
          <Text>{data}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default FeatureCard;
