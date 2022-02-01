import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SaveButton from '../general/SaveButton';

export default function SaveExpense({
  expenseStates,
  inputErrors,
  setInputErrors,
  setExpenseStates,
}) {
  const router = useRouter();
  const [alert, setAlert] = useState({
    alertType: 'error',
    message: '',
  });

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof router?.query?.id != 'undefined') {
      const id = router?.query?.id;
      const url = `http://127.0.0.1:8000/budget/expenses/${id}/`;
      async function populateResult() {
        try {
          const response = await axios.get(url);
          return response?.data;
        } catch (err) {
          console.error(err);
        }
      }

      populateResult().then(response => {
        let state = { ...expenseStates };
        state = { ...state, timestamp: new Date(response?.timestamp) };
        state = { ...state, linked_budget_id: response?.linked_budget_id };
        state = { ...state, category: response?.category };
        state = { ...state, description: response?.description };
        state = { ...state, value_in_cents: response?.value_in_cents / 100 };
        setExpenseStates(state);
      });

      if (typeof router?.query?.saved != 'undefined') {
        setAlert({
          alertType: 'success',
          message: `Budget was successfully saved.`,
        });
      }
    }
  }, [router.isReady, router.query]);

  const saveInstance = async () => {
    let error = false;
    let state = { ...inputErrors };
    ['linked_budget_id', 'category', 'value_in_cents'].forEach(label => {
      if (expenseStates?.[label] == '') {
        state = { ...state, [label]: true };
        error = true;
      }
    });

    setInputErrors(state);

    if (!error) {
      const data = {
        timestamp: expenseStates?.timestamp?.toJSON(),
        linked_budget_id: expenseStates?.linked_budget_id,
        category: expenseStates?.category,
        value_in_cents: parseFloat(expenseStates?.value_in_cents * 100),
        description: expenseStates?.description,
      };

      const urlBase = 'http://127.0.0.1:8000/budget/expenses/';
      const id = router.isReady ? router.query.id : null;
      const url = id ? `${urlBase}${id}/` : urlBase;
      const requestFunction = id ? axios.patch : axios.post;

      requestFunction(url, data)
        .then(response => {
          console.log(JSON.stringify(response?.data));
          router.push(`/expense/edit/?id=${response?.data?.id}&saved=${true}`);
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
    <SaveButton saveInstance={saveInstance} alert={alert} setAlert={setAlert} />
  );
}
