import { Typography } from '@mui/material';
import { useContext } from 'react';
import { InputContext } from './BudgetContext';
import { formatFloatPrice } from '../../lib/utils';

export default function BudgetTotals({ inputList = '' }) {
  const { values } = useContext(InputContext);

  return (
    <div>
      <Typography
        sx={theme => ({
          color: theme.palette.text.disabled,
          textAlign: 'end',
        })}
        variant="body2"
      >
        TOTAL
      </Typography>
      <Typography variant="h6">
        {formatFloatPrice(values?.balance?.[inputList])}
      </Typography>
    </div>
  );
}
