import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { snakeCaseToSentenceCase } from '../../../lib/utils';

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
  propName = 'amount',
  inputIndex = 0,
  inputList = 'incomeList',
}) {
  const otherInputprops = propName == 'amount' ? numberProps : {};

  const handleChangeInput = (prop, index) => event => {
    const vDestruct = { ...values }[inputList];
    vDestruct[index][prop] = event?.target?.value;
    setValues({ ...values, [inputList]: vDestruct });
  };

  return (
    <TextField
      id={propName}
      label={snakeCaseToSentenceCase(propName)}
      value={values?.[inputIndex]?.inputList}
      onChange={handleChangeInput(propName, inputIndex)}
      autoComplete="off"
      {...otherInputprops}
    />
  );
}
