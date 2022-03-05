const preview = document.querySelector("#preview");
const previewScale = document.querySelector("#preview-scale");
const previewFlip = document.querySelector("#preview-flip");
const brightnessSlider = document.querySelector("#brightness");
const brightnessSliderValue = document.querySelector("#brightness-value");
const rotateSlider = document.querySelector("#rotate");
const rotateSliderValue = document.querySelector("#rotate-value");

const filterValues = {
  grayscale: 1,
  sepia: 1,
  invert: 1,
  blur: "2px",
  saturate: 2,
  contrast: 2,
  "hue-rotate": "90deg",
};

const handleRotate = () => {
  const rotate = rotateSlider.value;
  rotateSliderValue.innerText = rotate;

  // TODO: write your code here
  const rotateToRadian = (rotate * (Math.PI / 180)).toFixed(5);
  const scale = (
    Math.abs(Math.sin(rotateToRadian)) + Math.abs(Math.cos(rotateToRadian))
  ).toFixed(5);

  preview.style.transform = `rotate(${rotate}deg) scale(${scale})`;
};

const handleBrightness = () => {
  const brightness = brightnessSlider.value;
  brightnessSliderValue.innerText = brightness;

  // TODO: write your code here
  const prevFilters = preview.style.filter.replace(
    /brightness\([0-9\.]+\)/gm,
    ""
  );
  const newFilter = prevFilters + ` brightness(${brightness})`;
  preview.style.filter = newFilter;
};

const handleFilter = (e) => {
  const { target } = e;
  const { id: filter } = target;
  // filter: "grayscale" | "sepia" | "invert" | "hue-rotate" | "contrast" | "saturate" | "blur"

  // TODO: write your code here
  let prevBrightnessValue = preview.style.filter.match(
    /(?<=brightness)\([0-9\.]+\)/
  );

  let newFilter = filter === "none" ? "" : `${filter}(${filterValues[filter]})`;
  newFilter += prevBrightnessValue
    ? ` brightness${prevBrightnessValue[0]}`
    : "";

  preview.style.filter = newFilter;
};

const handleFlip = (flip) => {
  //  flip: "vertical" | "horizontal"

  let prevScaleX = previewFlip.style.transform.match(/(?<=scaleX\()[1\-]{1,2}/);
  prevScaleX = prevScaleX ? prevScaleX[0] : "1";

  let prevScaleY = previewFlip.style.transform.match(/(?<=scaleY\()[1\-]{1,2}/);
  prevScaleY = prevScaleY ? prevScaleY[0] : "1";

  const newVerticalFlip = `scaleX(${prevScaleX}) scaleY(${-prevScaleY})`;

  const newHorizontalFlip = `scaleX(${-prevScaleX}) scaleY(${prevScaleY})`;

  if (flip === "vertical") {
    previewFlip.style.transform = newVerticalFlip;
  } else {
    previewFlip.style.transform = newHorizontalFlip;
  }
};

const handleMouseEnter = () => {
  // TODO: write your code here
  previewScale.style.transform = "scale(2)";
};

const handleMouseLeave = () => {
  // TODO: write your code here.
  previewScale.style.transform = "scale(1)";
};

const handleMouseMove = (e) => {
  const imageWidth = previewScale.offsetWidth;
  const imageHeight = previewScale.offsetHeight;
  const imageOffsetTop = previewScale.offsetTop;
  const imageOffsetLeft = previewScale.offsetLeft;
  const pageX = e.pageX;
  const pageY = e.pageY;

  const xPos = pageX - imageOffsetLeft;
  const yPos = pageY - imageOffsetTop;

  if (xPos >= 0 && yPos >= 0) {
    const xPerc = (xPos / imageWidth).toFixed(5) * 100 + "%";
    const yPerc = (yPos / imageHeight).toFixed(5) * 100 + "%";

    previewScale.style.transformOrigin = `${xPerc} ${yPerc}`;
  }
  // TODO: write your code here
};
