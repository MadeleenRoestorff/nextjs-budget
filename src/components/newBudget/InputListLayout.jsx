import { useContext } from 'react';
import { Button, Stack } from '@mui/material';
import TextInput from '../general/controlledInputs/TextInput';
import { InputContext } from './BudgetContext';

export default function InputListLayout({ inputList, inputIndex }) {
  const { values, setValues } = useContext(InputContext);
  const inputLabelList = Object.keys({ ...values }[inputList][0]);

  const handleAddClick = () => {
    const vDestruct = { ...values }[inputList];
    const entries = new Map([
      [inputLabelList[0], ''],
      [inputLabelList[1], ''],
    ]);
    setValues({
      ...values,
      [inputList]: [...vDestruct, Object.fromEntries(entries)],
    });
  };

  const handleRemoveClick = index => {
    const vDestruct = { ...values }[inputList];
    vDestruct.splice(index, 1);
    setValues({ ...values, [inputList]: vDestruct });
  };

  return (
    <Stack direction="row" spacing={2}>
      {inputLabelList?.map(label => {
        return (
          <TextInput
            key={label}
            values={values}
            setValues={setValues}
            propName={label}
            inputIndex={inputIndex}
            inputList={inputList}
          />
        );
      })}
      {values?.[inputList].length !== 1 && (
        <Button
          variant="outlined"
          onClick={() => handleRemoveClick(inputIndex)}
        >
          Remove
        </Button>
      )}
      {values?.[inputList].length - 1 === inputIndex && (
        <Button variant="outlined" onClick={handleAddClick}>
          Add
        </Button>
      )}
    </Stack>
  );
}
