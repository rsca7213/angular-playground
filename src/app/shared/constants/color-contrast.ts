import { TAppColors } from '../types/colors';

export const colorContrast = new Map<TAppColors, TAppColors>([
  ['primary', 'light'],
  ['secondary', 'light'],
  ['success', 'light'],
  ['error', 'light'],
  ['warning', 'dark'],
  ['info', 'dark'],
  ['light', 'dark'],
  ['dark', 'light']
]);
