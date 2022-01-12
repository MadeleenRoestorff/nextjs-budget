import { createContext, useReducer } from 'react';
import axios from 'axios';
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

const initialStates = {
  alertStatus: {
    alertType: '',
    message: '',
  },
  balance: balance,
  budgetDate: new Date(),
  id: null,
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
  let total = 0;
  const copyStateBal = JSON.parse(JSON.stringify(state?.balance));
  Object.keys(balance)?.map(label => {
    let bal = 0;
    state?.[label]?.map(expense => {
      const eVal = parseInt(expense[1]?.value) || 0;
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
  { type, list, index, propIndex, prop, event, results }
) => {
  console.log('DEBUG reducer type', type);

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
        if (newState?.balance?.total > 0) {
          return {
            ...newState,
            alertStatus: {
              alertType: 'info',
              message: `You can add the balace to savings`,
            },
          };
        } else if (newState?.balance?.total < 0) {
          return {
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

          const urlBase = 'http://127.0.0.1:8000/budget/budget/';
          const url = state?.id ? `${urlBase}${state?.id}/` : urlBase;
          const requestFunction = state?.id ? axios.patch : axios.post;

          const saveInstance = async () => {
            try {
              const response = await requestFunction(url, data);
              console.log(
                'DEBUG saveInstance response',
                JSON.stringify(response?.data)
              );
              const AlertMessage = `Budget was successfully ${
                state?.id ? 'updated' : 'saved'
              }`;
              newState = {
                ...newState,
                alertStatus: {
                  alertType: 'success',
                  message: AlertMessage,
                },
              };
            } catch (err) {
              console.error(err);
            }
          };

          const newStateX = saveInstance().then(() => {
            const AlertMessage = `Budget was successfully ${
              state?.id ? 'updated' : 'saved'
            }`;
            return {
              alertStatus: {
                alertType: 'success',
                message: AlertMessage,
              },
            };
          });

          return {
            ...newState,
            alertStatus: newStateX,
          };
        }
        // Redirect after successful save?
      } else {
        return {
          ...newState,
          alertStatus: {
            alertType: 'error',
            message: 'Missing inputs, please try again',
          },
        };
      }

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

    case 'populate':
      const resultsLocalCopy = JSON.parse(JSON.stringify(results));

      //   console.log('resultsLocalCopy', resultsLocalCopy);
      newState = {
        ...state,
        budgetDate: new Date(resultsLocalCopy?.timestamp),
      };
      newState = {
        ...newState,
        id: resultsLocalCopy?.id,
      };

      Object.keys(labels)?.map(label => {
        const lowerSnakeCaseLabels = labels?.[label]
          .toLowerCase()
          .replace(' ', '_');
        const expenseObjects = resultsLocalCopy?.[lowerSnakeCaseLabels];
        let newStatesArray = [];
        Object.keys(expenseObjects)?.map(expenseKey => {
          let localCopyOfIS = JSON.parse(JSON.stringify(initialStates))?.[
            label
          ]?.[0];
          localCopyOfIS?.[0]?.value = expenseKey;
          if (lowerSnakeCaseLabels == 'variable_expense') {
            localCopyOfIS?.[1]?.value = expenseObjects?.[expenseKey]?.budgeted;
          } else {
            localCopyOfIS?.[1]?.value = expenseObjects?.[expenseKey];
          }
          newStatesArray.push(localCopyOfIS);
        });

        newState = { ...newState, [label]: newStatesArray };
      });

      return balanceHelper(newState);

    default: {
      break;
    }
  }
};

const InputContextProvider = ({ children }) => {
  const [values, dispatch] = useReducer(reducer, initialStates);

  console.log('DEBUG InputContextProvider values', values);
  const value = {
    values,
    dispatch,
  };
  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};

export { InputContext, InputContextProvider };
