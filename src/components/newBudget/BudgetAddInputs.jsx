import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
