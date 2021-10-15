export function getCycleProportion(frame, cycle) {
  return (frame % cycle) / cycle;
}

export function getSinProportion(frame, cycle) {
  const turn = getCycleProportion(frame, cycle);
  const rad = turn * 2 * Math.PI;
  const prop = (Math.sin(rad) + 1) / 2;

  return prop;
}
