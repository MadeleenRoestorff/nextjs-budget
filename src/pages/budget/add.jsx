import { InputContextProvider } from '../../components/newBudget/BudgetContext';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import BudgetDateInput from '../../components/newBudget/BudgetDateInput';
import SaveBudget from '../../components/newBudget/SaveBudget';
import Budgetnput from '../../components/newBudget/BudgetInput';
import BudgetBalance from '../../components/newBudget/BudgetBalance';
import Layout from '../../components/general/Layout';

const budgetInputSections = [
  { heading: 'Income', inputList: 'incomeList' },
  { heading: 'Fixed Expenses', inputList: 'fixedEList' },
  { heading: 'Planned Expenses', inputList: 'variaEList' },
];

export default function BudgetAdd() {
  return (
    <Layout>
      <Typography variant="h1">Add New Budget</Typography>
      <InputContextProvider>
        <Box sx={{ flexGrow: 1 }} component="form" autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <>
                {budgetInputSections.map((section, sectionIndes) => {
                  return (
                    <Budgetnput
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
      </InputContextProvider>
    </Layout>
  );
}
