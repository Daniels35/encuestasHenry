const db = require('../config/db');
const uuid = require('uuid');

class EncuestaModel {
  static createTable(callback) {
    const createEncuestasTableSql = `
      CREATE TABLE IF NOT EXISTS encuestas (
        id VARCHAR(36) DEFAULT (UUID()),
        full_name VARCHAR(255),
        email VARCHAR(255),
        phone_number VARCHAR(255),
        start_date DATE,
        preferred_language VARCHAR(255),
        how_found VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        newsletter_subscription BOOLEAN,
        PRIMARY KEY (id)
      );
    `;

    db.query(createEncuestasTableSql, (err, result) => {
      if (err) throw err;
      console.log('Tabla "encuestas" verificada o creada');
      callback();
    });
  }

  static insertEncuesta(encuesta, callback) {
    const {
      full_name,
      email,
      phone_number,
      start_date,
      preferred_language,
      how_found,
      newsletter_subscription,
    } = encuesta;

    const id = uuid.v4();

    const query = `
      INSERT INTO encuestas
      (id, full_name, email, phone_number, start_date, preferred_language, how_found, newsletter_subscription)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      id,
      full_name,
      email,
      phone_number,
      start_date,
      preferred_language,
      how_found,
      newsletter_subscription,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error al insertar en la base de datos:', err);
        callback({ error: 'Error al guardar la encuesta en la base de datos' });
      } else {
        console.log('Encuesta guardada en la base de datos.', id);
        callback(null, { message: 'Encuesta guardada con éxito.', insertedId: id });
      }
    });
  }

  static getEncuestasPorCorreo(correo, callback) {
    const query = 'SELECT * FROM encuestas WHERE email = ?';

    db.query(query, [correo], (err, results) => {
      if (err) {
        console.error('Error al recuperar las encuestas:', err);
        callback({ error: 'Error al recuperar las encuestas.' });
      } else {
        callback(null, results);
      }
    });
  }

  static getAllEncuestas(callback) {
    const query = 'SELECT * FROM encuestas';

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al recuperar las encuestas:', err);
        callback({ error: 'Error al recuperar las encuestas' });
      } else {
        callback(null, results);
      }
    });
  }

  static getEncuestaById(encuestaId, callback) {
    const query = 'SELECT * FROM encuestas WHERE id = ?';

    db.query(query, [encuestaId], (err, result) => {
      if (err) {
        console.error('Error al recuperar la encuesta por ID:', err);
        callback({ error: 'Error al recuperar la encuesta por ID.' });
      } else {
        if (result.length === 0) {
          callback({ message: 'No se encontró ninguna encuesta con el ID proporcionado' });
        } else {
          callback(null, result[0]);
        }
      }
    });
  }

  static deleteEncuestaById(encuestaId, callback) {
    const deleteQuery = 'DELETE FROM encuestas WHERE id = ?';

    db.query(deleteQuery, [encuestaId], (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error('Error al eliminar la encuesta:', deleteErr);
        callback({ error: 'Error al eliminar la encuesta' });
      } else if (deleteResult.affectedRows === 0) {
        callback({ message: 'No se encontró ninguna encuesta con el ID proporcionado' });
      } else {
        callback(null, { message: 'Encuesta eliminada con éxito' });
      }
    });
  }

  static verificarExistenciaEncuesta(encuestaId, callback) {
    const verificacionQuery = 'SELECT id FROM encuestas WHERE id = ?';

    db.query(verificacionQuery, [encuestaId], (verificacionErr, verificacionResult) => {
      if (verificacionErr) {
        console.error('Error al verificar la existencia de la encuesta:', verificacionErr);
        callback({ error: 'Error al verificar la existencia de la encuesta' });
      } else if (verificacionResult.length === 0) {
        callback({ message: 'No se encontró ninguna encuesta con el ID proporcionado' });
      } else {
        callback(null);
      }
    });
  }

  static actualizarEncuesta(encuestaId, nuevaEncuesta, callback) {
    const updateQuery = `
      UPDATE encuestas
      SET
        full_name = COALESCE(?, full_name),
        email = COALESCE(?, email),
        phone_number = COALESCE(?, phone_number),
        start_date = COALESCE(?, start_date),
        preferred_language = COALESCE(?, preferred_language),
        how_found = COALESCE(?, how_found),
        newsletter_subscription = COALESCE(?, newsletter_subscription)
      WHERE id = ?
    `;

    const updateValues = [
      nuevaEncuesta.full_name || null,
      nuevaEncuesta.email || null,
      nuevaEncuesta.phone_number || null,
      nuevaEncuesta.start_date || null,
      nuevaEncuesta.preferred_language || null,
      nuevaEncuesta.how_found || null,
      nuevaEncuesta.newsletter_subscription || null,
      encuestaId,
    ];

    db.query(updateQuery, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Error al actualizar la encuesta:', updateErr);
        callback({ error: 'Error al actualizar la encuesta' });
      } else {
        callback(null, { message: 'Encuesta actualizada con éxito' });
      }
    });
  }
}

module.exports = EncuestaModel;
