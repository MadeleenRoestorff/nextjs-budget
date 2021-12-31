import { useContext } from 'react';
import { InputContext } from './BudgetContext';

import DateInput from '../general/controlledInputs/DateInput';

export default function BudgetDateInput() {
  const { values, dispatch } = useContext(InputContext);
  //   console.log('values', values);

  const handleDateChange = event =>
    dispatch({ type: 'date', prop: 'budgetDate', event: event });
  return (
    <DateInput values={values?.budgetDate} handleChange={handleDateChange} />
  );
}
