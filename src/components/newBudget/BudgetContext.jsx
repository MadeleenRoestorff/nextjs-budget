import { createContext, useReducer } from 'react';

const InputContext = createContext();

const labels = {
  incomeList: 'Income Source',
  fixedEList: 'Fixed Expense',
  variaEList: 'Variable Expense',
};

const initialStates = {
  alertStatus: {
    alertType: '',
    message: '',
  },
  balance: 0,
  budgetDate: new Date(),
  inputError: null,
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
  let totalB = 0;
  Object.keys(labels)?.map(label => {
    state?.[label]?.map(expense => {
      const eVal = parseInt(expense[1]?.value) || 0;
      totalB += eVal * (label == 'incomeList' ? 1 : -1);
    });
  });
  return { ...state, balance: totalB };
};

const reducer = (state, { type, list, index, propIndex, prop, event }) => {
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
      newState = { ...newState, inputError: false };
      return balanceHelper(newState);
    }

    //   Type in values
    case 'change': {
      newState = { ...state };
      const localCopy = JSON.parse(JSON.stringify(state?.[list]));

      localCopy?.[index]?.[propIndex]?.value = event?.target?.value;
      localCopy?.[index]?.[propIndex]?.inputErr = false;
      newState = { ...newState, inputError: false };
      newState = { ...newState, [list]: localCopy };

      if (localCopy?.[index]?.[propIndex]?.id == 'amount') {
        newState = balanceHelper(newState);
      }

      return newState;
    }

    //   Select date
    case 'date':
      return { ...state, [prop]: event };

    //   Save button
    case 'save':
      newState = { ...state };
      let budgetObj = {};
      Object.keys(labels)?.map(label => {
        const localCopyK = JSON.parse(JSON.stringify(state?.[label]));
        let budgetArr = [];
        localCopyK.map((expense, eIndex) => {
          let pairs = [];
          expense.map((item, itemindex) => {
            let newValue = item.value;
            if (newValue == '') {
              localCopyK?.[eIndex]?.[itemindex]?.inputErr = true;
              newState = { ...newState, [label]: localCopyK };
              newState = { ...newState, inputError: true };
            } else {
              if (item.id == 'amount') {
                newValue = parseInt(item.value);
                if (label === 'variaEList') {
                  newValue = {
                    budgeted: parseInt(item.value) || '',
                  };
                }
              }
            }
            pairs.push(newValue || '');
          });
          budgetArr.push(pairs);
        });
        budgetObj[label] = budgetArr;
      });

      if (!newState?.inputError) {
        if (newState?.balance > 0) {
          newState = {
            ...newState,
            alertStatus: {
              alertType: 'info',
              message: `You can save the balace`,
            },
          };
        } else if (newState?.balance < 0) {
          newState = {
            ...newState,
            alertStatus: {
              alertType: 'warning',
              message: 'Balance is negative - adjust the budget.',
            },
          };
        } else {
          const data = {
            timestamp: newState?.budgetDate.toJSON(),
            income_source: Object.fromEntries(budgetObj?.incomeList),
            fixed_expense: Object.fromEntries(budgetObj?.fixedEList),
            variable_expense: Object.fromEntries(budgetObj?.variaEList),
          };

          // axios
          //   .post('http://127.0.0.1:8000/budget/budget/', data)
          //   .then(function(response) {
          //     console.log(JSON.stringify(response.data));
          //   })
          //   .catch(function(error) {
          //     console.log(error);
          //     newState = { ...newState, alertStatus: 'There was an error' };
          //   });

          newState = {
            ...newState,
            alertStatus: {
              alertType: 'success',
              message: 'Budget was saved successfully',
            },
          };
        }
        // Redirect after successful save?
      } else {
        newState = {
          ...newState,
          alertStatus: {
            alertType: 'error',
            message: 'Missing inputs, please try again',
          },
        };
      }

      return newState;

    //   Save the balance
    case 'balance':
      const localCopyFixed = JSON.parse(JSON.stringify(state?.fixedEList));
      let isSavingsPresent = false;
      localCopyFixed?.map((expense, expenseIndex) => {
        const fixedExpenseName = expense[0]?.value;
        if (
          fixedExpenseName.search(/saving/i) >= 0 ||
          fixedExpenseName.search(/save/i) >= 0 ||
          fixedExpenseName.search(/spaar/i) >= 0
        ) {
          const oldValue = parseInt(expense[1]?.value);

          localCopyFixed?.[expenseIndex]?.[1]?.value =
            oldValue + state?.balance;

          isSavingsPresent = true;
        }
      });

      if (!isSavingsPresent) {
        let newFixedInput = JSON.parse(JSON.stringify(initialStates))
          ?.fixedEList?.[0];
        newFixedInput?.[0]?.value = 'Savings';
        newFixedInput?.[1]?.value = state?.balance;
        localCopyFixed.push(newFixedInput);
      }

      newState = { ...state, fixedEList: localCopyFixed };
      return balanceHelper(newState);

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
