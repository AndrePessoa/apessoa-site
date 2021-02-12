// Animate water line
const islandTopElem = document.querySelector("#sand-high");
const islandTopPoints = islandTopElem.getAttribute('d');
const islandTopValues = getPathValues(islandTopPoints);
islandTopElem.style= 'opacity: 0';

const islandBottomElem = document.querySelector("#sand-low");
const islandBottomPoints = islandBottomElem.getAttribute('d');
const islandBottomValues = getPathValues(islandBottomPoints);
islandBottomElem.style= 'opacity: 0.05';

const islandAnimatedElem = document.querySelector("#sand-animated");
const islandAnimationOffset = offsetPathsValues(islandTopValues, islandBottomValues);

function getPathValues(d){
  return d.split(/(?=[a-zA-Z,-])|(?<=[a-zA-Z,-])/gi);
}

function offsetPathsValues(a, b) {
  return a.map((val, i) => {
    if(!isNaN(val)){
      return parseFloat(a[i]) - parseFloat(b[i]);
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

function drawSeaWave(frame) {
  const prop1 = getSinProportion(frame, 400);
  const prop2 = getSinProportion(frame, 300);
  const prop = prop1 * prop2;

  const offset = islandAnimationOffset.map(val => val !== undefined ? val * prop : val);
  const pathValues = offset.map((val, i) => val !== undefined ? Math.max((parseFloat(islandBottomValues[i]) + val),0).toFixed(2) : islandTopValues[i]);

  islandAnimatedElem.setAttribute('d', pathValues.join(''));
}


// animate underwater effect

const meDrivingElem = document.querySelector("#driving svg");
const meDrivingEffect = document.querySelector("#sea-filter");

function drawDrivingEffect(frame) {
  const cycle = 2000;
  const noiseProp = getSinProportion(frame + cycle / 4, cycle / 3);
  const prop1 = getSinProportion(frame, cycle) * noiseProp;
  const prop2 = getSinProportion(frame + cycle / 2, cycle) * noiseProp;
  const prop3 = getSinProportion(frame, cycle * 2);

  meDrivingEffect.setAttribute('baseFrequency', (`${0.005 * prop1} ${0.005 * prop2}`));
  meDrivingElem.setAttribute('style', (`transform: translate(0, ${(50 * prop2).toFixed(2)}px) rotate(${(5 * prop3).toFixed(2)}deg);`));
}

// animation core

let frame = 0;
let paused = false;
function tick(){
  frame++;
  try {
    drawSeaWave(frame);
    drawDrivingEffect(frame);
  } catch (error) {
    paused = true
  }
  if(!paused) window.requestAnimationFrame(tick);
}
tick();

// anchor

const godownElem = document.querySelector("#godown");
const anchorElem = document.querySelector(".anchor");
godownElem.addEventListener('click', () => {
  anchorElem.classList.add('animate');
})
