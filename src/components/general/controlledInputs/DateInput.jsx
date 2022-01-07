import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export default function DateInput({ values = '', handleChange = () => {} }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label="Start Date"
        inputFormat="MM/dd/yyyy"
        value={values}
        onChange={event => handleChange(event)}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
