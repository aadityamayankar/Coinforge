import React from 'react';
import { Box, Link, Heading, Text } from '@chakra-ui/react';
import { DASHBOARD } from '../constants/routes';
import { Container } from '@material-ui/core';
const NotFoundPage = () => {
  return (
    <>
      <Container>
        <Box
          position='fixed'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
        >
          <Heading pb='10' fontFamily='Inter'>
            404 Page Not Found
          </Heading>
          <Text fontFamily='Inter'>
            Oops! looks like you're not allowed in here.{' '}
            <Link href={DASHBOARD}>Click Here</Link> to head back home
          </Text>
        </Box>
      </Container>
    </>
  );
};

export default NotFoundPage;
