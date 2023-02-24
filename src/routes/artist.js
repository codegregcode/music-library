const express = require('express');
const artistController = require('../controllers/artist');
const artistUpdater = require('../controllers/artist-update');

const router = express.Router();

router.post('/', artistController.createArtist);
router.get('/', artistController.getArtists);
router.get('/:id', artistController.getArtist);
router.put('/:id', artistUpdater.putArtist);
router.patch('/:id', artistUpdater.patchArtist);
router.delete('/:id', artistController.deleteArtist);

module.exports = router;
