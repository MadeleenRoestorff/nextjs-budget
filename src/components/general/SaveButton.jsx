import { Alert, Button, Collapse, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export default function SaveButton({ saveInstance, alert, setAlert }) {
  return (
    <Stack spacing={2} alignItems="center">
      <Button sx={{ width: '50%' }} variant="outlined" onClick={saveInstance}>
        SAVE
      </Button>
      <Collapse sx={{ width: '50%' }} in={alert?.message?.length > 0}>
        <Alert
          variant="outlined"
          severity={alert?.alertType}
          action={
            <Stack direction="row" spacing={1} alignItems="center">
              {alert.alertType == 'info' ? (
                <Button
                  variant="small"
                  color="inherit"
                  onClick={() => {
                    dispatch({ type: 'balance' });
                    setAlert({
                      alertType: 'warning',
                      message: '',
                    });
                  }}
                >
                  {`Add ${formatFloatPrice(values?.balance?.total)}`}
                </Button>
              ) : null}

              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert({
                    alertType: 'warning',
                    message: '',
                  });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          }
        >
          {alert?.message}
        </Alert>
      </Collapse>
    </Stack>
  );
}
