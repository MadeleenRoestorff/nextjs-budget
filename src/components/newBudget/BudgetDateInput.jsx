import { useContext } from 'react';
import { InputContext } from './BudgetContext';

import DateInput from '../general/controlledInputs/DateInput';

export default function BudgetDateInput() {
  const { values, handleDateChange } = useContext(InputContext);
  return (
    <DateInput
      values={values?.budgetDate}
      handleChange={() => handleDateChange('budgetDate')}
    />
  );
}
