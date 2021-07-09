import {useParams} from "react-router-dom";

const Predictor = () => {
    let {id} = useParams();
    return(
        <>
        <h1>Predictor Page</h1>
        <h3>ID: {id}</h3>
        </>
    );
}

export default Predictor;