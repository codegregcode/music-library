const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Read Artists', () => {
  let artists;
  let albums;
  beforeEach(async () => {
    const responses = await Promise.all([
      db.query(
        'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
        ['Sly & The Family Stone', 'funk/soul']
      ),
      db.query(
        'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
        ['Quasimoto', 'hip hop']
      ),
      db.query(
        'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
        ['Sons of Kemet', 'jazz']
      ),
    ]);

    artists = responses.map(({ rows }) => rows[0]);

    const albumsData = await Promise.all([
      db.query(
        'INSERT INTO Albums (name, year, artistid) VALUES ($1, $2, $3) RETURNING *',
        ['Theres a riot goin on', 1971, artists[0].id]
      ),
      db.query(
        'INSERT INTO Albums (name, year, artistid) VALUES ($1, $2, $3) RETURNING *',
        ['Fresh', 1973, artists[0].id]
      ),
    ]);

    albums = albumsData.map(({ rows }) => rows[0]);
  });

  describe('GET /artists', () => {
    it('returns all artist records in the database', async () => {
      const { status, body } = await request(app).get('/artists').send();

      expect(status).to.equal(200);
      expect(body.length).to.equal(3);

      body.forEach((artistRecord) => {
        const expected = artists.find((a) => a.id === artistRecord.id);

        expect(artistRecord).to.deep.equal(expected);
      });
    });
  });

  describe('GET /artists/{id}', () => {
    it('returns the artist with the correct id', async () => {
      const { status, body } = await request(app)
        .get(`/artists/${artists[0].id}`)
        .send();

      expect(status).to.equal(200);
      expect(body).to.deep.equal(artists[0]);
    });

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app)
        .get('/artists/999999999')
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('artist 999999999 does not exist');
    });
  });

  describe('GET /artists/{id}/albums', () => {
    it('returns all albums related to id of artist', async () => {
      const { status, body } = await request(app)
        .get(`/artists/${artists[0].id}/albums`)
        .send();

      expect(status).to.equal(200);
      expect(body).to.deep.equal(albums);
    });
  });
});
