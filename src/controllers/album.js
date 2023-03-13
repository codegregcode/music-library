const db = require('../db/index');

const createAlbum = async (req, res) => {
  const { name, year } = req.body;
  const { id } = req.params;
  const {
    rows: [album],
  } = await db.query(
    'INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *',
    [name, year, id]
  );

  try {
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAlbums = async (_, res) => {
  const { rows } = await db.query('SELECT * FROM Albums');

  try {
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAlbum = async (req, res) => {
  const { id } = req.params;
  const {
    rows: [album],
  } = await db.query('SELECT * FROM Albums WHERE id = $1', [id]);

  try {
    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const patchAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year, artistid } = req.body;

  let query, params;

  if (name && year && artistid) {
    query = `UPDATE Albums SET name = $1, year = $2, artistid = $3 WHERE id = $4 RETURNING name, year, artistid, id`;
    params = [name, year, artistid, id];
  } else if (name && year) {
    query = `UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING name, year, artistid, id`;
    params = [name, year, id];
  } else if (name) {
    query = `UPDATE Albums SET name = $1 WHERE id = $2 RETURNING name, year, artistid, id`;
    params = [name, id];
  } else if (year && artistid) {
    query = `UPDATE Albums SET year = $1, artistid = $2 WHERE id = $3 RETURNING *`;
    params = [year, artistid, id];
  } else if (year) {
    query = `UPDATE Albums SET year = $1 WHERE id = $2 RETURNING name, year, artistid, id`;
    params = [year, id];
  }
  try {
    const {
      rows: [album],
    } = await db.query(query, params);

    if (!album) {
      return res.status(404).json({ message: `Album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  const {
    rows: [album],
  } = await db.query(`DELETE FROM Albums WHERE id = $1 RETURNING *`, [id]);

  try {
    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createAlbum, getAlbums, getAlbum, patchAlbum, deleteAlbum };
