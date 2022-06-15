import { forwardRef } from 'react';
import useStore from '../hooks/useStore';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notifications() {
  const alerts = useStore(state => state.alerts);
  const removeAlert = useStore(state => state.removeAlert);

  const handleClose = id => removeAlert(id);

  return (
    <>
      {alerts &&
        alerts.map(alert => (
          <Snackbar
            key={alert.id}
            autoHideDuration={4500}
            open={true}
            onClose={() => handleClose(alert.id)}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          >
            <Alert
              severity={alert.severity}
              onClose={() => handleClose(alert.id)}
              style={{ width: '100%' }}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        ))}
    </>
  );
}
