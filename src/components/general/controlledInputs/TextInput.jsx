import { TextField, InputAdornment, FormControl } from '@mui/material';
import AnimatedHelperText from '../../general/controlledInputs/AnimatedHelperText';

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
  inputError = false,
}) {
  const otherInputprops = type == 'number' ? numberProps : {};

  return (
    <FormControl>
      <TextField
        id={id}
        label={label}
        value={values}
        onChange={event => handleChangeInput(event)}
        autoComplete="off"
        error={inputError}
        {...otherInputprops}
      />
      <AnimatedHelperText error={inputError} />
    </FormControl>
  );
}
