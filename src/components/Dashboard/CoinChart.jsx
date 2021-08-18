import { useState, useEffect, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {LineChart,Line,ResponsiveContainer} from 'recharts';
import axios from 'axios';

const CoinChart = ({ id, color}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState();
  const [isDataLoading, setisDataLoading] = useState(true);
  const [isDataError, setIsDataError] = useState();

  const fetchData = () => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
      })
      .then(() => {
        axios
          .get(`http://localhost:8080/api/crypto_chart/${id}`,{
              headers:{
                authorization: `Bearer ${jwtToken}`,
              }
          })
          .then((response) => {
            setisDataLoading(false);
            setData(response.data);
          })
          .catch((e) => {
            setisDataLoading(false);
            setIsDataError(e);
            console.log(e);
          });
      })
      .catch((e) => {
        setisDataLoading(false);
        setIsDataError(e);
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [fetch, id]);

  // console.log(data);

  const mappedData = useMemo(() => {
    return data?.prices.length
      ? data.prices.map((ele) => ({
          date: (new Date(ele[0])).toString().substring(0,10),
          price: ele[1],
        }))
      : [];
  }, [data]);

  // console.log(JSON.stringify(mappedData));

  return (
    <>
      {id}
      <LineChart width={150} height={50} data = {mappedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <Line type="linear" dataKey="price" stroke={color} dot={false} />
      </LineChart>
    </>
  );
};

export default CoinChart;
