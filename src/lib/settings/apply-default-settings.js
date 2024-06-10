import { configuration } from 'configuration';

export function applyDefaultSettings(settings) {
  return {
    colorScheme: configuration.site.colorScheme,
    primaryColor: configuration.site.primaryColor,
    direction: 'rtl',
    navColor: 'evident',
    layout: 'vertical',
    ...settings,
  };
}
