import {
  Box,
  SimpleGrid,
  Stack,
  Image,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import GetStartedButton from './GetStartedButton';
import '@fontsource/raleway';
import * as CRYPTO from '../../assets/cryptoLogo';

const Moon = (props) => {
  return (
    <>
      <Box>
        <SimpleGrid columns={{ sm: 1, md: 3 }}>
          <Box display={{ base: 'none', md: 'grid' }}>
            <Grid
              h='300px'
              templateRows='repeat(3, 1fr)'
              templateColumns='repeat(4, 1fr)'
              gap={4}
            >
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.BCN} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.CLOAK} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.ACT} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.BTC} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.VIPS} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.LITE} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.TUSD} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.STRAT} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-90deg)' src={CRYPTO.STELLAR} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.ONION} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.RMC} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.BAT} />
              </GridItem>
            </Grid>
          </Box>
          <Flex alignItems='center' justifyContent='center' minH='300px'>
            <Stack align='center'>
              <Box>
                <Text
                  fontSize='2xl'
                  fontFamily='raleway'
                  textAlign='center'
                  fontWeight='700'
                >
                  Get Started in just two clicks.
                </Text>
              </Box>
              <Box>
                <GetStartedButton login={props.login} />
              </Box>
            </Stack>
          </Flex>
          <Box display={{ base: 'none', md: 'grid' }}>
            <Grid
              h='300px'
              templateRows='repeat(3, 1fr)'
              templateColumns='repeat(4, 1fr)'
              gap={4}
            >
              <GridItem>
                <Image src={CRYPTO.BNB} />
              </GridItem>
              <GridItem>
                <Image src={CRYPTO.PPC} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.BSD} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.NEBL} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.ICX} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.DGB} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.DOGE} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.DEV} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.DASH} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.DENT} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.NPXS} />
              </GridItem>
              <GridItem>
                <Image transform='rotate(-45deg)' src={CRYPTO.ETHEREUM} />
              </GridItem>
            </Grid>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Moon;
