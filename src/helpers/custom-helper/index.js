export const handleOptions = (data = []) => {
  return data.map((item) => ({ label: item.name, value: item.id }));
};
