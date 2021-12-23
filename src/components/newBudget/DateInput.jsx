import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export default function BudgetDateInput({
  values = [],
  setValues = () => {},
  propName = 'budgetDate',
}) {
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label="Date"
        inputFormat="MM/dd/yyyy"
        value={values?.[propName]}
        onChange={handleChange(propName)}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
