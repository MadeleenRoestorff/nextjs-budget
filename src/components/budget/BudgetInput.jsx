import { Typography, Paper, Stack } from '@mui/material';
import styled from '@emotion/styled';
import InputListAnimation from './InputListAnimation';
import BudgetTotals from './BudgetTotals';

export default function Budgetnput({ heading = '', inputList = '' }) {
  return (
    <StyledPaper>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2">{heading}</Typography>
        <BudgetTotals inputList={inputList} />
      </Stack>
      <InputListAnimation inputList={inputList} />
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(4)} ${theme.spacing(2)}`,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: '40px',
}));
