import { InputContextProvider } from '../../components/newBudget/BudgetContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import BudgetDateInput from '../../components/newBudget/BudgetDateInput';
import IncomeInput from '../../components/newBudget/IncomeInput';
import Layout from '../../components/general/Layout';

const budgetInputSections = [
  { heading: 'Income', inputList: 'incomeList' },
  { heading: 'Fixed Expenses', inputList: 'fixedEList' },
  { heading: 'Variable Expenses', inputList: 'variaEList' },
];

export default function BudgetAdd() {
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
        <BudgetDateInput />
        <>
          {budgetInputSections.map((section, sectionIndes) => {
            return (
              <IncomeInput
                key={`budgetinputsections-${sectionIndes}`}
                heading={section.heading}
                inputList={section.inputList}
              />
            );
          })}
        </>
      </InputContextProvider>
    </Layout>
  );
}
