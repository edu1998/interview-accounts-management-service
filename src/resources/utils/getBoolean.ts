/**
 * Converts the input value to a boolean based on common truthy values.
 * @param {any} value - The value to be converted to a boolean.
 * @returns {boolean} - The boolean representation of the input value.
 */
export function getBoolean(value: any): boolean {
  switch (value) {
    case true:
    case 'true':
    case 1:
    case '1':
    case 'on':
    case 'yes':
      return true;
    default:
      return false;
  }
}
