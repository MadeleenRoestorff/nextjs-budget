import { FormHelperText, Box, Collapse } from '@mui/material';
import styled from '@emotion/styled';

export default function AnimatedHelperText({ error }) {
  return (
    // <AnimationStyling error={error}>

    <Collapse in={error}>
      <FormHelperText error={error ? true : false}>
        {`${error ? 'Incorrect Entry' : 'No Error'}`}
      </FormHelperText>
    </Collapse>
  );
}

const AnimationStyling = styled(Box)(({ error }) => ({
  opacity: `${error ? 1 : 0}`,
  maxHeight: `${error ? '21px' : '0px'}`,
  transform: `${error ? 'translateX(0)' : 'translateX(-100%)'}`,
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
}));
