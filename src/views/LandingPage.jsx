import {useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { DASHBOARD } from '../constants/routes';
import { Container } from '@material-ui/core';
import { Box, Center, Stack, Image, SimpleGrid, Text,ChakraProvider,useColorMode } from '@chakra-ui/react';
import { default as theme } from '../landingTheme';
import GetStartedButton from '../components/LandingPage/GetStartedButton';
import Moon from '../components/LandingPage/Moon';
import Footer from '../components/Footer/Footer';
import FeatureCard from '../components/LandingPage/FeatureCard';
import FadeInSection from '../components/FadeIn/FadeInSection';

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated,error,isLoading,user,handleRedirectCallback } = useAuth0();
  const {setColorMode} = useColorMode();
  useEffect(() => {
    setColorMode('dark');
  });

  const login = () => {
    loginWithRedirect({
      redirectUri: `http://localhost:3000${DASHBOARD}`,
    });
  };
  
  return (
    !isAuthenticated && (
      <>
        <ChakraProvider theme={theme}>
          <Container>
            <Box>
              <FadeInSection>
                <Box minH="100vh">
                  <Center height='100vh'>
                    <Stack align='center' textAlign='center'>
                      <Box>
                      <Text fontSize='7xl' fontFamily="righteous">Coinforge</Text>
                      <Text fontSize='lg' variant='subtitle1'>
                      Best mock trading and crypto exchange simulator.
                      </Text>
                      </Box>
                      <Box>
                        <GetStartedButton login={login} />
                      </Box>
                      <Box>
                      <Text fontSize='xs'>
                      *Free and open source
                      </Text>
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
                      <Text fontFamily='montserrat' fontWeight='700' textAlign='center' fontSize='2xl'>
                      Create your crypto portfolio now
                      </Text>
                      </Box>
                      <Box>
                        <Image
                          borderRadius='10px'
                          src='https://via.placeholder.com/900x400.png/FFFFFF'
                        />
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
                        <Text fontFamily='montserrat' fontWeight='700' textAlign='center' fontSize='2xl'>
                        Features
                        </Text>
                      </Box>
                      <Box>
                        <SimpleGrid columns={{ sm: 2, md: 3 }} spacing='4'>
                          <FeatureCard
                            data={{
                              title: 'Manage Portfolio',
                              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
                            }}
                          />
                          <FeatureCard
                            data={{
                              title: 'Predict Prices',
                              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
                            }}
                          />
                          <FeatureCard
                            data={{
                              title: 'News',
                              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
                            }}
                          />
                          <FeatureCard
                            data={{
                              title: 'Buy / Sell Crypto',
                              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
                            }}
                          />
                          <FeatureCard
                            data={{
                              title: 'Portfolio',
                              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
                            }}
                          />
                          <FeatureCard
                            data={{
                              title: 'Open Source',
                              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum',
                            }}
                          />
                        </SimpleGrid>
                      </Box>
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
    )
  );
};

export default LandingPage;
