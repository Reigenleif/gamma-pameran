export const toCurrencyStr = (value: number): string => {
  const valStr = value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  if (valStr.includes("NaN")) {
    return "Rp0";
  }
  return valStr
};
