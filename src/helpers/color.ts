type Color = {
  r: number;
  g: number;
  b: number;
};

function getRgb(color: string): Color {
  let [r, g, b] = color
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((str) => Number(str));

  return {
    r,
    g,
    b,
  };
}

function rgbToString(color: Color) {
  return `rgb(${color.r},${color.g},${color.b})`;
}

export function colorInterpolate(
  colorA: string,
  colorB: string,
  intval: number
) {
  const rgbA = getRgb(colorA),
    rgbB = getRgb(colorB);

  const colorVal = (prop: "r" | "g" | "b") =>
    Math.round(rgbA[prop] * (1 - intval) + rgbB[prop] * intval);

  return rgbToString({
    r: colorVal("r"),
    g: colorVal("g"),
    b: colorVal("b"),
  });
}
