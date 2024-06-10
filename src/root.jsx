import * as React from 'react';
import { I18nProvider } from 'components/core/i18n-provider';
import { LocalizationProvider } from 'components/core/localization-provider';
import { SettingsButton } from 'components/core/settings/settings-button';
import { ThemeProvider } from 'components/core/theme-provider/theme-provider';
import { Toaster } from 'components/core/toaster';
import { AuthProvider } from 'contexts/auth/custom/user-context';
import { SettingsProvider } from 'contexts/settings';
import { applyDefaultSettings } from 'lib/settings/apply-default-settings';
import { getSettings as getPersistedSettings } from 'lib/settings/get-settings';
import { HelmetProvider } from 'react-helmet-async';

import 'styles/global.css';

('use client');

export function Root({ children }) {
  const settings = React.useRef(applyDefaultSettings(getPersistedSettings()));

  return (
    <HelmetProvider>
      <LocalizationProvider>
        <SettingsProvider settings={settings.current}>
          <I18nProvider language="en">
            <AuthProvider>
              <ThemeProvider>
                {children}
                <SettingsButton />
                <Toaster position="bottom-right" />
              </ThemeProvider>
            </AuthProvider>
          </I18nProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </HelmetProvider>
  );
}
