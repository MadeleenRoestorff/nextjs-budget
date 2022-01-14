import { InputContextProvider } from '../../components/newBudget/BudgetContext';
import Typography from '@mui/material/Typography';
import Layout from '../../components/general/Layout';
import BudgetAddInputs from '../../components/newBudget/BudgetAddInputs';

export default function BudgetAdd() {
  return (
    <Layout>
      <Typography variant="h1">Add New Budget</Typography>
      <InputContextProvider>
        <BudgetAddInputs />
      </InputContextProvider>
    </Layout>
  );
}
