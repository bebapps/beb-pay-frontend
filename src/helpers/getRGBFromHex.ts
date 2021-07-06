// https://stackoverflow.com/a/62640342
const getRGBFromHex = (hex: string) => {
  let col = hex.replace(/^#/, '');
  if (col.length === 3) {
    col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];
  }

  const [r, g, b] = col.match(/.{2}/g)!;

  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
  };
};

export default getRGBFromHex;
