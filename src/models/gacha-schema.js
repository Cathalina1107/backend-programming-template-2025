module.exports = (db) =>
  db.model(
    'Gacha',
    db.Schema({
      userId: String,
      prize: String,
    }, { timestamps: true }
  ) 
  );
