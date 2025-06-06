import { TAppColors } from '../types/colors';

export const colorContrast: Map<TAppColors, TAppColors> = new Map([
  ['primary', 'light'],
  ['secondary', 'light'],
  ['success', 'light'],
  ['danger', 'light'],
  ['warning', 'dark'],
  ['info', 'dark'],
  ['light', 'dark'],
  ['dark', 'light']
]);
