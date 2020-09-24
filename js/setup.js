'use strict';

const WIZARD_COUNT = 4;
const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];
let wizards = [];

let setupDialog = document.querySelector(`.setup`);
setupDialog.classList.remove(`hidden`);
setupDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

let similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
let similarListElement = setupDialog.querySelector(`.setup-similar-list`);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

let renderWizards = function () {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < WIZARD_COUNT; i++) {
    wizards.push({
      name: WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length - 1)] + ` ` + WIZARD_LAST_NAMES[getRandomInt(0, WIZARD_LAST_NAMES.length - 1)],
      coatColor: COAT_COLOR[getRandomInt(0, COAT_COLOR.length - 1)],
      eyesColor: EYES_COLOR[getRandomInt(0, EYES_COLOR.length - 1)]
    });
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

renderWizards();
