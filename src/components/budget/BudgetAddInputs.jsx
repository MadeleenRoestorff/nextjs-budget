import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { InputContext } from './BudgetContext';
import BudgetDateInput from './BudgetDateInput';
import SaveBudget from './SaveBudget';
import BudgetInput from './BudgetInput';
import BudgetBalance from './BudgetBalance';

const budgetInputSections = [
  { heading: 'Income', inputList: 'incomeList' },
  { heading: 'Fixed Expenses', inputList: 'fixedEList' },
  { heading: 'Planned Expenses', inputList: 'variaEList' },
];

export default function BudgetAddInputs() {
  const router = useRouter();
  const { dispatch } = useContext(InputContext);

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof router?.query?.id != 'undefined') {
      const id = router?.query?.id || 1;
      async function getResult() {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/budget/budget/${id}/`
          );
          return response?.data;
        } catch (err) {
          console.error(err);
        }
      }
      getResult().then(response => {
        dispatch({ type: 'populate', results: response });
      });
    }
  }, [router.isReady, router.query]);

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
