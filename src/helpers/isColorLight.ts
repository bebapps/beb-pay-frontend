import getRGBFromHex from './getRGBFromHex';

const isColorLight = (hex: string) => {
  const { red, green, blue } = getRGBFromHex(hex);

  // https://stackoverflow.com/a/3943023
  return (red * 0.299 + green * 0.587 + blue * 0.114) > 186;
};

export default isColorLight;
