import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export default function BudgetDateInput({
  values = [null],
  setValues = () => {},
}) {
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label="Date"
        inputFormat="MM/dd/yyyy"
        value={values.budgetDate}
        onChange={handleChange('budgetDate')}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
