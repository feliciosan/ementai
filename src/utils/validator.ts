export const replaceSpecialCharacters = (text: string) => {
  const normalizedText = (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/([^\w]+|\s+)/g, "-")
    .replace(/--+/g, "-")
    .replace(/(^-+|-+$)/, "")
    .toLowerCase();

  return normalizedText;
};
