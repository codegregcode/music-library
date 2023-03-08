const express = require('express');
const app = express();
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World!ʕ•́ᴥ•̀ʔっ');
});

app.use('/artists', artistRouter);
app.use('/artists', albumRouter);
app.use('/albums', albumRouter);

module.exports = app;
