import styled from '@emotion/styled';
import Pencil from '../../icons/Pencil';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function CardLayout({
  cards = [],
  cardkey = 'summary',
  Icon = Pencil,
  size = 6,
  notaddblock = true,
}) {
  return (
    <Box key={cardkey} sx={{ flexGrow: 1, marginBottom: '16px' }}>
      <Grid container spacing={2} justifyContent="center">
        {cards.map((card, index) => {
          return (
            <Grid item xs={size} key={`${cardkey}-${index}`}>
              <StyledPaper key={`${cardkey}-${index}`}>
                {card}
                {index == cards.length - 1 ? (
                  notaddblock ? (
                    <Icon />
                  ) : null
                ) : (
                  <Icon />
                )}
              </StyledPaper>
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

  &:hover > svg {
    opacity: 1;
  }

  & > svg {
    position: absolute;
    transition: opacity 0.1s ease-in-out;
    top: 0;
    right: 0;
    opacity: 0;
  }
`;
