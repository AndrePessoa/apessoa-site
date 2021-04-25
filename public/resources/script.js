// Fix mobile 100vh issue
function defineDocumentVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
const driving = document.getElementById('driving');
function onScrollHandler() {
  defineDocumentVH();
  const winHeight = window.innerHeight;
  const limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
  const prop = window.scrollY / limit;
  const paralax = prop * winHeight - winHeight / 3;
  driving.style = `bottom: ${paralax}px`;
}
window.addEventListener('resize', defineDocumentVH);
window.addEventListener('scroll', onScrollHandler);
defineDocumentVH();

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
const islandWavesEffect = document.querySelector("#waves");
const islandAnimationOffset = offsetPathsValues(islandTopValues, islandBottomValues).reverse();

const islandAnimatedLeaf1Elem = document.querySelector("#island #Layer_4");
const islandAnimatedLeaf2Elem = document.querySelector("#island #Layer_5");

const islandAnimatedLeafsElems = document.querySelectorAll("#island #Layer_4 path, #island #Layer_5 path");

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

  function calcProp (i, total) {
    const propTime = i / total;
    const prop1 = getSinProportion(frame + 150 * propTime, 300);
    const prop2 = getSinProportion(frame + 100 + 400 * propTime, 400);
    return (.7 * prop1 * prop2);
  }

  islandWavesEffect.setAttribute('dx', (calcProp(1,1) * 14 - 7));
  islandWavesEffect.setAttribute('dy', (calcProp(1,1) * 6 ));

  const offset = islandAnimationOffset.map((val, i) => val !== undefined ? val * calcProp(i, islandAnimationOffset.length) : val);

  const pathValues = offset.reverse().map((val, i) => val !== undefined ? Math.max((parseFloat(islandBottomValues[i]) + val),0).toFixed(2) : islandTopValues[i]);

  islandAnimatedElem.setAttribute('d', pathValues.join(''));
}

function drawLeaft(frame) {

  //islandAnimatedLeaf1Elem.style.transform = `rotate(${rotate}deg)`;
  //islandAnimatedLeaf2Elem.style.transform = `rotate(${rotate}deg)`;

  for (let index = 0; index < islandAnimatedLeafsElems.length; index++) {
    const element = islandAnimatedLeafsElems[index];
    const delay = 100 * index;
    const prop1 = getSinProportion(frame + delay, 300);

    const rotate = 15 * prop1 - 7.5; 

    element.style.transform = `rotate(${rotate}deg)`;
  }
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
    drawLeaft(frame);
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
