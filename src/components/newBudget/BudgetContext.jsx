import { createContext, useState, useReducer, useEffect } from 'react';

const InputContext = createContext();

const labels = {
  incomeList: 'Income Source',
  fixedEList: 'Fixed Expense',
  variaEList: 'Variable Expense',
};

var initialStates = {
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

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'add':
      const newInputs = JSON.parse(JSON.stringify(initialStates))?.[
        action.list
      ]?.[0];

      let newList = state?.[action.list];
      newList.push(newInputs);
      newState = {
        ...state,
        [action.list]: newList,
      };
      break;
    case 'remove':
      let vDestruct = { ...state }[action.list];
      vDestruct.splice(action.index, 1);
      newState = { ...state, [action.list]: vDestruct };
      break;
    case 'change':
      const localCopy = JSON.parse(JSON.stringify(state?.[action.list]));
      //   const lDestruct = [...state?.[action.list]?.[action.index]];
      //   const pDestruct = lDestruct?.[action.propIndex];
      localCopy?.[action.index]?.[
        action.propIndex
      ]?.value = action.event?.target?.value;
      //   lDestruct?.[action.propIndex] = {
      //     ...pDestruct,
      //     value: action.event?.target?.value,
      //   };

      //   state?.[action.list]?.[action.index] = lDestruct;

      //   newState = { ...state, [action.list]: state?.[action.list] };
      newState = { ...state, [action.list]: localCopy };
      break;

    case 'date':
      newState = { ...state, [action.prop]: action.event };
      break;
    default:
      throw new Error();
  }
  return newState;
};

const InputContextProvider = ({ children }) => {
  //   const [values, setValues] = useState(initialStates);

  const [values, dispatch] = useReducer(reducer, initialStates);

  //   const vDestruct = inputList => {
  //     return { ...values }[inputList];
  //   };

  //   const handleDateChange = prop => event => {
  //       setValues({ ...values, [prop]: event });
  //   };

  //   const handleAddClick = inputList => {
  //     setValues({
  //       ...values,
  //       [inputList]: [...vDestruct(inputList), initialStates?.[inputList]?.[0]],
  //     });
  //   };

  //   const handleRemoveClick = (index, inputList) => {
  //     vDestruct(inputList).splice(index, 1);
  //     setValues({ ...values, [inputList]: vDestruct(inputList) });
  //   };

  //   const handleTextInputChange = (propIndex, inputList, index) => event => {
  //     vDestruct(inputList)[index][propIndex]?.value = event?.target?.value;
  //     setValues({ ...values, [inputList]: vDestruct(inputList) });
  //   };

  const value = {
    values,
    dispatch,
  };
  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};

export { InputContext, InputContextProvider };
