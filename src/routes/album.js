const express = require('express');
const albumController = require('../controllers/album');
const albumUpdater = require('../controllers/album-update');

const router = express.Router();

router.post('/artist/:id/albums/', albumController.createAlbum);
router.get('/albums/', albumController.getArtists);
router.get('/albums/:albumId', albumController.getArtist);
router.patch('/albums/:albumId', albumUpdater.patchArtist);
router.delete('/albums/:albumId', albumController.deleteArtist);

module.exports = router;
