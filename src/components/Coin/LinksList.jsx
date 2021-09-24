import {Heading,Box,Table,Td,Tr,Tbody, Link, Icon} from '@chakra-ui/react';
import {ExternalLinkIcon} from '@chakra-ui/icons';

const LinksList = ({links}) => {
    return (
        <Table variant="simple" mt = '3' fontFamily = 'Poppins'>
            <Tbody>
                {links.map((link,i)=>(
                    <Tr key = {i}>
                        <Td> <Icon as = {ExternalLinkIcon}/> <Link href = {link.url} isExternal>{link.type}</Link></Td>
                        <Td>{link.name}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default LinksList;