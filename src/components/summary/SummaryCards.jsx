import VariableExpenseTable from '../summary/VariableExpenseTable';
import CardLayout from '../general/CardsLayout';

import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';

import { convertCentToRand } from '../../lib/utils';

import { useRouter } from 'next/router';

const cardsContent = [
  {
    Heading: 'Income',
    fieldsNameList: 'income_source',
    fieldsNameTotal: 'total_income_source',
  },
  {
    Heading: 'Fixed Expenses',
    fieldsNameList: 'fixed_expense',
    fieldsNameTotal: 'total_fixed_expense_in_cents',
  },
];

export default function SummaryCards({ budget = null }) {
  const router = useRouter();
  const handleNewClick = id => {
    router.push(`/budget/edit/?id=${id}`);
  };
  const variableexpenses = [
    <>
      <Typography variant="h3">Variable Expenses</Typography>
      <VariableExpenseTable result={budget} />
      <EditIcon
        fontSize="large"
        className="icon"
        onClick={() => handleNewClick(budget?.id)}
      />
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
        <StyledTextField
          id={`outlined-read-only-input-${index}`}
          label="Total"
          defaultValue={convertCentToRand(budget?.[content?.fieldsNameTotal])}
          InputProps={{
            readOnly: true,
          }}
        />
        <EditIcon
          fontSize="large"
          className="icon"
          onClick={() => handleNewClick(budget?.id)}
        />
      </Stack>
    );
  });
  if (budget) {
    return (
      <Container maxWidth="md" key={budget?.id}>
        <Typography variant="h2">{`You have ${convertCentToRand(
          budget?.total_remaining_in_cents
        )} remaining for this month.`}</Typography>
        <CardLayout cards={cards} />
        <CardLayout
          cards={variableexpenses}
          cardkey="variableexpenses"
          size={12}
        />
      </Container>
    );
  } else return null;
}

const StyledTextField = styled(TextField)`
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
