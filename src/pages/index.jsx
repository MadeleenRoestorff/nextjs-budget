import Link from '../components/general/Link';
import Layout from '../components/general/Layout';
import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { convertCentToRand, readableTimestamp } from '../lib/utils';
import CardLayout from '../components/general/CardsLayout';
import Magnify from '../icons/Magnify';
import AddPlus from '../icons/AddPlus';

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
        <h3>{readableTimestamp(budget?.timestamp)}</h3>

        <div>{`Remaining ${convertCentToRand(
          budget?.total_remaining_in_cents
        )}`}</div>
        <SmallText>{`ID ${budget?.id}`}</SmallText>
      </CardsContentStyling>
    );
  });

  budgetscards?.push(
    <Link href="/budgetadd/">
      <a>
        <AddPlus />
      </a>
    </Link>
  );

  return (
    <Layout isHomePage>
      <h1>Home</h1>
      <CardContainerStyling>
        <CardLayout
          cards={budgetscards}
          key="budget"
          Icon={Magnify}
          columns={2}
          notaddblock={false}
        />
      </CardContainerStyling>
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
const SmallText = styled.div`
  font-size: 0.5rem;
`;
const CardContainerStyling = styled.div`
  max-width: 800px;
`;
