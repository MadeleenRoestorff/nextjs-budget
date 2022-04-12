import { createContext, useReducer } from 'react';
const InputContext = createContext();

const labels = {
  incomeList: 'Income Source',
  fixedEList: 'Fixed Expense',
  variaEList: 'Variable Expense',
};

const balance = {
  total: 0,
  incomeList: 0,
  fixedEList: 0,
  variaEList: 0,
};

const date = new Date();
const endDate =
  date.getMonth() == 11
    ? new Date(date.getFullYear() + 1, 0, date.getDate())
    : new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());

const initialStates = {
  balance: balance,
  budgetDateStart: date,
  budgetDateEnd: endDate,
  incomeList: [],
  fixedEList: [],
  variaEList: [],
};

Object.keys(labels).forEach(list => {
  initialStates?.[list].push([
    {
      id: labels?.[list].toLowerCase().replace(' ', '_'),
      label: labels?.[list],
      type: 'text',
      value: '',
      inputErr: false,
    },
    {
      id: 'amount',
      label: 'Amount',
      type: 'number',
      value: '',
      inputErr: false,
    },
  ]);
});

const balanceHelper = state => {
  let total = 0;
  const copyStateBal = JSON.parse(JSON.stringify(state?.balance));
  Object.keys(balance)?.forEach(label => {
    let bal = 0;
    state?.[label]?.forEach(expense => {
      const eVal = parseFloat(expense[1]?.value) || 0;
      bal += eVal;
      total += eVal * (label == 'incomeList' ? 1 : -1);
    });

    if (label != 'total') {
      copyStateBal?.[label] = bal;
    }
  });
  copyStateBal?.total = total;
  return { ...state, balance: copyStateBal };
};

const reducer = (
  state,
  { type, list, index, propIndex, prop, event, results, listValue }
) => {
  let newState;

  switch (type) {
    //   Add button
    case 'add': {
      const newInputs = JSON.parse(JSON.stringify(initialStates))?.[list]?.[0];
      let newList = state?.[list];
      newState = { ...state, [list]: [...newList, newInputs] };
      return balanceHelper(newState);
    }
    //   Remove button
    case 'remove': {
      let vDestruct = { ...state }[list];
      vDestruct.splice(index, 1);
      newState = { ...state, [list]: vDestruct };
      return balanceHelper(newState);
    }

    //   Type in values
    case 'change': {
      newState = { ...state };
      const localCopy = JSON.parse(JSON.stringify(state?.[list]));
      localCopy?.[index]?.[propIndex]?.value = event?.target?.value;
      localCopy?.[index]?.[propIndex]?.inputErr = false;
      newState = { ...newState, [list]: localCopy };

      if (localCopy?.[index]?.[propIndex]?.id == 'amount') {
        newState = balanceHelper(newState);
      }
      return newState;
    }

    //   Select date
    case 'date': {
      return { ...state, [prop]: event };
    }

    //   Save the balance
    case 'balance': {
      const localCopyFixed = JSON.parse(JSON.stringify(state?.fixedEList));
      let isSavingsPresent = false;
      localCopyFixed?.forEach((expense, expenseIndex) => {
        const fixedExpenseName = expense[0]?.value;
        if (
          fixedExpenseName.search(/saving/i) >= 0 ||
          fixedExpenseName.search(/save/i) >= 0 ||
          fixedExpenseName.search(/spaar/i) >= 0
        ) {
          const oldValue = parseFloat(expense[1]?.value);
          localCopyFixed?.[expenseIndex]?.[1]?.value =
            oldValue + state?.balance?.total;
          isSavingsPresent = true;
        }
      });

      if (!isSavingsPresent) {
        let newFixedInput = JSON.parse(JSON.stringify(initialStates))
          ?.fixedEList?.[0];
        newFixedInput?.[0]?.value = 'Savings';
        newFixedInput?.[1]?.value = state?.balance?.total;
        localCopyFixed.push(newFixedInput);
      }

      newState = { ...state, fixedEList: localCopyFixed };
      return balanceHelper(newState);
    }

    // populate inputs from api data
    case 'populate': {
      newState = {
        ...state,
        budgetDateStart: new Date(results?.timestamp),
      };
      newState = {
        ...newState,
        budgetDateEnd: new Date(results?.timestamp_end),
      };
      Object.keys(labels)?.forEach(label => {
        const lowSnakeLabels = labels?.[label].toLowerCase().replace(' ', '_');
        const expenseObjs = results?.[lowSnakeLabels];
        const newStatesArray = Object.keys(expenseObjs)?.map(expenseKey => {
          let localCopyOfIS = JSON.parse(JSON.stringify(initialStates))?.[
            label
          ]?.[0];
          localCopyOfIS?.[0]?.value = expenseKey;
          localCopyOfIS?.[1]?.value =
            (lowSnakeLabels == 'variable_expense'
              ? expenseObjs?.[expenseKey]?.budgeted
              : expenseObjs?.[expenseKey]) / 100;
          return localCopyOfIS;
        });
        newState = { ...newState, [label]: newStatesArray };
      });
      return balanceHelper(newState);
    }

    case 'saveError': {
      return { ...state, [list]: listValue };
    }

    default: {
      break;
    }
  }
};

const InputContextProvider = ({ children }) => {
  const [values, dispatch] = useReducer(reducer, initialStates);
  const value = {
    values,
    dispatch,
  };
  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};

export { InputContext, InputContextProvider };
