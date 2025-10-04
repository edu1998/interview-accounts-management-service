import { GetTimeStringByTimeZone } from './GetTimeStringByTimeZone';

describe('GetTimeStringByTimeZone', () => {
  it('should return a string', () => {
    const result = GetTimeStringByTimeZone();
    expect(typeof result).toBe('string');
  });

  it('should return a string in the correct format', () => {
    const result = GetTimeStringByTimeZone('America/Bogota');
    // Regex to match the format: d/m/yyyy, h:mm:ss a. m.
    const regex =
      /\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2}(\s|\u00A0)[ap]\.\s?m\./;
    expect(result).toMatch(regex);
  });
});
