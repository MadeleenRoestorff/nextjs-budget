import styled from 'styled-components';
import Layout from '../components/general/Layout';
import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';

export default function HomePage() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    setError(null);

    async function getData() {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/budget/budget/'
        );
        setData(response?.data?.results);
      } catch (err) {
        setData(null);
        setError(err);

        console.error(err);
      }
    }

    getData();
  }, []);

  return (
    <Layout isHomePage>
      <Main>
        <div>
          {data?.map(budget => {
            return (
              <div key={budget?.id}>
                <p>{budget?.id}</p>
                <p>{budget?.timestamp}</p>
                <p>{budget?.total_remaining_in_cents}</p>
                {Object.keys(budget?.fixed_expenses)?.map(fixed_expense => (
                  <div key={`${budget?.id}-${fixed_expense}`}>
                    <span>{fixed_expense}</span>
                    <span>{budget?.fixed_expenses[fixed_expense]}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Main>
    </Layout>
  );
}

const Main = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
