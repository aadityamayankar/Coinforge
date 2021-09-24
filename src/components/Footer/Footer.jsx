import Copyright from '../Copyright';
import {
  Box,
  Stack,
  ButtonGroup,
  IconButton,
  Divider,
  Image,
  useColorMode,
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import lightLogo from '../../assets/logo/lightlogo.png';
import darkLogo from '../../assets/logo/darklogo.png';

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      mt='10'
      as='footer'
      role='contentinfo'
      mx='auto'
      maxW='7xl'
      py='12'
      px={{ base: '4', md: '8' }}
    >
      <Stack>
        <Stack
          direction='row'
          spacing='4'
          align='center'
          justify='space-between'
        >
          {/* <Logo /> */}
          <Text fontFamily='Inter'>
            <Image src={colorMode === 'dark' ? darkLogo : lightLogo} />
          </Text>
          <ButtonGroup variant='ghost' color='gray.600'>
            <IconButton
              as='a'
              href='#'
              aria-label='LinkedIn'
              icon={<FaLinkedin fontSize='20px' />}
            />
            <IconButton
              as='a'
              href='#'
              aria-label='GitHub'
              icon={<FaGithub fontSize='20px' />}
            />
            <IconButton
              as='a'
              href='#'
              aria-label='Twitter'
              icon={<FaTwitter fontSize='20px' />}
            />
          </ButtonGroup>
        </Stack>
        <Divider />
        <Copyright alignSelf={{ base: 'center', sm: 'start' }} />
      </Stack>
    </Box>
  );
};

export default Footer;
