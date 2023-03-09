const express = require('express');
const albumController = require('../controllers/album');
const albumUpdater = require('../controllers/album-update');

const router = express.Router();

router.post('/:id/albums', albumController.createAlbum);
router.get('/', albumController.getAlbums);
router.get('/:id', albumController.getAlbum);
router.get('/:id/albums/:id', albumController.getAlbum);
router.patch('/:id', albumUpdater.patchAlbum);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
