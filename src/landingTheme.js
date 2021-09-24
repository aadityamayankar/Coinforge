import { extendTheme } from '@chakra-ui/react';
import '@fontsource/roboto';
import '@fontsource/poppins';
import '@fontsource/montserrat';
import '@fontsource/righteous';
import '@fontsource/inter';

const landingTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    body: 'poppins',
  },
});

export default landingTheme;
