import { useContext } from 'react';
import { Button, Stack } from '@mui/material';
import TextInput from '../general/controlledInputs/TextInput';
import { InputContext } from './BudgetContext';

export default function InputListLayout({ inputList, inputIndex }) {
  const { values, dispatch } = useContext(InputContext);

  return (
    <Stack direction="row" spacing={2}>
      {Object.keys(values?.[inputList]?.[0])?.map(label => {
        return (
          <TextInput
            key={`${values?.[inputList]?.[inputIndex]?.[label]?.id}-${inputList}-${inputIndex}-${label}`}
            values={values?.[inputList]?.[inputIndex]?.[label]?.value}
            type={values?.[inputList]?.[inputIndex]?.[label]?.type}
            label={values?.[inputList]?.[inputIndex]?.[label]?.label}
            inputError={values?.[inputList]?.[inputIndex]?.[label]?.inputErr}
            handleChangeInput={event =>
              dispatch({
                type: 'change',
                list: inputList,
                index: inputIndex,
                propIndex: label,
                event: event,
              })
            }
          />
        );
      })}

      {values?.[inputList].length !== 1 && (
        <Button
          key="remove"
          variant="outlined"
          onClick={() =>
            dispatch({ type: 'remove', list: inputList, index: inputIndex })
          }
        >
          Remove
        </Button>
      )}

      {values?.[inputList].length - 1 === inputIndex && (
        <Button
          key="add"
          variant="outlined"
          onClick={() => dispatch({ type: 'add', list: inputList })}
        >
          Add
        </Button>
      )}
    </Stack>
  );
}
