import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const keydown = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
const numberProps = {
  type: 'number',
  min: '0',
  onKeyDown: keydown,
  InputProps: {
    startAdornment: <InputAdornment position="start">R</InputAdornment>,
  },
};

export default function TextInput({
  values = [],
  setValues = () => {},
  inputLabel = 'Income Source',
  inputIndex = 0,
  inputList = 'incomeList',
}) {
  const valuesPropName = inputLabel.toLowerCase().replace(' ', '');
  const inputID = inputLabel.toLowerCase().replace(' ', '-');
  const inputprops = valuesPropName == 'amount' ? numberProps : {};

  const handleChangeInput = (prop, index) => event => {
    let vDestruct = { ...values }[inputList];
    vDestruct[index][prop] = event?.target?.value;
    setValues({ ...values, [inputList]: vDestruct });
  };

  return (
    <TextField
      id={inputID}
      label={inputLabel}
      value={values?.[inputIndex]?.inputList}
      onChange={handleChangeInput(valuesPropName, inputIndex)}
      autoComplete="off"
      {...inputprops}
    />
  );
}
