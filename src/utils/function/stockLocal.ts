export const setStockSetting = (id: string) => {
  localStorage.setItem("stockSetting", id);
};

export const getRemStockSetting = () => {
  const code = localStorage.getItem("stockSetting");
  if (!code) return null;
  localStorage.removeItem("stockSetting");
  return code;
};
