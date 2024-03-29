import { useRouter } from 'next/router';
import { convertCentToRand, readableDuration } from '../../lib/utils';

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
        spacing={2}
        key={`cardscontent-${budget?.id}`}
        onClick={() => handleNewClicked(budget?.id)}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="h4">
          {readableDuration(budget?.timestamp, budget?.timestamp_end)}
        </Typography>
        <div>{`Remaining ${convertCentToRand(
          budget?.total_remaining_in_cents
        )}`}</div>
        <Typography variant="subtitle2">{`ID ${budget?.id}`}</Typography>
        <SearchIcon
          fontSize="large"
          className="icon"
          onClick={() => handleNewClicked(budget?.id)}
        />
      </Stack>
    );
  });

  budgetscards?.push(
    <Link href="/budget/edit/">
      <AddIcon fontSize="large" />
    </Link>
  );

  return <CardLayout cards={budgetscards} key="budget" />;
}
