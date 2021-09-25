import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { DASHBOARD } from '../constants/routes';
import { Container } from '@material-ui/core';
import {
  Box,
  Center,
  Stack,
  Image,
  Text,
  ChakraProvider,
  useColorMode,
} from '@chakra-ui/react';
import { default as theme } from '../landingTheme';
import GetStartedButton from '../components/LandingPage/GetStartedButton';
import Moon from '../components/LandingPage/Moon';
import Footer from '../components/Footer/Footer';
import FeatureCards from '../components/LandingPage/FeatureCards';
import FadeInSection from '../components/FadeIn/FadeInSection';
import dashboardpng from '../assets/landingPage/dashboard.png';
import assetpng from '../assets/landingPage/asset.png';
import portfolioapng from '../assets/landingPage/portfolio.png';
import portfoliobpng from '../assets/landingPage/portfolio2.png';
import newspng from '../assets/landingPage/news.png';

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { setColorMode, colorMode } = useColorMode();
  useEffect(() => {
    setColorMode('dark');
  });

  const login = () => {
    loginWithRedirect({
      redirectUri: `http://localhost:3000${DASHBOARD}`,
    });
  };

  console.log(isAuthenticated);

  return (
    <>
      <ChakraProvider theme={theme}>
        <Container>
          <Box>
            <FadeInSection>
              <Box minH='100vh'>
                <Center height='100vh'>
                  <Stack align='center' textAlign='center'>
                    <Box>
                      <Text fontSize='7xl' fontFamily='righteous'>
                        Coinforge
                      </Text>
                      <Text fontSize='lg' variant='subtitle1'>
                        Best mock trading and crypto exchange simulator.
                      </Text>
                    </Box>
                    <Box>
                      <GetStartedButton login={login} />
                    </Box>
                    <Box>
                      <Text fontSize='xs'>*Free and open source</Text>
                    </Box>
                  </Stack>
                </Center>
              </Box>
            </FadeInSection>
            <FadeInSection>
              <Box pt='2vh' pb='10vh'>
                <Center>
                  <Stack align='center' spacing={10}>
                    <Box>
                      <Text
                        fontFamily='montserrat'
                        fontWeight='700'
                        textAlign='center'
                        fontSize='2xl'
                      >
                        Create your crypto portfolio now
                      </Text>
                    </Box>
                    <Box
                      border='1px'
                      borderRadius='lg'
                      borderColor={
                        colorMode === 'light'
                          ? 'blackAlpha.100'
                          : 'whiteAlpha.100'
                      }
                    >
                      <Image borderRadius='10px' src={dashboardpng} />
                    </Box>
                    <Box>
                      <Text
                        fontFamily='montserrat'
                        fontWeight='700'
                        textAlign='center'
                        fontSize='2xl'
                      >
                        Buy / Sell Cryptocurrency
                      </Text>
                    </Box>
                    <Box
                      border='1px'
                      borderRadius='lg'
                      borderColor={
                        colorMode === 'light'
                          ? 'blackAlpha.100'
                          : 'whiteAlpha.100'
                      }
                    >
                      <Image borderRadius='10px' src={assetpng} />
                    </Box>
                    <Box>
                      <Text
                        fontFamily='montserrat'
                        fontWeight='700'
                        textAlign='center'
                        fontSize='2xl'
                      >
                        Manage Your Portfolio
                      </Text>
                    </Box>
                    <Box
                      border='1px'
                      borderRadius='lg'
                      borderColor={
                        colorMode === 'light'
                          ? 'blackAlpha.100'
                          : 'whiteAlpha.100'
                      }
                    >
                      <Image borderRadius='10px' src={portfolioapng} />
                    </Box>
                    <Box
                      border='1px'
                      borderRadius='lg'
                      borderColor={
                        colorMode === 'light'
                          ? 'blackAlpha.100'
                          : 'whiteAlpha.100'
                      }
                    >
                      <Image borderRadius='10px' src={portfoliobpng} />
                    </Box>
                    <Box>
                      <Text
                        fontFamily='montserrat'
                        fontWeight='700'
                        textAlign='center'
                        fontSize='2xl'
                      >
                        Catch up on latest crypto news
                      </Text>
                    </Box>
                    <Box
                      border='1px'
                      borderRadius='lg'
                      borderColor={
                        colorMode === 'light'
                          ? 'blackAlpha.100'
                          : 'whiteAlpha.100'
                      }
                    >
                      <Image borderRadius='10px' src={newspng} />
                    </Box>
                  </Stack>
                </Center>
              </Box>
            </FadeInSection>
            <FadeInSection>
              <Box pt='2vh' pb='10vh'>
                <Center>
                  <Stack spacing={10}>
                    <Box>
                      <Text
                        fontFamily='montserrat'
                        fontWeight='700'
                        textAlign='center'
                        fontSize='2xl'
                      >
                        Features
                      </Text>
                    </Box>
                    <FeatureCards />
                  </Stack>
                </Center>
              </Box>
            </FadeInSection>
            <FadeInSection>
              <Box height='300px'>
                <Moon login={login} />
              </Box>
            </FadeInSection>
          </Box>
        </Container>
        <FadeInSection>
          <Footer />
        </FadeInSection>
      </ChakraProvider>
    </>
  );
};

export default LandingPage;
