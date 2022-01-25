import { useEffect, useState } from 'react';

import { InputContextProvider } from '../../components/budget/BudgetContext';
import Typography from '@mui/material/Typography';
import Layout from '../../components/general/Layout';
import TypeInput from '../../components/general/controlledInputs/TypeInput';
import DateInput from '../../components/general/controlledInputs/DateInput';

import axios from 'axios';

export default function BudgetEdit() {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function getResult() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/budget/budget/`
        );
        setResult(response.data);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    }
    getResult();
  }, []);

  console.log('DEBUG result NEXT', result);
  return (
    <Layout>
      <Typography variant="h1">Edit Expense</Typography>
      <InputContextProvider>
        <DateInput values={new Date()} />
        <TypeInput
          key="expense value"
          values={0}
          type="number"
          label="Expense Amount"
          inputError={false}
        />
      </InputContextProvider>
    </Layout>
  );
}
