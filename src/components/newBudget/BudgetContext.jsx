import { createContext, useState } from 'react';

const InputContext = createContext();

const InputContextProvider = ({ children }) => {
  //   const initialStates = {
  //     budgetDate: new Date(),
  //     incomeList: [{ income_source: '', amount: '' }],
  //     fixedEList: [{ fixed_expense: '', amount: '' }],
  //     variaEList: [{ variable_expense: '', amount: '' }],
  //   };

  const initialStates = {
    budgetDate: new Date(),
    incomeList: [],
    fixedEList: [],
    variaEList: [],
  };

  const labels = {
    incomeList: 'Income Source',
    fixedEList: 'Fixed Expense',
    variaEList: 'Variable Expense',
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

  const [values, setValues] = useState(initialStates);

  const vDestruct = inputList => {
    return { ...values }[inputList];
  };

  const handleDateChange = prop => event => {
    setValues({ ...values, [prop]: event });
  };

  const handleAddClick = inputList => {
    setValues({
      ...values,
      [inputList]: [...vDestruct(inputList), initialStates?.[inputList]?.[0]],
    });
  };

  const handleRemoveClick = (index, inputList) => {
    vDestruct(inputList).splice(index, 1);
    setValues({ ...values, [inputList]: vDestruct(inputList) });
  };

  const handleTextInputChange = (propIndex, inputList, index) => event => {
    vDestruct(inputList)[index][propIndex]?.value = event?.target?.value;
    setValues({ ...values, [inputList]: vDestruct(inputList) });
  };

  const value = {
    values,
    handleDateChange,
    handleTextInputChange,
    handleAddClick,
    handleRemoveClick,
  };
  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};

export { InputContext, InputContextProvider };
