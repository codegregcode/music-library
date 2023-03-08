const db = require('../db/index');

// const albumController = (req, res) => {
//   res.status(201).json({
//     name: req.body.name,
//     date: req.body.date,
//   });
// };

const createAlbum = async (req, res) => {
  const { name, date } = req.body;
  const { id } = req.params;

  try {
    const {
      rows: [album],
    } = await db.query(
      'INSERT INTO Albums (name, date, artistId) VALUES ($1, $2, $3) RETURNING *',
      [name, date, id]
    );
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createAlbum };
