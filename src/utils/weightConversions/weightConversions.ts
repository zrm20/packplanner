export function lbsToKg(lbs: number): number {
  const kg = lbs * 0.453592;
  return +kg.toFixed(2);
}

export function ozToKg(oz: number): number {
  const kg = oz * 0.0283495;
  return +kg.toFixed(2);
}

export function ozToLbs(oz: number): number {
  const lbs = oz / 16;
  return +lbs.toFixed(2);
}

export function kgToLbs(kg: number): number {
  const lbs = kg * 2.20462;
  return +lbs.toFixed(2);
}

export function kgToOz(kg: number): number {
  const oz = kg * 35.274;
  return +oz.toFixed(2);
}

export function kgToLbsOz(kg: number): number[] {
  //returns array of [0]lbs, and [1]remaining oz;
  let oz = kgToOz(kg);
  const lbs = Math.floor(oz / 16);
  oz = oz % 16;
  return [lbs, +oz.toFixed(2)];
}

export function roundedKg(kg: number): number {
  return +kg.toFixed(2);
}
