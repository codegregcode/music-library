const db = require('../db/index');

const createArtist = async (req, res) => {
  const { name, genre } = req.body;
  const {
    rows: [artist],
  } = await db.query(
    `INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`,
    [name, genre]
  );

  try {
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getArtists = async (_, res) => {
  const { rows } = await db.query('SELECT * FROM Artists');

  try {
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getArtist = async (req, res) => {
  const { id } = req.params;
  const {
    rows: [artist],
  } = await db.query('SELECT * FROM Artists WHERE id = $1', [id]);

  try {
    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }

    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getArtistsAlbums = async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM Albums WHERE artistid = $1', [
    id,
  ]);

  try {
    if (!rows) {
      return res
        .status(404)
        .json({ message: `albums don't exist for this artist` });
    }
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const putArtist = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;

  try {
    const {
      rows: [artist],
    } = await db.query(
      'UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *',
      [name, genre, id]
    );

    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }

    res.status(200).json(artist);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

const patchArtist = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;

  let query, params;

  if (name && genre) {
    query = `UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *`;
    params = [name, genre, id];
  } else if (name) {
    query = `UPDATE Artists SET name = $1 WHERE id = $2 RETURNING *`;
    params = [name, id];
  } else if (genre) {
    query = `UPDATE Artists SET genre = $1 WHERE id = $2 RETURNING *`;
    params = [genre, id];
  }

  try {
    const {
      rows: [artist],
    } = await db.query(query, params);

    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }

    res.status(200).json(artist);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

const deleteArtist = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [artist],
  } = await db.query(`DELETE FROM Artists WHERE id = $1 RETURNING *`, [id]);
  try {
    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  createArtist,
  getArtists,
  getArtist,
  getArtistsAlbums,
  putArtist,
  patchArtist,
  deleteArtist,
};
