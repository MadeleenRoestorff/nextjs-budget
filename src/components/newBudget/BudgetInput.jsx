import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import InputListAnimation from './InputListAnimation';

export default function Budgetnput({ heading = '', inputList = '' }) {
  return (
    <StyledPaper>
      <Typography variant="h2">{heading}</Typography>
      <InputListAnimation inputList={inputList} />
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(2)}`,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: '40px',
}));
