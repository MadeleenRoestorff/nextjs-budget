import { useContext } from 'react';
import { InputContext } from './BudgetContext';
import Paper from '@mui/material/Paper';
import { formatFloatPrice } from '../../lib/utils';
import { styled } from '@mui/material/styles';

import BalanceIcon from '@mui/icons-material/Balance';
import PendingIcon from '@mui/icons-material/Pending';

export default function BudgetBalance() {
  const { values } = useContext(InputContext);
  const balance = values?.balance;
  return (
    <StyledPaper balance={balance}>
      {balance == 0 ? (
        <BalanceIcon fontSize="large" />
      ) : (
        <PendingIcon fontSize="large" />
      )}
      {`Balance ${formatFloatPrice(balance)}`}
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)(({ theme, balance }) => ({
  ...theme.typography.overline,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '40px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transitionProperty: 'all',
  color: `${
    balance == 0
      ? 'white'
      : balance > 0
      ? theme.palette.success.main
      : theme.palette.error.main
  }`,
  '& svg path': {
    fill: `${
      balance == 0
        ? 'white'
        : balance > 0
        ? theme.palette.success.main
        : theme.palette.error.main
    }`,
    transition: 'fill 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
}));
