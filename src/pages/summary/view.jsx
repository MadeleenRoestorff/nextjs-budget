import Layout from '../../components/general/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SummaryCards from '../../components/summary/SummaryCards';

import { useRouter } from 'next/router';

export default function SummaryViewPage() {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const router = useRouter();
  const id = router?.query?.id ? router?.query?.id : 1;

  useEffect(() => {
    setResult(null);
    setError(null);
    async function getResult() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/budget/budget/${id}/`
        );
        setResult(response?.data);
      } catch (err) {
        setResult(null);
        setError(err);

        console.error(err);
      }
    }
    getResult();
  }, []);

  return (
    <Layout>
      <h1>Summary</h1>
      <SummaryCards budget={result} />
    </Layout>
  );
}
