export function convertKelvin(kelvin: number, toCelsius: Boolean): number {
  let output = 0;
  if (toCelsius) {
    output = kelvin - 273.15;
  } else {
    output = (kelvin * 9) / 5 - 459.67;
  }
  return Math.floor(output);
}
