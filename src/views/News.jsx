import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { setCurrentUser } from '../auth/slices/authSlice';
import {Link} from 'react-router-dom';
import { Box, Text, Grid,Breadcrumb,BreadcrumbItem,BreadcrumbLink,Heading } from '@chakra-ui/react';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {DASHBOARD} from '../constants/routes'
import { Container } from '@material-ui/core';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import NewsCard from '../components/News/NewsCard';
import FadeInSection from '../components/FadeIn/FadeInSection';
import LoadingNews from '../components/News/LoadingNews';

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
  }, []); //eslint-disable-line
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

  return (
    <>
      <Container>
      <Box mt={4} p={2}>
          <Breadcrumb
            spacing='8px'
            separator={<ChevronRightIcon color='gray.500' />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={DASHBOARD} fontFamily='Inter'>
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink fontFamily='Inter'>News</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box mt='10' mb='10'>
          <Box mb='6'>
            <Heading textAlign = 'center' fontFamily = 'montserrat' mb = {10}>Hot News 🔥</Heading>
            <Text fontFamily='montserrat' fontWeight='bold' textAlign='right'>
              Latest news headlines...
            </Text>
          </Box>
          <Box>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              gap={6}
            >
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
