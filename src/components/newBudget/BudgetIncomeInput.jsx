import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import TextInput from '../general/controlledInputs/TextInput';

import { motion, AnimatePresence } from 'framer-motion';

export default function BudgetIncomeInput({
  values = [],
  setValues = () => {},
}) {
  const vDestruct = () => {
    return { ...values }['incomeList'];
  };

  const handleChangeInput = (prop, index) => event => {
    vDestruct()[index][prop] = event?.target?.value;
    setValues({ ...values, ['incomeList']: vDestruct() });
  };

  const handleAddClick = () => {
    setValues({
      ...values,
      ['incomeList']: [...vDestruct(), { amount: '', incomesource: '' }],
    });
  };

  const handleRemoveClick = index => {
    vDestruct().splice(index, 1);
    setValues({ ...values, ['incomeList']: vDestruct() });
  };

  return (
    <Box>
      <Typography variant="h2">Income</Typography>
      <AnimatePresence initial={false}>
        {values.incomeList.map((income, incomeIndex) => {
          return (
            <motion.div
              key={`incomeList-${incomeIndex}`}
              initial={{ x: -100, height: 0, marginBottom: 0 }}
              animate={{
                x: 0,
                height: 'auto',
                marginBottom: '16px',
              }}
              exit={{
                opacity: 0,
                x: -100,
                scale: 0,
                height: 0,
                marginBottom: 0,
              }}
            >
              <Stack direction="row" spacing={2}>
                {/* <TextField
                  id="income-source"
                  label="Income Source"
                  value={income.incomesource}
                  onChange={handleChangeInput('incomesource', incomeIndex)}
                  autoComplete="off"
                /> */}

                <TextInput
                  values={values}
                  setValues={setValues}
                  inputLabel="Income Source"
                  inputIndex={incomeIndex}
                  inputList="incomeList"
                />

                <TextInput
                  values={values}
                  setValues={setValues}
                  inputLabel="Amount"
                  inputIndex={incomeIndex}
                  inputList="incomeList"
                />

                {/* <TextField
                  id="income-amount"
                  value={income.amount}
                  onChange={handleChangeInput('amount', incomeIndex)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R</InputAdornment>
                    ),
                  }}
                  label="Amount"
                  type="number"
                  min="0"
                  onKeyDown={e =>
                    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
                  }
                /> */}
                {values.incomeList.length !== 1 && (
                  <Button
                    variant="outlined"
                    onClick={() => handleRemoveClick(incomeIndex)}
                  >
                    Remove
                  </Button>
                )}
                {values.incomeList.length - 1 === incomeIndex && (
                  <Button variant="outlined" onClick={handleAddClick}>
                    Add
                  </Button>
                )}
              </Stack>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Box>
  );
}
