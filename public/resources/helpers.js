function getPathValues(d){
  return d.split(/(?=[a-zA-Z,-])|(?<=[a-zA-Z,-])/gi);
}

function offsetPathsValues(a, b) {
  return a.map((val, i) => {
    if(!isNaN(val)){
      const offset = parseFloat(a[i]) - parseFloat(b[i]);
      if(isNaN(offset)) debugger;
      return offset;
    }
    return undefined;
  });
}

function getCycleProportion(frame, cycle){
  return ((frame % cycle) / cycle);
}

function getSinProportion(frame, cycle){
  const turn = getCycleProportion(frame, cycle);
  const rad  = turn * 2 * Math.PI;
  const prop = (Math.sin(rad) + 1) / 2 * 0.8 + .2;

  return prop;
}