import Layout from '../components/general/Layout';
import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { convertCentToRand } from '../lib/utils';
import CardLayout from '../components/general/CardsLayout';

export default function HomePage() {
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

  const router = useRouter();
  const handleNewClicked = id => {
    router.push(`/summary/view/?id=${id}`);
  };

  const budgetscards = result?.map(budget => {
    return (
      <CardsContentStyling
        key={`cardscontent-${budget?.id}`}
        onClick={() => handleNewClicked(budget?.id)}
      >
        <h3>{budget?.id}</h3>
        <div>{budget?.timestamp}</div>
        <div>{`Remaining ${convertCentToRand(
          budget?.total_remaining_in_cents
        )}`}</div>
      </CardsContentStyling>
    );
  });

  return (
    <Layout isHomePage>
      <h1>Home</h1>
      <CardLayout cards={budgetscards} key="budget" />
    </Layout>
  );
}

const CardsContentStyling = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
