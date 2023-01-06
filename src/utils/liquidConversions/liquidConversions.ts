
export function flOzToML(flOz: number): number {
  //converts fl Oz to mL
  const exactMl = flOz * 29.5735;
  return Math.round(exactMl * 100) / 100;
};

export function mLToFlOz(mL: number): number {
  //converts mL to fl oz
  const exactOz = mL * 0.033814;
  return Math.round(exactOz * 100) / 100;
};
