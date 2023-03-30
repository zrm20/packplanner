export function lbsToKg(lbs: number): number {
  //converts lbs to kg
  const exactKg = lbs * 0.453592;
  return Math.round(exactKg * 100) / 100;
}

export function ozToKg(oz: number): number {
  //converts oz to kg
  const exactKg = oz * 0.0283495;
  return Math.round(exactKg * 100) / 100;
}

export function ozToLbs(oz: number): number {
  //converts oz to lbs
  return oz / 16;
}

export function kgToLbs(kg: number): number {
  //converts kg to lbs
  const exactLbs = kg * 2.20462;
  const roundedLbs = Math.round(exactLbs * 100) / 100;
  return roundedLbs;
}

export function kgToOz(kg: number): number {
  //converts kgToOz
  const exactOz = kg * 35.274;
  return Math.round(exactOz);
}

export function kgToLbsOz(kg: number): number[] {
  //returns array of [0]lbs, and [1]remaining oz;
  let oz = kgToOz(kg);
  const lbs = Math.floor(oz / 16);
  oz = oz % 16;
  return [lbs, oz];
}

export function roundedKg(kg: number): number {
  return Math.round(kg * 100) / 100;
}
