const express = require('express');

const gachaController = require('./gacha-controller');

module.exports = (app) => {
  const route = express.Router();

  app.use('/gacha', route);

  route.post('/', gachaController.gacha);

  route.get('/daftar', gachaController.getPrizeDaftar);

  route.get('/history/:userId', gachaController.getHistory);
};
