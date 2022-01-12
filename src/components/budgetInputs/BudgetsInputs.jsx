import { useEffect, useState, useContext } from 'react';
import { InputContext } from '../newBudget/BudgetContext';

import axios from 'axios';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import BudgetDateInput from '../newBudget/BudgetDateInput';
import SaveBudget from '../newBudget/SaveBudget';
import BudgetInput from '../newBudget/BudgetInput';
import BudgetBalance from '../newBudget/BudgetBalance';

const budgetInputSections = [
  { heading: 'Income', inputList: 'incomeList' },
  { heading: 'Fixed Expenses', inputList: 'fixedEList' },
  { heading: 'Planned Expenses', inputList: 'variaEList' },
];

export default function BudgetsInputs() {
  const router = useRouter();
  const { dispatch } = useContext(InputContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    setError(null);
    const id = router?.query?.id || 1;
    async function getResult() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/budget/budget/${id}/`
        );
        return response?.data;
      } catch (err) {
        setError(err);

        console.error(err);
      }
    }

    getResult().then(response => {
      dispatch({ type: 'populate', results: response });
    });
  }, [router.isReady]);

  return (
    <Box sx={{ flexGrow: 1 }} component="form" autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <>
            {budgetInputSections.map((section, sectionIndes) => {
              return (
                <BudgetInput
                  key={`budgetinputsections-${sectionIndes}`}
                  heading={section.heading}
                  inputList={section.inputList}
                />
              );
            })}
          </>
        </Grid>
        <Grid sx={{ position: 'relative' }} item xs={4}>
          <BudgetDateInput />
          <BudgetBalance />
        </Grid>
      </Grid>
      <SaveBudget />
    </Box>
  );
}
