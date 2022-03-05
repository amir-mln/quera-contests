const BREAKPOINTS = ["xs", "sm", "md", "lg"];

const $ = (...q) => document.querySelector(...q);
const $$ = (...q) => document.querySelectorAll(...q);

const INPUT_EL_SELECTOR = "#input";
const OUTPUT_EL_SELECTOR = "#output";

function triggerEvent(el, type) {
  let e = document.createEvent("HTMLEvents");
  e.initEvent(type, false, true);
  el.dispatchEvent(e);
}

const normalizeClassName = (className) =>
  className.replace(/\s+/g, " ").trim().split(/\s+/).sort().join(" ");
const writeInput = (input) => cy.get(INPUT_EL_SELECTOR).type(input);
const clearInput = () => cy.get(INPUT_EL_SELECTOR).focus().clear();
const readOutput = () => cy.get(OUTPUT_EL_SELECTOR).invoke("text");
const testClassNamesToBe = (input, trueOutput) =>
  cy.get(INPUT_EL_SELECTOR).then(function ($input) {
    $input[0].value = input;

    triggerEvent($input[0], "keyup");
    triggerEvent($input[0], "keydown");
    triggerEvent($input[0], "keypress");

    cy.get(OUTPUT_EL_SELECTOR).then(($el) => {
      expect(normalizeClassName($el[0].innerHTML)).equal(
        normalizeClassName(trueOutput)
      );
    });
  });

describe("Purge ClassNames Tests:", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it('"m-5 mr-2" should be "my-5 ml-5 mr-2"', () => {
    testClassNamesToBe(`m-5 mr-2`, `my-5 ml-5 mr-2`);
  });

  it('"mx-5 mr-5 ml-5" should be "m-5"', () => {
    testClassNamesToBe(`my-5 mr-5 ml-5`, `m-5`);
  });
});
