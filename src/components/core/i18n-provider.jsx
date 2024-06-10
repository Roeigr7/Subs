import * as React from 'react';
import { logger } from 'lib/default-logger';

import 'lib/i18n';

import { useTranslation } from 'react-i18next';

('use client');

export function I18nProvider({ children, language = 'en' }) {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(language).catch(() => {
      logger.error(`Failed to change language to ${language}`);
    });
  }, [i18n, language]);

  return <React.Fragment>{children}</React.Fragment>;
}
