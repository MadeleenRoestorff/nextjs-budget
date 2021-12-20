import VariableExpenseTable from '../summary/VariableExpenseTable';
import CardLayout from '../general/CardsLayout';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

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
      <h3>Variable Expenses</h3>
      <VariableExpenseTable result={budget} />
    </>,
  ];

  const cards = cardsContent.map((content, index) => {
    return (
      <CardsContentStyling key={`cardscontent-${index}`}>
        <h3>{content?.Heading}</h3>
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
      </CardsContentStyling>
    );
  });
  if (budget) {
    return (
      <div key={budget?.id}>
        <h2>{`You have ${convertCentToRand(
          budget?.total_remaining_in_cents
        )} remaining for this month.`}</h2>
        <CardLayout cards={cards} />
        <CardLayout cards={variableexpenses} cardkey="variableexpenses" />
      </div>
    );
  } else return null;
}

const CssTextField = styled(TextField)`
  & legend {
    width: 40px;
  }
  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border-width: 1px;
  }
`;
const CardsContentStyling = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div:last-child {
    margin-top: 20px;
  }
`;
