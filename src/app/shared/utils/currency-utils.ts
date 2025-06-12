export function deformatCurrency(value: string): number {
  // Remove any non-numeric characters except for the decimal point
  const clean = value.replace(/[^0-9.]/g, '');

  return Number(clean);
}
