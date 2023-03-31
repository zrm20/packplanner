export function flOzToMl(flOz: number): number {
  //converts fl Oz to mL
  const milliliters = flOz * 29.5735296; // 1 fluid ounce is equal to 29.5735296 milliliters
  return +milliliters.toFixed(2); // round to two decimal places and convert back to a number
}

export function mlToFlOz(ml: number): number {
  const fluidOunce = ml / 29.5735296; // 1 fluid ounce is equal to 29.5735296 milliliters
  return +fluidOunce.toFixed(2); // round to two decimal places and convert back to a number
}
