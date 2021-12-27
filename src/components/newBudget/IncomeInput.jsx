import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputListAnimation from './InputListAnimation';

export default function IncomeInput({ heading = '', inputList = '' }) {
  return (
    <Box>
      <Typography variant="h2">{heading}</Typography>
      <InputListAnimation inputList={inputList} />
    </Box>
  );
}
