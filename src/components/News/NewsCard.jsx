import {Box,Image,HStack,Text, Link} from '@chakra-ui/react';
import {ExternalLinkIcon} from '@chakra-ui/icons';

const NewsCard = ({article}) =>{
    return(
        <Box borderWidth='1px' borderRadius='lg' h='200'>
            <HStack spacing={4}>
                <Box>
                    <Image maxW='150px' maxH='150px' borderRadius='lg' src={article.imageurl}></Image>
                    <Box p={3}>
                        <HStack>
                            <Text fontFamily='Poppins' fontSize='xx-small'>{Date(article.published_on).split(' ').map(a=>(a+' ')).slice(1,4)}</Text>
                            <Text fontFamily='Poppins' fontSize='xx-small'>{article.source}</Text>
                            <Text fontFamily='Poppins' fontSize='xx-small'>{article.lang}</Text>
                        </HStack>
                    </Box>
                </Box>
                <Box minH='150px'>
                    <Box p={2}>
                        <Link href={article.url} isExternal><Text fontFamily='Poppins' fontWeight='bold' fontSize={{base:'sm',md:'md'}} textAlign='center'>{article.title}<ExternalLinkIcon mb='4px' mx='2px'/></Text></Link>
                    </Box>
                    <Box p={2}>
                        <Text fontFamily='Poppins' fontSize={{base:'xs',md:'sm'}} noOfLines={{base:'3',md:'4'}}>{article.body}</Text>
                    </Box>
                </Box>
            </HStack>
        </Box>
    );
}

export default NewsCard;