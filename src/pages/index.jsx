import axios from 'axios';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardsContent from '../components/homePage/CardsContent';
import Layout from '../components/general/Layout';

export default function Index() {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(null);
    setError(null);
    async function getResult() {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/budget/budget/'
        );
        setResult(response?.data?.results);
      } catch (err) {
        setResult(null);
        setError(err);

        console.error(err);
      }
    }
    getResult();
  }, []);

  return (
    <Layout isHomePage>
      <Box sx={{ maxWidth: '600px', margin: 'auto' }}>
        <Typography variant="h1">Home</Typography>
        <CardsContent result={result} />
      </Box>
    </Layout>
  );
}
