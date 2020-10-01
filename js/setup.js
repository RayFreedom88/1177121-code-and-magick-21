'use strict';

const WIZARD_COUNT = 4;
const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
let wizards = [];

let setup = document.querySelector(`.setup`);
setup.querySelector(`.setup-similar`).classList.remove(`hidden`);

let similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
let similarListElement = setup.querySelector(`.setup-similar-list`);

let setupOpen = document.querySelector(`.setup-open`);
let setupClose = setup.querySelector(`.setup-close`);

let MIN_NAME_LENGTH = 2;
let MAX_NAME_LENGTH = 25;

let userNameInput = setup.querySelector(`.setup-user-name`);

let setupPlayer = document.querySelector(`.setup-player`);
let inputCoat = setupPlayer.querySelector(`input`);
let inputEyes = setupPlayer.querySelector(`input:last-child`);
let inputFireball = setupPlayer.querySelector(`.setup-fireball-wrap input`);
let wizardCoat = document.querySelector(`.wizard-coat`);
let wizardEyes = document.querySelector(`.wizard-eyes`);
let wizardFireball = document.querySelector(`.setup-fireball-wrap`);

// создание и отрисовка персонажей

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
      coatColor: COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[getRandomInt(0, EYES_COLORS.length - 1)]
    });
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

renderWizards();

// открытие и закрытие popup

let onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

let openPopup = function () {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

let closePopup = function () {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

// валидация формы

userNameInput.addEventListener(`invalid`, function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity(`Имя должно состоять минимум из 2-х символов`);
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity(`Имя не должно превышать 25-ти символов`);
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity(`Увы, сударь, изволь заполнить!`);
  } else {
    userNameInput.setCustomValidity(``);
  }
});

userNameInput.addEventListener(`input`, function () {
  let valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MIN_NAME_LENGTH) + ` симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }
});

// кастомизация персонажа

let onCoatClick = function () {
  wizardCoat.style.fill = COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)];
  inputCoat.value = COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)];
};

let onEyesClick = function () {
  wizardEyes.style.fill = EYES_COLORS[getRandomInt(0, EYES_COLORS.length - 1)];
  inputEyes.value = EYES_COLORS[getRandomInt(0, EYES_COLORS.length - 1)];
};

let onFireballClick = function () {
  wizardFireball.style.background = FIREBALL_COLORS[getRandomInt(0, FIREBALL_COLORS.length - 1)];
  inputFireball.value = FIREBALL_COLORS[getRandomInt(0, FIREBALL_COLORS.length - 1)];
};

wizardCoat.addEventListener(`click`, onCoatClick);
wizardEyes.addEventListener(`click`, onEyesClick);
wizardFireball.addEventListener(`click`, onFireballClick);
