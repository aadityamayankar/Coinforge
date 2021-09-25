import { Box, SimpleGrid, Icon } from '@chakra-ui/react';
import FeatureCard from './FeatureCard';
import { AiOutlinePieChart } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';
import { BiNews } from 'react-icons/bi';
import { FaBitcoin } from 'react-icons/fa';
import { RiOpenSourceLine } from 'react-icons/ri';
import { InfoOutlineIcon } from '@chakra-ui/icons';

const cards = [
  {
    title: 'Manage Portfolio',
    data: 'Track your portfolio with lifelike realtime data.',
    icon: <Icon h={20} w={20} as={AiOutlinePieChart} />,
  },
  {
    title: 'Predict Prices (WIP)',
    data: 'Predict cryptocurrency prices with the help of ML models',
    icon: <Icon h={20} w={20} as={BsGraphUp} />,
  },
  {
    title: 'News',
    data: 'Stay updated with latest news related to crypto.',
    icon: <Icon h={20} w={20} as={BiNews} />,
  },
  {
    title: 'Buy / Sell Crypto',
    data: 'Trade all you want with the initial $50,000 wallet balance',
    icon: <Icon h={20} w={20} as={FaBitcoin} />,
  },
  {
    title: 'Portfolio',
    data: 'Stay informed and connected to communities of crypto projects',
    icon: <Icon h={20} w={20} as={InfoOutlineIcon} />,
  },
  {
    title: 'Open Source',
    data: 'Open to contribution',
    icon: <Icon h={20} w={20} as={RiOpenSourceLine} />,
  },
];

const FeatureCards = () => {
  return (
    <Box>
      <SimpleGrid columns={{ sm: 2, md: 3 }} spacing='4'>
        {cards.map((card, indx) => {
          return (
            <FeatureCard
              key={indx}
              title={card.title}
              data={card.data}
              icon={card.icon}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default FeatureCards;
