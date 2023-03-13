CREATE TABLE Albums (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  artistId INT NOT NULL,
  CONSTRAINT FK_artist_id FOREIGN KEY (artistId)
  REFERENCES artists(id)
);