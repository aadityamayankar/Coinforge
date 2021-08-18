import { useEffect,useState } from "react";
import Footer from "../components/Footer/Footer";
import CoinChart from '../components/Dashboard/CoinChart';
import {useSelector,useDispatch} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';
import { setCurrentUser } from "../auth/slices/authSlice";
import axios from "axios";

const Dashboard = () => {
    const {isAuthenticated,isLoading,user,getAccessTokenSilently} = useAuth0();
    const payload = {
        isAuthenticated,isLoading,user
    }
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [cryptoData,setCryptoData] = useState([]);
    const [iscryptoDataLoading,setIsCryptoDataLoading] = useState(true);
    const [cryptoDataError,setCryptoDataError] = useState();

    useEffect(()=>{
        fetchCryptoData();
        dispatch(setCurrentUser(payload));
    },[]);

    const fetchCryptoData = () => {
        let jwtToken;
        getAccessTokenSilently()
        .then((token) => {
            jwtToken = token;
        })
        .then(() => {
            axios.get('http://localhost:8080/api/crypto_data',{
                headers:{
                    authorization: `Bearer ${jwtToken}`,
                }
            })
            .then((response) => {
                setCryptoData(response.data);
                setIsCryptoDataLoading(false);
            })
            .catch(e => {
                setCryptoDataError(e);
                console.log(e);
            });
        })
        .catch(e => {
            setCryptoDataError(e);
            console.log(e);
        });
    }

    // console.log(cryptoData);

    // const ele = {
    //     "id": "bitcoin",
    //     "symbol": "btc",
    //     "name": "Bitcoin",
    //     "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    //     "current_price": 46768,
    //     "market_cap": 878925170365,
    //     "market_cap_rank": 1,
    //     "fully_diluted_valuation": 982531058650,
    //     "total_volume": 33781401482,
    //     "high_24h": 48121,
    //     "low_24h": 46146,
    //     "price_change_24h": 391.83,
    //     "price_change_percentage_24h": 0.84489,
    //     "market_cap_change_24h": 7420701553,
    //     "market_cap_change_percentage_24h": 0.85148,
    //     "circulating_supply": 18785593,
    //     "total_supply": 21000000,
    //     "max_supply": 21000000,
    //     "ath": 64805,
    //     "ath_change_percentage": -27.72968,
    //     "ath_date": "2021-04-14T11:54:46.763Z",
    //     "atl": 67.81,
    //     "atl_change_percentage": 68968.38467,
    //     "atl_date": "2013-07-06T00:00:00.000Z",
    //     "roi": null,
    //     "last_updated": "2021-08-14T10:43:55.243Z",
    //     "price_change_percentage_1h_in_currency": -2.2805960279509527,
    //     "price_change_percentage_24h_in_currency": 0.8448928288026387,
    //     "price_change_percentage_7d_in_currency": 9.265875035524413
    // }

    return (
        <>
            <div>Dashboard</div>
            <div>
                {cryptoData.map((coin)=>(
                    <CoinChart
                    key = {coin.id}
                    color = {Math.sign(coin.price_change_percentage_7d_in_currency) >= 0 ? 'lime' : 'red'}
                    id = {coin.id}
                    />
                ))}
            </div>
            <Footer/>
        </>
    );
}

export default Dashboard;