import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heading,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';
import { Container } from '@material-ui/core';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { DASHBOARD } from '../constants/routes';
import CoinSelect from '../components/Predictor/CoinSelect';
import Footer from '../components/Footer/Footer';

const Predictor = () => {
  const [coin, setCoin] = useState('');

  return (
    <Box>
      <Container>
        <Box mt={4} p={2}>
          <Breadcrumb
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={DASHBOARD} fontFamily='Inter'>
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink fontFamily='Inter'>Predictor</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box h='500px'>
          <Box>
            <Heading
              fontFamily='montserrat'
              fontWeight='700'
              m={10}
              textAlign='center'
              size='xl'
            >
              Predictor
            </Heading>
          </Box>
          <Box w='50%' m='auto'>
            <CoinSelect update={setCoin} />
          </Box>
          <Box mt='10'>
            <Text fontFamily='Poppins'>Work Under Progress...</Text>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Predictor;
