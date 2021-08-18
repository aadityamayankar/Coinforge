import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { setCurrentUser } from '../auth/slices/authSlice';
import { Box, Text, Grid } from '@chakra-ui/react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import NewsCard from '../components/News/NewsCard';
import FadeInSection from '../components/FadeIn/FadeInSection';
import Loading from '../components/Loading';
import LoadingNews from '../components/News/LoadingNews';


// use skeleton form chakra ui when loading


const News = () => {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const payload = {
    isAuthenticated,
    isLoading,
    user,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    fetchNews();
    dispatch(setCurrentUser(payload));
  }, []);
  const auth = useSelector((state) => state.auth);
  const [news, setNews] = useState({ articles: [] });
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState();
  console.log(auth);

  const fetchNews = () => {
    let jwtToken;
    getAccessTokenSilently()
      .then((token) => {
        jwtToken = token;
        // console.log(token);
      })
      .then(() => {
        axios
          .get('http://localhost:8080/api/news', {
            headers: {
              authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((response) => {
            setNews({ articles: response.data.Data });
            setIsNewsLoading(false);
            // console.log(response.data);
          })
          .catch((e) => {
            setNewsError(e);
            console.log(e)
          });
      })
      .catch((e) => {
        setNewsError(e);
        console.log(e);
      });
  };

  console.log(news);

  return (
    <>
      <Container>
        <Box mt='10' mb='10'>
          <Box mb='6'>
            <Text
              fontFamily='montserrat'
              fontWeight='black'
              textAlign='center'
              fontSize='4xl'
            >
              Hot Topics 🔥
            </Text>
            <Text fontFamily='montserrat' fontWeight='bold' textAlign='right'>
              Latest news headlines...
            </Text>
          </Box>
          <Box>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              gap={6}
            >
              {/*<Loading pos = {'absolute'}/>*/}
              {!news.articles.length ? (<LoadingNews/>) : news.articles.map((article) => (
                  <FadeInSection key={article.id}>
                      <NewsCard article={article} />
                  </FadeInSection>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default News;
