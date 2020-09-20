'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100; //
const CLOUD_Y = 10; //
const GAP = 10; //
const FONT_GAP = 15;
const MAX_HEIGHT_BAR = 150;
const WIDHT_BAR = 40;
const BAR_GAP = 50;
const YOUR_COLOR = `rgba(225, 0, 0, 1)`;

let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

let renderText = function (ctx, text, x, y, font, color) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

let getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  let posts = [`Ура вы победили!`, `Список результатов:`];

  for (let i = 0; i < posts.length; i++) {
    let text = posts[i];

    renderText(ctx, text, CLOUD_X + BAR_GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + FONT_GAP) * i, `16px PT Mono`, `#000`);
  }

  let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    // условие для выбора цвета бара игроков
    if (players[i] === `Вы`) {
      ctx.fillStyle = YOUR_COLOR;
    } else {
      ctx.fillStyle = `hsl(255, 100%,` + Math.random() * 100 + `%)`;
    }
    renderBar(ctx, CLOUD_X + BAR_GAP + (WIDHT_BAR + BAR_GAP) * i, CLOUD_HEIGHT - (MAX_HEIGHT_BAR * times[i]) / maxTime - FONT_GAP * 2, WIDHT_BAR, (MAX_HEIGHT_BAR * times[i]) / maxTime, ctx.fillStyle);
    renderText(ctx, players[i], CLOUD_X + BAR_GAP + (WIDHT_BAR + BAR_GAP) * i, CLOUD_HEIGHT - FONT_GAP, `16px PT Mono`, `#000`);
    renderText(ctx, Math.floor(times[i]), CLOUD_X + BAR_GAP + (WIDHT_BAR + BAR_GAP) * i, CLOUD_HEIGHT - (MAX_HEIGHT_BAR * times[i]) / maxTime - FONT_GAP - GAP * 2, `16px PT Mono`, `#000`);
  }
};
