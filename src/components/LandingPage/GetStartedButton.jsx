import {Button,LightMode} from "@chakra-ui/react";
const GetStartedButton  = (props) => {
    return(
        <>
        <LightMode>
            <Button borderRadius="50px" colorScheme="messenger" onClick = {() => props.login()}>
                Get Started
            </Button>
        </LightMode>
        </>
    );
}

export default GetStartedButton;