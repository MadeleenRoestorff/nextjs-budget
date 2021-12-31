import { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { InputContext } from './BudgetContext';
import axios from 'axios';

export default function SaveBudget() {
  const { values } = useContext(InputContext);
  const [err, setError] = useState(null);

  useEffect(() => {
    const jsondate = values?.budgetDate.toJSON();
    const valueKeys = Object.keys(values).filter(valueKey => {
      if (valueKey != 'budgetDate' && valueKey != 'balance') {
        return valueKey;
      }
    });

    let budgetObj = {};
    valueKeys?.map(valueKey => {
      let budgetArr = [];

      values?.[valueKey].map(expense => {
        let pairs = [];
        expense.map(item => {
          let newValue = item.value;
          if (item.id == 'amount') {
            newValue = parseInt(item.value);
            if (valueKey === 'variaEList') {
              newValue = {
                budgeted: parseInt(item.value) ? parseInt(item.value) : '',
              };
            }
          }
          pairs.push(newValue ? newValue : '');
        });
        budgetArr.push(pairs);
      });

      budgetObj[valueKey] = budgetArr;
    });

    const data = {
      timestamp: jsondate,
      income_source: Object.fromEntries(budgetObj?.incomeList),
      fixed_expense: Object.fromEntries(budgetObj?.fixedEList),
      variable_expense: Object.fromEntries(budgetObj?.variaEList),
    };

    // console.log('data ', data);

    if (err) {
      axios
        .post('http://127.0.0.1:8000/budget/budget/', data)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
          console.log(error);
        });
      setError(null);
    }

    setError(null);
  }, [err]);

  return (
    <Button key="remove" variant="outlined" onClick={() => setError(true)}>
      SAVE
    </Button>
  );
}
