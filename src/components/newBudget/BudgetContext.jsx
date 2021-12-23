import { createContext, useState } from 'react';

const InputContext = createContext();

const InputContextProvider = ({ children }) => {
  const [values, setValues] = useState({
    budgetDate: new Date(),
    incomeList: [{ income_source: '', amount: '' }],
  });
  const value = { values, setValues };
  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};

export { InputContext, InputContextProvider };
