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
  { heading: 'Variable Expenses', inputList: 'variaEList' },
];

export default function BudgetAdd() {
  return (
    <Layout>
      <Typography variant="h1">Add a New Budget</Typography>
      <InputContextProvider>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item xs={9}>
              <BudgetDateInput />
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
              <SaveBudget />
            </Grid>
            <Grid item xs={3}>
              <BudgetBalance />
            </Grid>
          </Grid>
        </Box>
      </InputContextProvider>
    </Layout>
  );
}
