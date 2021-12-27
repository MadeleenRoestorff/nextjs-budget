import { useContext } from 'react';
import { Button, Stack } from '@mui/material';
import TextInput from '../general/controlledInputs/TextInput';
import { InputContext } from './BudgetContext';

export default function InputListLayout({ inputList, inputIndex }) {
  const {
    values,
    handleTextInputChange,
    handleAddClick,
    handleRemoveClick,
  } = useContext(InputContext);

  return (
    <Stack direction="row" spacing={2}>
      {Object.keys(values[inputList]?.[0])?.map(label => {
        return (
          <TextInput
            key={values?.[inputList]?.[inputIndex]?.[label]?.id}
            values={values?.[inputList]?.[inputIndex]?.[label]?.value}
            type={values?.[inputList]?.[inputIndex]?.[label]?.type}
            label={values?.[inputList]?.[inputIndex]?.[label]?.label}
            handleChangeInput={() =>
              handleTextInputChange(label, inputList, inputIndex)
            }
          />
        );
      })}
      {values?.[inputList].length !== 1 && (
        <Button
          variant="outlined"
          onClick={() => handleRemoveClick(inputIndex, inputList)}
        >
          Remove
        </Button>
      )}
      {values?.[inputList].length - 1 === inputIndex && (
        <Button variant="outlined" onClick={() => handleAddClick(inputList)}>
          Add
        </Button>
      )}
    </Stack>
  );
}
