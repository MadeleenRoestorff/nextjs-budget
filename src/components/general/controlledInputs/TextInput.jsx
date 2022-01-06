import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
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
    <div>
      <TextField
        id={id}
        label={label}
        value={values}
        onChange={event => handleChangeInput(event)}
        autoComplete="off"
        error={inputError}
        //   helperText={inputError ? 'Incorrect entry.' : ' '}
        {...otherInputprops}
      />
      <AnimatedHelperText error={inputError} />
    </div>
  );
}
