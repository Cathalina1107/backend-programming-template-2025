const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function gacha(request, response, next) {
  try {
    const { userId } = request.body;
    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }
    const result = await gachaService.gacha(userId);
    return response
      .status(200)
      .json({ message: result ? 'Menang' : 'Coba lagi', prize: result });
  } catch (error) {
    return next(error);
  }
}

async function getPrizeDaftar(request, response, next) {
  try {
    const data = await gachaService.getPrizeDaftar();

    return response.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

async function getHistory(request, response, next) {
  try {
    const { userId } = request.params;
    const data = await gachaService.getHistory(userId);
    return response.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  gacha,
  getPrizeDaftar,
  getHistory,
};
