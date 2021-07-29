export function lbsToKg(lbs) {
  //converts lbs to kg
  return lbs * 0.453592;
}

export function ozToKg(oz){
  //converts oz to kg
  return oz * 0.0283495;
}

export function ozToLbs(oz){
  //converts oz to lbs
  return oz / 16;
}

export function kgToLbs(kg){
  //converts kg to lbs
  return kg * 2.20462;
}

export function kgToOz(kg){
  //converts kgToOz
  return kg * 35.274;
}

export function kgToLbsOz(kg){
  //returns array of [0]lbs, and [1]remaining oz;
  let oz = kgToOz(kg);
  let lbs = Math.floor(oz / 16);
  oz = oz % 16;
  return [lbs, oz];
}