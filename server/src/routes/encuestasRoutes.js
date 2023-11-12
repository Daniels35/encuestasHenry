const express = require('express');
const router = express.Router();
const { recibirEncuesta, getEncuestas, getEncuestaPorId, updateEncuesta, deleteEncuesta } = require('../services/encuestaService');

router.post('/recibir-encuesta', recibirEncuesta);
router.get('/encuestas', getEncuestas);
router.get('/encuestas/:id', getEncuestaPorId);
router.put('/encuestas/:id', updateEncuesta);
router.delete('/encuestas/:id', deleteEncuesta);

module.exports = router;
