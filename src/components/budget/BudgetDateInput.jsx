import { useContext } from 'react';
import { InputContext } from './BudgetContext';

import DateInput from '../general/controlledInputs/DateInput';
import { Typography, Paper, Stack } from '@mui/material';

import styled from '@emotion/styled';

export default function BudgetDateInput() {
  const { values, dispatch } = useContext(InputContext);

  const handleDateChange = event =>
    dispatch({ type: 'date', prop: 'budgetDateStart', event: event });

  const handleDateEndChange = event =>
    dispatch({ type: 'date', prop: 'budgetDateEnd', event: event });
  return (
    <StyledPaper>
      <Typography variant="h2">Duration</Typography>
      <Stack spacing={3}>
        <DateInput
          label="Start Date"
          values={values?.budgetDateStart}
          handleChange={handleDateChange}
        />
        <DateInput
          label="End Date"
          values={values?.budgetDateEnd}
          handleChange={handleDateEndChange}
        />
      </Stack>
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: '40px',
}));
