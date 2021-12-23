import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputListAnimation from './InputListAnimation';

export default function IncomeInput() {
  return (
    <Box>
      <Typography variant="h2">Income</Typography>
      <InputListAnimation inputList="incomeList" />
    </Box>
  );
}
