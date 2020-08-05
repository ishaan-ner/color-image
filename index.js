const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
let pixelData = context.createImageData(canvas.width, canvas.height);

//step generator for each discreet rgb value, e.g. 8 - 256, 32 steps in this case
const createRgbSteps = (min, max, stepSize) => {
  let tempArr = [];
  for (let i = min; i <= max; i += stepSize) {
    tempArr.push(i);
  }
  return tempArr;
};
const rgbValues = createRgbSteps(8, 256, 8);

//generate all possible rgb colors from step values
const makeAllColors = (arr) => {
  let tempArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      for (let k = 0; k < arr.length; k++) {
        let newColor = {
          red: arr[i],
          green: arr[j],
          blue: arr[k],
        };
        tempArr.push(newColor);
      }
    }
  }
  return tempArr;
};
let allPossibleColors = makeAllColors(rgbValues);

//sort the pixel map to create various image patterns
const imagePatterns = () => {
  const randomPicker = Math.floor(Math.random() * 4);
  switch (randomPicker) {
    case 0:
      return function (a, b) {
        return b.red - a.blue;
      };
    case 1:
      return function (a, b) {
        return b.blue - a.blue;
      };
    case 2:
      return function (a, b) {
        return b.blue - a.green;
      };
    case 3:
      return function () {
        return Math.random() - 0.5;
      };
  }
};
allPossibleColors.sort(imagePatterns());

//generate pixel map to be plotted on to canvas
const createPixelMap = (colorsArr) => {
  let pixels = [];
  for (let i = 0; i < colorsArr.length; i++) {
    pixels.push(colorsArr[i].red);
    pixels.push(colorsArr[i].green);
    pixels.push(colorsArr[i].blue);
    pixels.push(255);
  }
  return pixels;
};
const finalPixels = createPixelMap(allPossibleColors);

pixelData.data.set(new Uint8ClampedArray([...finalPixels]));
context.putImageData(pixelData, 0, 0);

const refreshButton = document.getElementById("refresh-button");
const refreshPage = () => {
  location.reload();
};
refreshButton.addEventListener("click", refreshPage);
