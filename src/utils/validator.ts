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

export const formatMoneyInput = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const newValue = event.target.value;
  const value = newValue.replace(/\D/g, "");

  if (!value) {
    event.target.value = "";
    return;
  }

  const valueAsNumber = parseFloat(value);
  const valueAsString = valueAsNumber.toString();
  const valueLength = valueAsString.length;

  if (valueAsNumber === 0 || isNaN(valueAsNumber)) {
    event.target.value = "";
  }

  if (valueLength === 1) {
    event.target.value = `0,0${valueAsString}`;
  } else if (valueLength === 2) {
    event.target.value = `0,${valueAsString}`;
  } else {
    const maxLength = 12;
    let valueToFormat = valueAsString;

    if (valueLength > maxLength) {
      valueToFormat = valueAsString.slice(0, 12);
    }

    const integerPart = valueToFormat.slice(0, valueToFormat.length - 2);
    const decimalPart = valueToFormat.slice(valueToFormat.length - 2);
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );

    event.target.value = `${formattedIntegerPart},${decimalPart}`;
  }
};
