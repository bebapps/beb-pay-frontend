import getRGBFromHex from './getRGBFromHex';
import isColorLight from './isColorLight';

// https://stackoverflow.com/a/62640342
const getColorShade = (hex: string, amount: number) => {
  const { red, green, blue } = getRGBFromHex(hex);

  const r = Math.max(Math.min(255, red + amount), 0).toString(16);
  const g = Math.max(Math.min(255, green + amount), 0).toString(16);
  const b = Math.max(Math.min(255, blue + amount), 0).toString(16);

  const rr = (r.length < 2 ? '0' : '') + r;
  const gg = (g.length < 2 ? '0' : '') + g;
  const bb = (b.length < 2 ? '0' : '') + b;

  return `#${rr}${gg}${bb}`;
};

export default getColorShade;
