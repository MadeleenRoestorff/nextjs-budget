import { useContext } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { InputContext } from './BudgetContext';
import { formatFloatPrice } from '../../lib/utils';

export default function SaveBudget() {
  const { values, dispatch } = useContext(InputContext);
  console.log('DEBUG SaveBudget values', values);

  const ActionButton = () => (
    <Button
      variant="small"
      color="inherit"
      onClick={() => dispatch({ type: 'balance' })}
    >
      {`Add ${formatFloatPrice(values?.balance?.total)}`}
    </Button>
  );

  const actionNeeded =
    values?.alertStatus?.alertType == 'info'
      ? { action: <ActionButton /> }
      : {};

  return (
    <Stack spacing={2} alignItems="center">
      <Button
        sx={{ width: '50%' }}
        variant="outlined"
        onClick={() =>
          console.log('DEBUG SaveBudget save onClick') ||
          dispatch({ type: 'save' })
        }
      >
        SAVE
      </Button>
      <Collapse
        sx={{ width: '50%' }}
        in={values?.alertStatus?.message?.length > 0}
      >
        <Alert
          variant="outlined"
          severity={values?.alertStatus?.alertType}
          {...actionNeeded}
        >
          {values?.alertStatus?.message}
        </Alert>
      </Collapse>
    </Stack>
  );
}
