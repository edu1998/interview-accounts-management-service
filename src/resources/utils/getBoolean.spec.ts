import { getBoolean } from './getBoolean';

describe('getBoolean', () => {
  describe('truthy values', () => {
    it('should return true for true', () => {
      expect(getBoolean(true)).toBe(true);
    });
    it("should return true for 'true'", () => {
      expect(getBoolean('true')).toBe(true);
    });
    it('should return true for 1', () => {
      expect(getBoolean(1)).toBe(true);
    });
    it("should return true for '1'", () => {
      expect(getBoolean('1')).toBe(true);
    });
    it("should return true for 'on'", () => {
      expect(getBoolean('on')).toBe(true);
    });
    it("should return true for 'yes'", () => {
      expect(getBoolean('yes')).toBe(true);
    });
  });

  describe('falsy values', () => {
    it('should return false for false', () => {
      expect(getBoolean(false)).toBe(false);
    });
    it("should return false for 'false'", () => {
      expect(getBoolean('false')).toBe(false);
    });
    it('should return false for 0', () => {
      expect(getBoolean(0)).toBe(false);
    });
    it("should return false for '0'", () => {
      expect(getBoolean('0')).toBe(false);
    });
    it("should return false for 'off'", () => {
      expect(getBoolean('off')).toBe(false);
    });
    it("should return false for 'no'", () => {
      expect(getBoolean('no')).toBe(false);
    });
    it('should return false for null', () => {
      expect(getBoolean(null)).toBe(false);
    });
    it('should return false for undefined', () => {
      expect(getBoolean(undefined)).toBe(false);
    });
    it('should return false for an empty string', () => {
      expect(getBoolean('')).toBe(false);
    });
    it('should return false for any other string', () => {
      expect(getBoolean('any other string')).toBe(false);
    });
  });
});
