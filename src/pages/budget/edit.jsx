import { InputContextProvider } from '../../components/newBudget/BudgetContext';
import Typography from '@mui/material/Typography';
import Layout from '../../components/general/Layout';
import EditBudget from '../../components/newBudget/EditBudget';

export default function BudgetEdit() {
  return (
    <Layout>
      <Typography variant="h1">Edit Budget</Typography>
      <InputContextProvider>
        <EditBudget />
      </InputContextProvider>
    </Layout>
  );
}
