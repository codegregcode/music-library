const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Create album', () => {
  let artist;
  beforeEach(async () => {
    const responses = await Promise.all([
      db.query(
        'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
        ['King Gizzard & The Lizard Wizard', 'rock']
      ),
    ]);

    artist = responses.map(({ rows }) => rows[0]);
  });

  describe('POST', () => {
    it('creates an album in the database', async () => {
      const { status, body } = await request(app)
        .post(`/artists/${artist[0].id}/albums`)
        .send({
          name: 'Laminated Denim',
          year: 2022,
        });

      expect(status).to.equal(201);
      expect(body.name).to.equal('Laminated Denim');
      expect(body.year).to.equal(2022);

      const {
        rows: [albumsData],
      } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
      expect(albumsData.name).to.equal('Laminated Denim');
      expect(albumsData.year).to.equal(2022);
      expect(albumsData.id).to.equal(artist[0].id);
    });
  });
});
