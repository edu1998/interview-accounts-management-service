/**
 * Returns the current date and time as a string formatted according to the specified time zone.
 *
 * @param timeZone The time zone to use for formatting the date and time. Defaults to 'America/Bogota'.
 * @returns A string representing the current date and time in the specified time zone.
 */
export function GetTimeStringByTimeZone(timeZone = 'America/Bogota'): string {
  return new Date().toLocaleString('es-CO', {
    timeZone: timeZone,
  });
}
