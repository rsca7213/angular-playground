import { TAppColors } from '../types/colors';

export const colorContrast: Map<TAppColors, TAppColors> = new Map([
  ['primary', 'light'],
  ['secondary', 'light'],
  ['success', 'light'],
  ['error', 'light'],
  ['warning', 'dark'],
  ['info', 'dark'],
  ['light', 'dark'],
  ['dark', 'light']
]);
