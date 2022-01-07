import { useContext } from 'react';

import TextInput from '../general/controlledInputs/TextInput';
import { InputContext } from './BudgetContext';

import { Stack } from '@mui/material';

import CustomButton from '../general/CustomButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

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
        <CustomButton
          title="Remove"
          Icon={DeleteOutlineIcon}
          handleClick={() =>
            dispatch({ type: 'remove', list: inputList, index: inputIndex })
          }
        />
      )}
      {values?.[inputList].length - 1 === inputIndex && (
        <CustomButton
          title="Add"
          Icon={AddIcon}
          handleClick={() => dispatch({ type: 'add', list: inputList })}
        />
      )}
    </Stack>
  );
}
