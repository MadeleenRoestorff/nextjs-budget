import { useEffect, useState, useMemo } from 'react';
import SelectInput from '../general/controlledInputs/SelectInput';
import axios from 'axios';

export default function BudgetSelection({
  expenseStates,
  setExpenseStates,
  inputErrors,
}) {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function getResult() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/budget/budget/`
        );
        setResult(response.data);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    }
    getResult();
  }, []);

  //   results have next page

  const options = useMemo(() => result?.results.map(option => option?.id), [
    result,
  ]);

  const categoryValues = () => {
    const budget =
      result?.results?.filter(
        item => item?.id == expenseStates?.linked_budget_id
      )?.[0] || {};
    const categoryOptions = Object.keys(budget?.variable_expense || []);
    const totalRemaining =
      budget?.remaining_by_category_in_cents?.[expenseStates?.category] || null;
    return { categoryOptions, totalRemaining };
  };

  let { categoryOptions } = useMemo(() => categoryValues(), [
    result,
    expenseStates?.linked_budget_id,
  ]);

  useEffect(() => {
    let { totalRemaining } = categoryValues();
    setExpenseStates({ ...expenseStates, remaining: totalRemaining });
  }, [result, expenseStates?.category]);

  return (
    <>
      <SelectInput
        options={options}
        selected={expenseStates?.linked_budget_id}
        handleChange={event => {
          let state = { ...expenseStates, category: '' };
          state = { ...state, linked_budget_id: event.target.value };
          setExpenseStates(state);
        }}
        label="Budget"
        id="budget"
        inputError={inputErrors?.linked_budget_id}
      />

      <SelectInput
        options={categoryOptions}
        selected={expenseStates?.category}
        handleChange={event =>
          setExpenseStates({ ...expenseStates, category: event.target.value })
        }
        label="Category"
        id="category"
        inputError={inputErrors?.category}
      />
    </>
  );
}
