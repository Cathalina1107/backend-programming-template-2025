const { Gacha } = require('../../../models');

async function countToday(userId, startDate) {
  return Gacha.countDocuments({
    userId,
    createdAt: { $gte: startDate },
  });
}

async function countPrize(prize) {
  return Gacha.countDocuments({
    prize,
  });
}

async function createGacha(userId, prize) {
  return Gacha.create({
    userId: userId,
    prize: prize,
  });
}

async function getHistory(userId) {
  return Gacha.find({ userId });
}

module.exports = {
  countToday,
  countPrize,
  createGacha,
  getHistory,
};
