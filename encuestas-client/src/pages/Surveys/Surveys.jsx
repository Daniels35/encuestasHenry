import React, { useEffect, useState } from 'react';
import { formatDate, capitalizeFirstLetter } from '../../components/utils/utils';
import { Link } from 'react-router-dom';
import './Surveys.css'

function Surveys() {
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Datos encuestas: ", encuestas);

  useEffect(() => {
    fetch('https://daniels35.com/encuestas')
      .then((response) => response.json())
      .then((data) => {
        setEncuestas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las encuestas:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Surveys-contenedor">
      <h2>Encuestas</h2>
      {loading ? (
        <p>Cargando encuestas...</p>
      ) : (
        encuestas.length > 0 ? (
          <ul className="Surveys-list">
            {encuestas.map((encuesta) => (
              <li key={encuesta.id} className="Surveys-item">
                <Link to={`/encuestas/${encuesta.id}`} className="Surveys-link">
                  <span>Nombre:</span>
                  <p>{encuesta.full_name}</p>
                  <span>Lenguaje favorito:</span>
                  <p>{capitalizeFirstLetter(encuesta.preferred_language)}</p>
                  <span>Fecha de creación:</span>
                  <p>{formatDate(encuesta.created_at)}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay encuestas disponibles.</p>
        )
      )}
    </div>
  );
}

export default Surveys;
