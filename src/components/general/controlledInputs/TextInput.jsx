import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const keydown = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
const Iprop = () => <InputAdornment position="start">R</InputAdornment>;
const numberProps = {
  type: 'number',
  min: '0',
  onKeyDown: keydown,
  InputProps: { startAdornment: <Iprop /> },
};

export default function TextInput({
  values = '',
  handleChangeInput = () => {},
  label = 'Amout',
  id = 'amount',
  type = 'number',
}) {
  const otherInputprops = type == 'number' ? numberProps : {};

  return (
    <TextField
      id={id}
      label={label}
      value={values}
      onChange={handleChangeInput()}
      autoComplete="off"
      {...otherInputprops}
    />
  );
}
