import { useContext, useState, useEffect } from 'react';
import { Alert, Button, Collapse, IconButton, Stack } from '@mui/material';
import { InputContext } from './BudgetContext';
import { formatFloatPrice } from '../../lib/utils';
import { useRouter } from 'next/router';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

export default function SaveBudget() {
  const { values, dispatch } = useContext(InputContext);
  const router = useRouter();
  const [alert, setAlert] = useState({
    alertType: 'error',
    message: '',
  });

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof router?.query?.balance != 'undefined') {
      const balance = router?.query?.balance;
      if (balance > 0) {
        setAlert({
          alertType: 'info',
          message: `You can add the balace to savings.`,
        });
      } else if (balance < 0) {
        setAlert({
          alertType: 'warning',
          message: 'Balance is negative - adjust the budget.',
        });
      } else {
        setAlert({
          alertType: 'success',
          message: `Budget was successfully saved.`,
        });
      }
    }
  }, [router.isReady, router.query]);

  const saveInstance = async () => {
    const error = false;
    const budgetObj = ['incomeList', 'fixedEList', 'variaEList'].map(label => {
      const localCopy = JSON.parse(JSON.stringify(values?.[label]));
      const budgetArr = localCopy.map((expense, eIndex) => {
        const pairs = expense.map((item, itemindex) => {
          let newValue = item.value;
          if (newValue == '') {
            error = true;
            localCopy?.[eIndex]?.[itemindex]?.inputErr = true;
            dispatch({
              type: 'saveError',
              list: label,
              listValue: localCopy,
            });
          } else {
            if (item.id == 'amount') {
              newValue = parseFloat(item.value) * 100 || 0;
              if (label === 'variaEList') {
                newValue = { budgeted: newValue };
              }
            }
          }
          return newValue || '';
        });
        return pairs;
      });
      return budgetArr;
    });

    if (!error) {
      const data = {
        timestamp: values?.budgetDateStart.toJSON(),
        timestamp_end: values?.budgetDateEnd.toJSON(),
        income_source: Object.fromEntries(budgetObj?.[0]),
        fixed_expense: Object.fromEntries(budgetObj?.[1]),
        variable_expense: Object.fromEntries(budgetObj?.[2]),
      };

      const urlBase = 'http://127.0.0.1:8000/budget/budget/';
      const id = router.isReady ? router.query.id : null;
      const url = id ? `${urlBase}${id}/` : urlBase;
      const requestFunction = id ? axios.patch : axios.post;

      requestFunction(url, data)
        .then(response => {
          console.log(JSON.stringify(response?.data));
          const balance = response?.data?.left_over_inbudget_in_cents;
          router.push(
            `/budget/edit/?id=${response?.data?.id}&balance=${balance}`
          );
        })
        .catch(err => {
          console.error(err);
          setAlert({
            alertType: 'error',
            message: 'Could not send data try again.',
          });
        });
    } else {
      setAlert({
        alertType: 'error',
        message: 'Missing inputs, please try again.',
      });
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Button sx={{ width: '50%' }} variant="outlined" onClick={saveInstance}>
        SAVE
      </Button>
      <Collapse sx={{ width: '50%' }} in={alert?.message?.length > 0}>
        <Alert
          variant="outlined"
          severity={alert?.alertType}
          action={
            <Stack direction="row" spacing={1} alignItems="center">
              {alert.alertType == 'info' ? (
                <Button
                  variant="small"
                  color="inherit"
                  onClick={() => {
                    dispatch({ type: 'balance' });
                    setAlert({
                      alertType: 'warning',
                      message: '',
                    });
                  }}
                >
                  {`Add ${formatFloatPrice(values?.balance?.total)}`}
                </Button>
              ) : null}

              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert({
                    alertType: 'warning',
                    message: '',
                  });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          }
        >
          {alert?.message}
        </Alert>
      </Collapse>
    </Stack>
  );
}
