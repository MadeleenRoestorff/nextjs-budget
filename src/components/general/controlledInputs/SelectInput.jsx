import { Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import AnimatedHelperText from './AnimatedHelperText';

export default function SelectInput({
  options = [],
  selected = '',
  handleChange = () => {},
  label = 'Budget',
  id = 'budget',
  inputError = false,
}) {
  return (
    <FormControl
      disabled={options.length > 0 ? false : true}
      error={inputError}
    >
      <InputLabel id={id}>Budget</InputLabel>
      <Select
        labelId={id}
        id={id}
        value={selected}
        label={label}
        onChange={handleChange}
      >
        {options?.map((optionItem, optionIndex) => (
          <MenuItem key={`${optionIndex}-id`} value={optionItem?.[0]}>
            {optionItem?.[1]}
          </MenuItem>
        ))}
      </Select>
      <AnimatedHelperText error={inputError} />
    </FormControl>
  );
}
