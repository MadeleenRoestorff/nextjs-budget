import VariableExpenseTable from '../summary/VariableExpenseTable';
import CardLayout from '../general/CardsLayout';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { convertCentToRand } from '../../lib/utils';

const cardsContent = [
  {
    Heading: 'Income',
    fieldsNameList: 'income_in_cents',
    fieldsNameTotal: 'total_income_in_cents',
  },
  {
    Heading: 'Fixed Expenses',
    fieldsNameList: 'fixed_expenses',
    fieldsNameTotal: 'total_fixed_expenses_in_cents',
  },
];

export default function SummaryCards({ budget = null }) {
  const variableexpenses = [
    <>
      <Typography variant="h3">Variable Expenses</Typography>
      <VariableExpenseTable result={budget} />
    </>,
  ];

  const cards = cardsContent.map((content, index) => {
    return (
      <Stack key={`cardscontent-${index}`} alignItems="center">
        <Typography variant="h3">{content?.Heading}</Typography>

        {budget
          ? Object.keys(budget?.[content?.fieldsNameList])?.map(categories => (
              <div key={`${budget?.id}-${categories}`}>
                {`${categories} ${convertCentToRand(
                  budget?.[content?.fieldsNameList]?.[categories]
                )}`}
              </div>
            ))
          : null}
        <CssTextField
          id={`outlined-read-only-input-${index}`}
          label="Total"
          defaultValue={convertCentToRand(budget?.[content?.fieldsNameTotal])}
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
    );
  });
  if (budget) {
    return (
      <div key={budget?.id}>
        <Typography variant="h2">{`You have ${convertCentToRand(
          budget?.total_remaining_in_cents
        )} remaining for this month.`}</Typography>
        <CardLayout cards={cards} />
        <CardLayout
          cards={variableexpenses}
          cardkey="variableexpenses"
          size={12}
        />
      </div>
    );
  } else return null;
}

const CssTextField = styled(TextField)`
  & .MuiOutlinedInput-root.Mui-focused fieldset,
  & .MuiOutlinedInput-root fieldset {
    border-width: 1px;
    border-color: white;
  }

  & label.Mui-focused,
  & label {
    color: white;
  }

  &.MuiTextField-root {
    margin-top: 20px;
  }
`;
