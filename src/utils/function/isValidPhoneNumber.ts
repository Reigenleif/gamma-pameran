// Valid phone number is defined as a string that starts with "+" or a number.
export function isValidPhoneNumber(phoneNumber: string): boolean {
  if (phoneNumber === "") {
    return true;
  }

  const isStartsWithValid =
    phoneNumber.startsWith("+") || !isNaN(parseInt(phoneNumber?.[0] ?? ""));
  if (phoneNumber.length === 1) return isStartsWithValid;

  const isNumber = !isNaN(parseInt(phoneNumber.slice(1, phoneNumber.length)));

  return isStartsWithValid && isNumber;
}
