import { InputContextProvider } from '../components/newBudget/BudgetContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import DateInput from '../components/newBudget/DateInput';
import IncomeInput from '../components/newBudget/IncomeInput';
import Layout from '../components/general/Layout';

var data = JSON.stringify({
  timestamp: '2021-12-19T12:56:53Z',
  income_in_cents: {
    Martin: 50000,
    Madeleen: 10000,
  },
  fixed_expenses: {
    Insurance: 3000,
    Rent: 7000,
    Savings: 10000,
  },
  variable_expenses: {
    Food: {
      budgeted: 10000,
    },
    Petrol: {
      budgeted: 2000,
    },
    Entertainment: {
      budgeted: 8000,
    },
    Birthday: {
      budgeted: 800,
    },
  },
});

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
    <Layout>
      <Typography variant="h1">Add a New Budget</Typography>
      <InputContextProvider>
        {/* <DateInput values={values} setValues={setValues} /> */}
        <IncomeInput />
      </InputContextProvider>
    </Layout>
  );
}
