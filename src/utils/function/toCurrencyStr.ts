export const toCurrencyStr = (value: number): string => {
  const valStr = value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  if (valStr.includes("Rp")) {
    return valStr;
  }
  return "Rp 0";
};
