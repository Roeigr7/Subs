import * as React from 'react';
import Alert from '@mui/material/Alert';
import { useAuth } from 'contexts/auth/custom/user-context';
import { logger } from 'lib/default-logger';
import { paths } from 'paths';
import { useNavigate } from 'react-router-dom';

('use client');

export function GuestGuard({ children }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isChecking, setIsChecking] = React.useState(true);

  const checkPermissions = async () => {
    if (currentUser) {
      logger.debug('[GuestGuard]: User is logged in, redirecting to dashboard');
      navigate(paths.dashboard.overview, { replace: true });
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
  }, [currentUser]);

  if (isChecking) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
