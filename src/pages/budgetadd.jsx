import Layout from '../components/general/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Button from '@mui/material/Button';

// import { motion, AnimatePresence } from 'framer-motion';

const spring = {
  type: 'spring',
  damping: 50,
  stiffness: 100,
};

var data = JSON.stringify({
  timestamp: '2021-12-19T12:56:53Z',
  income_in_cents: {
    Martin: 50000,
    Madeleen: 10000,
  },
  fixed_expenses: {
    Insurance: 3000,
    Rent: 7000,
    Savings: 10000,
  },
  variable_expenses: {
    Food: {
      budgeted: 10000,
    },
    Petrol: {
      budgeted: 2000,
    },
    Entertainment: {
      budgeted: 8000,
    },
    Birthday: {
      budgeted: 800,
    },
  },
});

export default function SummaryPage() {
  console.log('DEBUG SummaryPage');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [values, setValues] = useState({
    budgetDate: new Date(),
    incomelist: [{ amount: '', incomeName: '' }],
  });

  useEffect(() => {
    setResult(null);
    setError(null);
    async function getResult() {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/budget/budget/'
        );
        setResult(response?.data?.results);
      } catch (err) {
        setResult(null);
        setError(err);

        console.error(err);
      }
    }
    getResult();
  }, []);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event });
  };

  const handleChangeNumber = (prop, index) => event => {
    console.log(
      'DEBUG handleChangeNumber event?.target?.value',
      event?.target?.value
    );
    let formatNumb = event?.target?.value?.replace?.(/\D/gm, '') || '';
    console.log('DEBUG handleChangeNumber formatNumb', formatNumb);
    let incomelistvalue = { ...values }['incomelist'];
    incomelistvalue[index][prop] = formatNumb;
    setValues({ ...values, ['incomelist']: incomelistvalue });
  };

  const handleChangeText = (prop, index) => event => {
    let incomelistvalue = { ...values }['incomelist'];
    incomelistvalue[index][prop] = event?.target?.value;
    setValues({ ...values, ['incomelist']: incomelistvalue });
  };

  const handleAddClick = () => {
    let incomelistvalue = { ...values }['incomelist'];
    setValues({
      ...values,
      ['incomelist']: [...incomelistvalue, { amount: '', incomeName: '' }],
    });
  };

  const handleRemoveClick = index => {
    let incomelistvalue = { ...values }['incomelist'];
    incomelistvalue.splice(index, 1);
    setValues({ ...values, ['incomelist']: incomelistvalue });
  };

  return (
    <Layout isHomePage>
      <h1>Add a New Budget</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date"
          inputFormat="MM/dd/yyyy"
          value={values.budgetDate}
          onChange={handleChange('budgetDate')}
          renderInput={params => <CssTextField {...params} />}
        />
      </LocalizationProvider>

      <div>
        <h2>Income</h2>
        {/* <AnimatePresence> */}
        {values.incomelist.map((income, incomeIndex) => {
          return (
            <div key={`incomelist-${incomeIndex}`}>
              <IncomeTextFieldStyling
                id="outlined-basic"
                label="Income Source"
                variant="outlined"
                value={income.incomeName}
                onChange={handleChangeText('incomeName', incomeIndex)}
              />
              <FormControl>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <IncomeAmountStyling
                  id="outlined-adornment-amount"
                  value={income.amount}
                  onChange={handleChangeNumber('amount', incomeIndex)}
                  startAdornment={
                    <InputAdornment position="start">R</InputAdornment>
                  }
                  label="Amount"
                  type="number"
                  min="0"
                  onKeyDown={e =>
                    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
                  }
                />
              </FormControl>

              {values.incomelist.length !== 1 && (
                <Button
                  variant="contained"
                  onClick={() => handleRemoveClick(incomeIndex)}
                >
                  Remove
                </Button>
              )}
              {values.incomelist.length - 1 === incomeIndex && (
                <Button variant="contained" onClick={handleAddClick}>
                  Add
                </Button>
              )}
              {/* </motion.div> */}
            </div>
          );
        })}
        {/* </AnimatePresence> */}
      </div>
    </Layout>
  );
}

const CssTextField = styled(TextField)`
  & legend {
    /* width: 39px; */
  }
`;
const IncomeTextFieldStyling = styled(TextField)`
  & legend {
    /* width: 102px; */
  }
`;
const IncomeAmountStyling = styled(OutlinedInput)`
  & legend {
    /* width: 57px; */
  }
`;
