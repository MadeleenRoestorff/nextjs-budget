import { useContext } from 'react';
import { InputContext } from './BudgetContext';
import Paper from '@mui/material/Paper';
import { formatFloatPrice } from '../../lib/utils';
import { styled } from '@mui/material/styles';

import Lightning from '../../icons/Lightning';
import Scale from '../../icons/Scale';

export default function BudgetBalance() {
  const { values } = useContext(InputContext);
  return (
    <StyledPaper>
      {`Budget Balance ${formatFloatPrice(values?.balance)}`}
      <span>
        <Lightning />
        <Scale />
      </span>
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.overline,
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: '40px',
}));
