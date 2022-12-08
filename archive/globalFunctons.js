//all inventory items are stored in metric form. Weight as kg, water capacity as mL. 

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

export function flOzToML(flOz){
  //converts fl Oz to mL
  return flOz * 29.5735;
}

export function mLToFlOz(mL){
  //converts mL to fl oz
  return mL * 0.033814;
}

export function calcWaterWeight(capacity){
  //this accepts capacity in mL and converts to weight in kg
  return capacity / 1000;
}

export function calcTotalWeight(items, pack){
    let weight = 0;
    items.forEach(item => {
      weight += (item.weight * item.qty);
    });

    pack ? weight += pack.weight : null;

    return weight;
  }

  export function calcBaseWeight(items, baseWeightExemptCategories, pack){
    let weight = 0;
    items.forEach(item => {
      if(!baseWeightExemptCategories.includes(item.category)){
        weight += (item.weight * item.qty);
      };
    });

    pack ? weight += pack.weight : null;

    return weight;
  }

  export function calcTotalPlusWaterWeight(items, pack){
    let gearWeight = 0;
    let liquidCapacity = 0;

    items.forEach(item => {
      gearWeight += (item.weight * item.qty);
      if(item.liquidCapacity){
        liquidCapacity += item.liquidCapacity;
      };
    });

    let waterWeight = calcWaterWeight(liquidCapacity);

    pack ? gearWeight += pack.weight : null;

    return gearWeight + waterWeight;
  }


