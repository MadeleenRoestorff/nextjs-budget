import Layout from '../components/general/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SummaryCards from '../components/summary/SummaryCards';

export default function SummaryPage() {
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
      <h1>Summary</h1>
      <>
        {result?.map((budget, index) => {
          return <SummaryCards key={`budget-${index}`} budget={budget} />;
        })}
      </>
    </Layout>
  );
}
