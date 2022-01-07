import { useContext } from 'react';
import { InputContext } from './BudgetContext';

import DateInput from '../general/controlledInputs/DateInput';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';

export default function BudgetDateInput() {
  const { values, dispatch } = useContext(InputContext);

  const handleDateChange = event =>
    dispatch({ type: 'date', prop: 'budgetDate', event: event });
  return (
    <StyledPaper>
      <DateInput values={values?.budgetDate} handleChange={handleDateChange} />
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: '40px',
}));
