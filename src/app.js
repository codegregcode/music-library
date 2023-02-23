const express = require('express');
const app = express();
const artistRouter = require('./routes/artist');
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World!ʕ•́ᴥ•̀ʔっ');
});

app.use('/artists', artistRouter);

module.exports = app;
