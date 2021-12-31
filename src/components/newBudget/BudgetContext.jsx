import { createContext, useReducer } from 'react';

const InputContext = createContext();

const labels = {
  incomeList: 'Income Source',
  fixedEList: 'Fixed Expense',
  variaEList: 'Variable Expense',
};

const initialStates = {
  balance: 0,
  budgetDate: new Date(),
  incomeList: [],
  fixedEList: [],
  variaEList: [],
};

Object.keys(labels).map(list => {
  initialStates?.[list].push([
    {
      id: labels?.[list].toLowerCase().replace(' ', '_'),
      label: labels?.[list],
      type: 'text',
      value: '',
    },
    {
      id: 'amount',
      label: 'Amount',
      type: 'number',
      value: '',
    },
  ]);
});

const reducer = (state, { type, list, index, propIndex, prop, event }) => {
  switch (type) {
    case 'add': {
      const newInputs = JSON.parse(JSON.stringify(initialStates))?.[list]?.[0];
      let newList = state?.[list];
      return { ...state, [list]: [...newList, newInputs] };
    }
    case 'remove':
      let vDestruct = { ...state }[list];
      vDestruct.splice(index, 1);
      return { ...state, [list]: vDestruct };

    case 'change':
      let newState;
      const localCopy = JSON.parse(JSON.stringify(state?.[list]));

      if (localCopy?.[index]?.[propIndex]?.id == 'amount') {
        const prevValue = parseInt(localCopy?.[index]?.[propIndex]?.value) || 0;
        const curnValue = parseInt(event?.target?.value) || 0;
        const totalValue = curnValue - prevValue;
        if (list == 'incomeList') {
          newState = {
            ...state,
            balance: state.balance + totalValue,
          };
        } else {
          newState = {
            ...state,
            balance: state.balance - totalValue,
          };
        }
      }

      localCopy?.[index]?.[propIndex]?.value = event?.target?.value;
      newState = newState || state;
      return { ...newState, [list]: localCopy };

    case 'date':
      return { ...state, [prop]: event };

    default:
      break;
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
