import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Layout from '../../components/general/Layout';
import TypeInput from '../../components/general/controlledInputs/TypeInput';
import DateInput from '../../components/general/controlledInputs/DateInput';
import BudgetSelection from '../../components/expense/BudgetSelection';
import SaveExpense from '../../components/expense/SaveExpense';
import { formatFloatPrice } from '../../lib/utils';

const initialExpenseStates = {
  timestamp: new Date(),
  linked_budget_id: '',
  category: '',
  value_in_cents: '',
  description: '',
  remaining: null,
};

export default function ExpenseEdit() {
  const [expenseStates, setExpenseStates] = useState(initialExpenseStates);
  const [inputErrors, setInputErrors] = useState({
    linked_budget_id: false,
    category: false,
    value_in_cents: false,
  });

  return (
    <Layout>
      <Typography variant="h1">Edit Expense</Typography>
      <DateInput
        values={expenseStates?.timestamp}
        label="Date"
        handleChange={event =>
          setExpenseStates({ ...expenseStates, timestamp: event })
        }
      />
      <TypeInput
        values={expenseStates?.value_in_cents}
        type="number"
        label="Expense Amount"
        inputError={inputErrors?.value_in_cents}
        handleChangeInput={event =>
          setExpenseStates({
            ...expenseStates,
            value_in_cents: event?.target?.value,
          })
        }
      />
      <TypeInput
        values={expenseStates?.description}
        type="text"
        label="Expense Description"
        handleChangeInput={event =>
          setExpenseStates({
            ...expenseStates,
            description: event?.target?.value,
          })
        }
      />
      <BudgetSelection
        expenseStates={expenseStates}
        setExpenseStates={setExpenseStates}
        inputErrors={inputErrors}
      />

      <div>
        {expenseStates?.remaining
          ? formatFloatPrice(
              expenseStates?.remaining / 100 - expenseStates?.value_in_cents
            )
          : 'R--'}
      </div>

      <SaveExpense
        expenseStates={expenseStates}
        inputErrors={inputErrors}
        setInputErrors={setInputErrors}
        setExpenseStates={setExpenseStates}
      />
    </Layout>
  );
}
