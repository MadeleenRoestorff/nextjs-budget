import { Button, Zoom, Tooltip } from '@mui/material';

export default function CustomButton({ handleClick, Icon, title }) {
  return (
    <Tooltip
      //   TransitionComponent={Zoom}
      //   TransitionProps={{ timeout: 250 }}
      title={title}
      //   arrow
      followCursor
    >
      <Button
        key={title.toLowerCase()}
        variant="outlined"
        aria-label={title.toLowerCase()}
        size="large"
        startIcon={<Icon fontSize="inherit" />}
        onClick={() => handleClick()}
      />
    </Tooltip>
  );
}
