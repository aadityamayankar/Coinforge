import {
  Box,
  Text,
  Heading,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid,
  GridItem,
  Icon,
} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { DASHBOARD } from '../constants/routes';
import { Container } from '@material-ui/core';
import Footer from '../components/Footer/Footer';
import { MdMailOutline } from 'react-icons/md';
import { FaGithub, FaTelegram } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <Container>
        <Box mb = {{md:130}} >
          <Box mt={4} p={2}>
            <Breadcrumb
              spacing='8px'
              separator={<ChevronRightIcon color='gray.500' />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to={DASHBOARD} fontFamily='Inter'>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink fontFamily='Inter'>About</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Box mt='10' fontFamily='Poppins' mb='10'>
            <Heading mb='5' fontFamily='Poppins'>
              About
            </Heading>
            <Text>
              <Link href={DASHBOARD}>Coinforge</Link> is a lifelike mock
              cryptocurrency trading simulator for people looling to gain crypto
              experience. Practice cryptocurrency trading free of cost.
            </Text>
          </Box>
          <Box mt='10' fontFamily='Poppins' mb='10'>
            <Heading mb='5' fontFamily='Poppins'>
              Contact
            </Heading>
            <SimpleGrid columns={{ sm: 1, md: 3 }} spacing='10'>
              <GridItem>
                <Icon as={MdMailOutline} pr='1' h={6} w={6} />
                <Link href='mailto:aadityamayankar@gmail.com'>
                  aadityamayankar@gmail.com
                </Link>
              </GridItem>
              <GridItem>
                <Icon as={FaGithub} pr='1' h={6} w={6} />
                <Link target='_blank' href='https://github.com/aadityamayankar'>
                  Report an issue
                </Link>
              </GridItem>
              <GridItem>
                <Icon as={FaTelegram} pr='1' h={6} w={6} />
                <Link target='_blank' href='https://https//t.me/Dijkstraa'>
                  Chat
                </Link>
              </GridItem>
            </SimpleGrid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default About;
