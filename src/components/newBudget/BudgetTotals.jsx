import { Typography } from '@mui/material';
import { useContext } from 'react';
import { InputContext } from './BudgetContext';
import { formatFloatPrice } from '../../lib/utils';

import AnimateCounters from '../general/AnimateCounters';

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
      <Typography variant="h5">
        {formatFloatPrice(values?.balanceX?.[inputList])}
      </Typography>

      <AnimateCounters typoVari="h6" number={values?.balanceX?.[inputList]} />
    </div>
  );
}
