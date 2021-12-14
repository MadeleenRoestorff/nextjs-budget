import styled from 'styled-components';
import Layout from '../components/general/Layout';
import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';

const cardTitles = ['Card Title1', 'Card Title2', 'Card Title3', 'Card Title4'];

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
        <h1>Summary</h1>
        {/* <SummaryCardContainer>
          {cardTitles.map(title => (
            <SummaryCard key={title}>{title}</SummaryCard>
          ))}
        </SummaryCardContainer> */}
        <div>
          {data?.map(budget => {
            console.log(budget);
            return (
              <div key={budget?.id}>
                <h2>{`You have R${budget?.total_remaining_in_cents} left this month`}</h2>

                <p>{budget?.timestamp}</p>
                <SummaryCardContainer key="fixed">
                  <SummaryCard key="income">
                    <h3>Income</h3>
                    {Object.keys(budget?.income_in_cents)?.map(income => (
                      <div key={`${budget?.id}-${income}`}>
                        <span>{income}</span>
                        <span>{budget?.income_in_cents[income]}</span>
                      </div>
                    ))}
                  </SummaryCard>

                  <SummaryCard key="fixedexpenses">
                    <h3>Fixed Expenses</h3>
                    {Object.keys(budget?.fixed_expenses)?.map(fixed_expense => (
                      <div key={`${budget?.id}-${fixed_expense}`}>
                        <span>{fixed_expense}</span>
                        <span>{budget?.fixed_expenses[fixed_expense]}</span>
                      </div>
                    ))}
                  </SummaryCard>
                </SummaryCardContainer>
                <SummaryCardContainer key="variableexpenses">
                  <SummaryCard>
                    <h3>Variable Expenses</h3>
                    {Object.keys(budget?.variable_expenses)?.map(v_expense => (
                      <div key={`${budget?.id}-${v_expense}`}>
                        <span>{v_expense}</span>
                        <span>Budgeted</span>
                        <span>
                          {budget?.variable_expenses[v_expense]['budgeted']}
                        </span>
                        <span>Actual</span>
                        <span>
                          {budget?.variable_expenses[v_expense]['actual']}
                        </span>

                        <span>Remaining</span>
                        <span>
                          {budget?.remaining_by_category_in_cents[v_expense]}
                        </span>
                      </div>
                    ))}
                  </SummaryCard>
                </SummaryCardContainer>
              </div>
            );
          })}
        </div>
      </Main>
    </Layout>
  );
}

const Main = styled.div`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
`;
const SummaryCardContainer = styled.div`
  z-index: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  /* flex-wrap: wrap; */
`;
const SummaryCard = styled.div`
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  border-radius: 40px;

  background-color: hsla(0, 100%, 100%, 0.05);
  box-shadow:
		/* offset-x | offset-y | blur-radius | spread-radius | color */ 0px
      12px 17px 2px hsla(0, 0%, 0%, 0.14),
    0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
    0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);
`;
