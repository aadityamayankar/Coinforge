import { Skeleton, SkeletonText, Box, HStack } from '@chakra-ui/react';

const NewsSkeletion = () => {
  return (
    <Box borderWidth='1px' borderRadius='lg' h='200'>
      <HStack spacing={4}>
        <Box>
          <Skeleton w='150px' h='150px' borderRadius='lg' />
          <Box p={3}>
            <SkeletonText noOfLines={1} />
          </Box>
        </Box>
        <Box minH='150px'>
          <Box p={2}>
            <SkeletonText w='sm' noOfLines={1} />
          </Box>
          <Box p={2} mt={5}>
            <SkeletonText w='sm' spacing='4' noOfLines={4} />
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

const LoadingNews = () => {
  const data = [...Array(10)].map((x, i) => <NewsSkeletion key={i} />);
  return <>{data}</>;
};

export default LoadingNews;
