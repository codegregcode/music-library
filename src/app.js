const express = require('express');
const app = express();
const artistRouter = require('./routes/artist');
app.use(express.json());

app.use('/artists', artistRouter);

module.exports = app;
