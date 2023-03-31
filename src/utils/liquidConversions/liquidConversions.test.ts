import { flOzToMl, mlToFlOz } from './liquidConversions';

describe('liquid conversions', () => {
  describe('flOzToMl()', () => {
    it('converts fluid ounces to milliliters and rounds to two decimal places', () => {
      // Test with a value that has a clean conversion to milliliters
      expect(flOzToMl(2.70512)).toBe(80);

      // Test with a value that has a messy decimal conversion to milliliters
      expect(flOzToMl(3)).toBe(88.72);

      // Test with a value that should round down to two decimal places
      expect(flOzToMl(3.1)).toBe(91.68);

      // Test with a value that should round up to two decimal places
      expect(flOzToMl(3.3)).toBe(97.59);
    });
  });

  describe('mLToFlOz()', () => {
    it('converts milliliters to fluid ounces and rounds to two decimal places', () => {
      // Test with a value that has a clean conversion to fluid ounces
      expect(mlToFlOz(29.5735)).toBe(1);

      // Test with a value that has a messy decimal conversion to fluid ounces
      expect(mlToFlOz(1)).toBe(0.03);

      // Test with a value that should round down to two decimal places
      expect(mlToFlOz(50)).toBe(1.69);

      // Test with a value that should round up to two decimal places
      expect(mlToFlOz(52)).toBe(1.76);
    });
  })
});