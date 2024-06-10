import * as React from 'react';
import Alert from '@mui/material/Alert';
import { configuration } from 'configuration';
import { useAuth } from 'contexts/auth/custom/user-context';
import { AuthStrategy } from 'lib/auth/strategy';
import { logger } from 'lib/default-logger';
import { paths } from 'paths';
import { useNavigate } from 'react-router-dom';

('use client');

export function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isChecking, setIsChecking] = React.useState(true);

  const checkPermissions = async () => {
    if (!currentUser) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');

      switch (configuration.auth.strategy) {
        case AuthStrategy.CUSTOM: {
          navigate(paths.auth.custom.signIn, { replace: true });
          return;
        }
        default: {
          logger.error('[AuthGuard]: Unknown auth strategy');
          return;
        }
      }
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
