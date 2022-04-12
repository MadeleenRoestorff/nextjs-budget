import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function CardLayout({
  cards = [],
  cardkey = 'summary',
  size = 6,
}) {
  return (
    <Box key={cardkey} mb={2} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        {cards.map((card, index) => {
          return (
            <Grid item xs={size} key={`${cardkey}-${index}`}>
              <StyledPaper key={`${cardkey}-${index}`}>{card}</StyledPaper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

const StyledPaper = styled(Paper)`
  height: 100%;
  border-radius: 40px;
  padding: 32px;
  position: relative;
  text-align: center;

  &:hover svg.icon {
    opacity: 1;
  }

  & svg.icon {
    position: absolute;
    transition: opacity 0.1s ease-in-out;
    top: 0;
    right: 0;
    opacity: 0;
  }
`;
