import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { InputContext } from './BudgetContext';
import BudgetAddInputs from './BudgetAddInputs';

export default function EditBudget() {
  const router = useRouter();
  const { dispatch } = useContext(InputContext);

  useEffect(() => {
    if (!router.isReady) return;
    const id = router?.query?.id || 1;
    async function getResult() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/budget/budget/${id}/`
        );
        return response?.data;
      } catch (err) {
        console.error(err);
      }
    }

    getResult().then(response => {
      dispatch({ type: 'populate', results: response });
    });
  }, [router.isReady]);

  return <BudgetAddInputs />;
}
