import {
  kgToLbs,
  lbsToKg,
  ozToKg,
  ozToLbs,
  kgToOz,
  kgToLbsOz,
  roundedKg,
} from './weightConversions';

describe('weight conversions', () => {
  describe('lbsToKg()', () => {
    it('converts lbs to kgs and rounds to two decimal places', () => {
      // Test with a value that has a clean conversion to kg
      expect(lbsToKg(2.20462)).toBe(1);

      // Test with a value that has a messy decimal conversion to kg
      expect(lbsToKg(1)).toBe(0.45);

      // Test with a value that should round down to two decimal places
      expect(lbsToKg(1.1)).toBe(0.5);

      // Test with a value that should round up to two decimal places
      expect(lbsToKg(0.8)).toBe(0.36);
    });
  });

  describe('ozToKg()', () => {
    it('converts oz to kg and rounds to two decimal places', () => {
      // Test with a value that has a clean conversion to kg
      expect(ozToKg(35.274)).toBe(1);

      // Test with a value that has a messy decimal conversion to kg
      expect(ozToKg(100)).toBe(2.83);

      // Test with a value that should round down to two decimal places
      expect(ozToKg(10)).toBe(0.28);

      // Test with a value that should round up to two decimal places
      expect(ozToKg(9)).toBe(0.26);
    });
  });

  describe('ozToLbs()', () => {
    it('converts oz to lbs and rounds to two decimal places', () => {
      // Test with a value that has a clean conversion to lbs
      expect(ozToLbs(16)).toBe(1);

      // Test with a value that has a messy decimal conversion to lbs
      expect(ozToLbs(1)).toBe(0.06);

      // Test with a value that should round down to two decimal places
      expect(ozToLbs(5)).toBe(0.31);

      // Test with a value that should round up to two decimal places
      expect(ozToLbs(6)).toBe(0.38);
    });
  });

  describe('kgToLbs()', () => {
    it('converts kg to lbs and rounds to two decimal places', () => {
      // Test with a value that has a clean conversion to lbs
      expect(kgToLbs(0.453592)).toBe(1);

      // Test with a value that has a messy decimal conversion to lbs
      expect(kgToLbs(1)).toBe(2.2);

      // Test with a value that should round down to two decimal places
      expect(kgToLbs(14)).toBe(30.86);

      // Test with a value that should round up to two decimal places
      expect(kgToLbs(1.5)).toBe(3.31);
    });
  });

  describe('kgToOz()', () => {
    it('converts kg to oz and rounds to two decimal places', () => {
      // Test with a value that has a clean conversion to oz
      expect(kgToOz(2.83495)).toBe(100);

      // Test with a value that has a messy decimal conversion to oz
      expect(kgToOz(1)).toBe(35.27);

      // Test with a value that should round down to two decimal places
      expect(kgToOz(1.1)).toBe(38.8);

      // Test with a value that should round up to two decimal places
      expect(kgToOz(1.2)).toBe(42.33);
    });
  });

  describe('kgToLbsOz()', () => {
    it('converts kg to lbs and oz and returns an array of [lbs, oz]', () => {
      // Test with a value that has a clean conversion to lbs and oz
      const result1 = kgToLbsOz(0.56699);
      expect(result1[0]).toBe(1);
      expect(result1[1]).toBe(4);

      // Test with a value that has a messy decimal conversion to lbs and oz
      const result2 = kgToLbsOz(1);
      expect(result2[0]).toBe(2);
      expect(result2[1]).toBe(3.27);
    });
  });

  describe('roundedKg', () => {
    it('should round to two decimals', () => {
      expect(roundedKg(1.234)).toBe(1.23);
      expect(roundedKg(1.235)).toBe(1.24);
    });
  });
});
