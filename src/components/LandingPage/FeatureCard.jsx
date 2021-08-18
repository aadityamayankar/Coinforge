import {Box,Image,Text} from "@chakra-ui/react";

const FeatureCard = (props) => {
    const data = props.data;

    return(
        <Box maxW='300px' borderRadius='5px' overflow='hidden' textAlign='center'>
            <Box>
                <Image ml="auto" mr="auto" src="https://via.placeholder.com/75x75.png/FFFFFF"/>
            </Box>
            <Box p={5}>
                <Box>
                    <Text fontSize="md" fontWeight="bold">{data.title}</Text>
                </Box>
                <Box>
                    <Text>
                        {data.body}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}

export default FeatureCard;