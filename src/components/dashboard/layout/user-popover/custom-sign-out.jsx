import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'components/core/toaster';
import { useAuth } from 'contexts/auth/custom/user-context';
import { authClient } from 'lib/auth/custom/client';
import { logger } from 'lib/default-logger';

('use client');

export function CustomSignOut() {
  const { logout } = useAuth();
  const handleSignOut = React.useCallback(async () => {
    try {
      await logout();
    } catch (err) {
      logger.error('Sign out error', err);
      toast.error('Something went wrong, unable to sign out');
    }
  }, []);

  return (
    <MenuItem component="div" onClick={handleSignOut} sx={{ justifyContent: 'center' }}>
      Sign out
    </MenuItem>
  );
}
