import { useRouter } from 'next/router';
import { convertCentToRand, readableTimestamp } from '../../lib/utils';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import CardLayout from '../general/CardsLayout';
import Link from '../general/Link';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

export default function CardsContent({ result = [] }) {
  const router = useRouter();
  const handleNewClicked = id => {
    router.push(`/summary/view/?id=${id}`);
  };

  const budgetscards = result?.map(budget => {
    return (
      <Stack
        key={`cardscontent-${budget?.id}`}
        onClick={() => handleNewClicked(budget?.id)}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="h4">
          {readableTimestamp(budget?.timestamp)}
        </Typography>
        <div>{`Remaining ${convertCentToRand(
          budget?.total_remaining_in_cents
        )}`}</div>
        <Typography variant="subtitle2">{`ID ${budget?.id}`}</Typography>
      </Stack>
    );
  });

  budgetscards?.push(
    <Link href="/budget/add/">
      <AddIcon fontSize="large" />
    </Link>
  );

  return (
    <CardLayout
      cards={budgetscards}
      key="budget"
      Icon={SearchIcon}
      notaddblock={false}
    />
  );
}
