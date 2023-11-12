const EncuestaModel = require('../models/EncuestaModel');
const emailService = require('../services/emailService');

const recibirEncuesta = (req, res) => {
  const encuesta = req.body;

  EncuestaModel.insertEncuesta(encuesta, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al guardar la encuesta en la base de datos' });
    }

    res.status(200).json({ message: 'Encuesta guardada con éxito.', insertedId: result.insertedId });
    emailService.enviarCorreo(encuesta, result.insertedId);
  });
};

const getEncuestasPorCorreo = (req, res) => {
  const correo = req.params.correo;

  EncuestaModel.getEncuestasPorCorreo(correo, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al recuperar las encuestas.' });
    }

    res.status(200).json(results);
  });
};

const getAllEncuestas = (req, res) => {
  EncuestaModel.getAllEncuestas((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al recuperar las encuestas' });
    }

    res.status(200).json(results);
  });
};

const getEncuestaById = (req, res) => {
  const encuestaId = req.params.id;

  EncuestaModel.getEncuestaById(encuestaId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al recuperar la encuesta por ID.' });
    }

    if (result.message) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  });
};

const verificarExistenciaYActualizar = (req, res) => {
  const encuestaId = req.params.id;
  const nuevaEncuesta = req.body;

  EncuestaModel.verificarExistenciaEncuesta(encuestaId, (verificacionErr) => {
    if (verificacionErr) {
      return res.status(500).json(verificacionErr);
    }

    EncuestaModel.actualizarEncuesta(encuestaId, nuevaEncuesta, (updateErr, updateResult) => {
      if (updateErr) {
        return res.status(500).json(updateErr);
      }

      res.status(200).json(updateResult);
    });
  });
};

module.exports = {
  getAllEncuestas,
  getEncuestaById,
  getEncuestasPorCorreo,
  verificarExistenciaYActualizar,
  recibirEncuesta,
};
