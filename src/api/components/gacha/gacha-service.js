const gachaRepository = require('./gacha-repository');

const prizes = [
  { prize: 'Emas 10 gram', kuota: 1 },
  { prize: 'Smartphone X', kuota: 5 },
  { prize: 'Smartwatch Y', kuota: 10 },
  { prize: 'Voucher Rp100.000', kuota: 100 },
  { prize: 'Pulsa Rp50.000', kuota: 500 },
];

async function gacha(userId) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const count = await gachaRepository.countToday(userId, start);
  if (count >= 5) {
    throw new Error('Gacha limit reached');
  }

  const available = [];

  for (const prize of prizes) {
    const used = await gachaRepository.countPrize(prize.prize);
    if (used < prize.kuota) {
      available.push(prize);
    }
  }

  let result = null;
  if (available.length > 0) {
    const index = Math.floor(Math.random() * available.length);
    result = available[index].prize;
  }

  await gachaRepository.createGacha(userId, result);

  return result;
}

async function getPrizeDaftar() {
  const daftar = [];

  for (const item of prizes) {
    const used = await gachaRepository.countPrize(item.prize);
    daftar.push({
      prize: item.prize,
      kuota: item.kuota,
      used,
      remaining: item.kuota - used,
    });
  }

  return daftar;
}

async function getHistory(userId) {
  return gachaRepository.getHistory(userId);
}

module.exports = {
  gacha,
  getPrizeDaftar,
  getHistory,
};
