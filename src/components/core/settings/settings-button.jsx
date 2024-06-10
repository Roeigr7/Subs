import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { useSettings } from 'hooks/use-settings';
import { applyDefaultSettings } from 'lib/settings/apply-default-settings';
import { setSettings as setPersistedSettings } from 'lib/settings/set-settings';

import { SettingsDrawer } from './settings-drawer';

export function SettingsButton() {
  const { settings, setSettings } = useSettings();
  const { setColorScheme } = useColorScheme();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleUpdate = async (values) => {
    if (values.colorScheme) {
      setColorScheme(values.colorScheme);
    }

    const updatedSettings = { ...settings, ...values };

    setPersistedSettings(updatedSettings);
    // @ts-ignore
    setSettings(updatedSettings);
  };

  const handleReset = async () => {
    setPersistedSettings({});
    // @ts-ignore
    setSettings(applyDefaultSettings({}));
  };

  return (
    <React.Fragment>
      <Tooltip title="Settings">
        <Box
          component="button"
          onClick={() => {
            setOpenDrawer(true);
          }}
          sx={{
            animation: 'spin 4s linear infinite',
            background: 'var(--mui-palette-neutral-900)',
            border: 'none',
            borderRadius: '50%',
            bottom: 0,
            color: 'var(--mui-palette-common-white)',
            cursor: 'pointer',
            display: 'inline-flex',
            height: '40px',
            m: 4,
            p: '10px',
            position: 'fixed',
            right: 0,
            width: '40px',
            zIndex: 'var(--mui-zIndex-speedDial)',
            '&:hover': { bgcolor: 'var(--mui-palette-neutral-700)' },
            '@keyframes spin': { '0%': { rotate: '0' }, '100%': { rotate: '360deg' } },
          }}
        >
          <GearSixIcon fontSize="var(--icon-fontSize-md)" />
        </Box>
      </Tooltip>
      <SettingsDrawer
        onClose={() => {
          setOpenDrawer(false);
        }}
        onReset={handleReset}
        onUpdate={handleUpdate}
        open={openDrawer}
        values={settings}
      />
    </React.Fragment>
  );
}
