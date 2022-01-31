import { InputContextProvider } from '../../components/budget/BudgetContext';
import Typography from '@mui/material/Typography';
import Layout from '../../components/general/Layout';
import BudgetAddInputs from '../../components/budget/BudgetAddInputs';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BudgetEdit() {
  const router = useRouter();
  const [heading, setHeading] = useState('Add New Budget');

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof router?.query?.id != 'undefined') {
      setHeading('Edit Budget');
    }
  }, [router.isReady, router.query]);
  return (
    <Layout>
      <Typography variant="h1">{heading}</Typography>
      <InputContextProvider>
        <BudgetAddInputs />
      </InputContextProvider>
    </Layout>
  );
}
