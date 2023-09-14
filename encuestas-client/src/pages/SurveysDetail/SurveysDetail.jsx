import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { AiFillEdit, AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { formatDate, formatDate2, capitalizeFirstLetter, maskEmail, maskPhoneNumber } from '../../components/utils/utils';
import  PhoneInput  from  'react-phone-number-input'; 
import Modal from '../../components/Modal/Modal';
import  'react-phone-number-input/style.css'; 
import './SurveysDetail.css';

function SurveysDetail() {
  const { id } = useParams();
  const [encuesta, setEncuesta] = useState(null);
  const location = useLocation();
  let isRedirigido = location.state && location.state.redirigido;

  console.log("El usuario viene de inicio: ", isRedirigido);

    const [isNameEditMode, setIsNameEditMode] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [isEmailEditMode, setIsEmailEditMode] = useState(false);
    const [editedEmail, setEditedEmail] = useState('');
    const [isNumberEditMode, setIsNumberEditMode] = useState(false);
    const [editedNumber, setEditedNumber] = useState('');
    const [isStartDateEditMode, setIsStartDateEditMode] = useState(false);
    const [editedStartDate, setEditedStartDate] = useState('');
    const [isLanguageEditMode, setIsLanguageEditMode] = useState(false);
    const [editedLanguage, setEditedLanguage] =  useState('');
    const [isHowFoundEditMode, setIsHowFoundEditMode] = useState(false);
    const [editedHowFound, setEditedHowFound] = useState('');
    const [isNewsletterEditMode, setIsNewsletterEditMode] = useState(false);
    const [editedNewsletterSubscription, setEditedNewsletterSubscription] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const loadEncuestaDetails = async () => {
      try {
        const response = await fetch(`https://daniels35.com/encuestas/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles de la encuesta');
        }
        const data = await response.json();
        setEncuesta(data);
      } catch (error) {
        console.error('Error al obtener los detalles de la encuesta:', error);
      }
    };

    useEffect(() => {
      loadEncuestaDetails();
    }, [id]);

   const saveChanges = async () => {
    try {
      await fetch(`https://daniels35.com/encuestas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: editedName,
          email: editedEmail,
          phone_number: editedNumber,
          start_date: editedStartDate,
          preferred_language: editedLanguage,
          how_found: editedHowFound,
          newsletter_subscription: editedNewsletterSubscription, 
        }),
      });
      loadEncuestaDetails();
      setIsNameEditMode(false);
      setIsEmailEditMode(false);
      setIsNumberEditMode(false);
      setIsStartDateEditMode(false);
      setIsLanguageEditMode(false);
      setIsNewsletterEditMode(false);
      setIsHowFoundEditMode(false);
      window.alert("Información editada.")
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleCloseEdit = (variant) => {
    switch (variant) {
        case 'name':
          setIsNameEditMode(false);
            break;
        case 'email':
            setIsEmailEditMode(false);
            break;
        case 'number':
          setIsNumberEditMode(false);
            break;
        case 'startDate':
          setIsStartDateEditMode(false);
             break;
        case 'language':
        setIsLanguageEditMode(false);
        break;
        case 'how_found':
        setIsHowFoundEditMode(false);
        break;
        case 'newsletter':
        setIsNewsletterEditMode(false);
        break;
    }
  }

  return (
    
    <div className="SurveysDetail-container">
      <h2 className="SurveysDetail-heading">Detalles de la Encuesta</h2>
      {encuesta ? (
        <div className="SurveysDetail-details">
          {isNameEditMode ? (
            <>
              <p>Nombre:</p>
            <div className='surveys-contenedor-edit'>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <AiFillHeart 
              className='iconsSurveys' 
              onClick={saveChanges}
               />
              <h2 className="surveys-button-close" onClick={() => handleCloseEdit('name')}>X</h2>
            </ div>
                </>
          ) : (
            <>
              <p>Nombre:</p>
              <span>{encuesta.full_name}</span>
              {isRedirigido &&(< AiFillEdit
                className='iconsSurveys'
                onClick={() => {
                  setIsNameEditMode(true);
                  setEditedName(encuesta.full_name);
                }}
              />)}
            </>
          )}

          {isEmailEditMode ? (
            <>
              <p>Correo Electrónico:</p>
            <div className='surveys-contenedor-edit'>
              <input
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                />
              <AiFillHeart className='iconsSurveys' onClick={saveChanges} />
              <h2 className="surveys-button-close" onClick={() => handleCloseEdit('email')}>X</h2>
            </ div>
                </>
          ) : (
            <>
              <p>Correo Electrónico:</p>
              <span>{!isRedirigido ? maskEmail(encuesta.email) : encuesta.email}</span>
              {isRedirigido && (< AiFillEdit 
              className='iconsSurveys' 
              onClick={() => {setIsEmailEditMode(true);
                setEditedEmail(encuesta.email);
                }}/>)}
            </>
          )}

          {isNumberEditMode ? (
            <>
              <p>Número de teléfono:</p>
              <div className='surveys-contenedor-edit'>
                <PhoneInput
                  country={'us'}
                  value={editedNumber}
                  onChange={(value) => setEditedNumber(value)}
                />
                <AiFillHeart className='iconsSurveys' onClick={saveChanges} />
                <h2 className="surveys-button-close" onClick={() => handleCloseEdit('number')}>X</h2>
              </div>
            </>
          ) : (
            <>
              <p>Número de teléfono:</p>
              <span>{!isRedirigido ? maskPhoneNumber(encuesta.phone_number) : encuesta.phone_number}</span>
              { isRedirigido &&(<AiFillEdit 
                className='iconsSurveys' 
                onClick={() => {
                  setIsNumberEditMode(true);
                  setEditedNumber(encuesta.phone_number);
                }}
              />)}
            </>
          )}


            {isStartDateEditMode ? (
              <>
                <p>Fecha de inicio:</p>
              <div className='surveys-contenedor-edit'>
                <input
                  type="date"
                  value={editedStartDate}
                  onChange={(e) => setEditedStartDate(e.target.value)}
                  />
                <AiFillHeart className='iconsSurveys' onClick={saveChanges} />
                <h2 className="surveys-button-close" onClick={() => handleCloseEdit('startDate')}>X</h2>
              </div>
                  </>
            ) : (
              <>
                <p>Fecha de inicio:</p>
                <span>{formatDate2(encuesta.start_date)}</span>
                {isRedirigido &&(< AiFillEdit 
                className='iconsSurveys' 
                onClick={() => {setIsStartDateEditMode(true);
                  setEditedStartDate(formatDate2(encuesta.start_date));
                }}/>)}
              </>
            )}
              {isLanguageEditMode ? (
                <>
                  <p>Idioma Preferido:</p>
                <div className='surveys-contenedor-edit'>
                  <select
                    value={editedLanguage}
                    onChange={(e) => setEditedLanguage(e.target.value)}
                    >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                  <AiFillHeart className='iconsSurveys' onClick={saveChanges} />
                  <h2 className="surveys-button-close" onClick={() => handleCloseEdit('language')}>X</h2>
                </div>
                    </>
              ) : (
                <>
                  <p>Idioma Preferido:</p>
                  <span>{capitalizeFirstLetter(isLanguageEditMode ? editedLanguage : encuesta.preferred_language)}</span>
                  {isRedirigido &&(< AiFillEdit 
                  className='iconsSurveys' 
                  onClick={() => {setIsLanguageEditMode(true);
                    setEditedLanguage(encuesta.preferred_language);
                  }}/>)}
                </>
              )}

              {isHowFoundEditMode ? (
                <>
                  <p>Cómo nos encontraste:</p>
                <div className='surveys-contenedor-edit'>
                  <div className='surveys-contenedor-edit-how'>
                  <div >
                    <label>
                      <input
                        type="radio"
                        value="friends"
                        checked={editedHowFound === 'friends'}
                        onChange={() => setEditedHowFound('friends')}
                      />
                      Friends
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="online_search"
                        checked={editedHowFound === 'online_search'}
                        onChange={() => setEditedHowFound('online_search')}
                        />
                      Online Search
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="advertisement"
                        checked={editedHowFound === 'advertisement'}
                        onChange={() => setEditedHowFound('advertisement')}
                        />
                      Advertisement
                    </label>
                  </div>
                  <AiFillHeart className='iconsSurveys radioSave' onClick={saveChanges} />
                  <h2 className="surveys-button-close radioClose" onClick={() => handleCloseEdit('how_found')}>X</h2>
                  </div>                
                </div>
                        </>
              ) : (
                <>
                  <p>Cómo nos encontraste:</p>
                  <span>{capitalizeFirstLetter(isHowFoundEditMode ? editedHowFound : encuesta.how_found)}</span>
                  { isRedirigido &&(< AiFillEdit 
                  className='iconsSurveys' 
                  onClick={() => {setIsHowFoundEditMode(true);
                    setEditedHowFound(encuesta.how_found);
                  }}/>)}
                </>
              )}

                {isNewsletterEditMode ? (
                  <>
                    <p>¿Desea recibir nuestro boletín informativo?</p>
                  <div className='surveys-contenedor-edit'>
                    <label>
                      <input
                        type="checkbox"
                        checked={editedNewsletterSubscription}
                        onChange={() => setEditedNewsletterSubscription(!editedNewsletterSubscription)}
                      />
                      Sí
                    </label>
                    <AiFillHeart className='iconsSurveys' onClick={saveChanges} />
                    <h2 className="surveys-button-close" onClick={() => handleCloseEdit('newsletter')}>X</h2>
                  </div>
                        </>
                ) : (
                  <>
                    <p>¿Desea recibir nuestro boletín informativo?</p>
                    <span>{editedNewsletterSubscription ? 'SI' : 'NO'}</span>
                    {isRedirigido && (< AiFillEdit className='iconsSurveys' onClick={() => setIsNewsletterEditMode(true)}/>)}
                  </>
                )}
          <p>Fecha: {formatDate(encuesta.created_at)}</p>
          {!isRedirigido && (
       <>
            <AiFillEdit className='button-surveyEdit-not' onClick={() => setIsModalVisible(true)}/>
            <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
              <h3>Enviar correo</h3>
              <p>
                Si envías tu correo electrónico y coincide con la encuesta, te enviaremos un enlace al correo para poder editar tu encuesta.
              </p>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={''}
                className='input-survey-modal'
              />
              <br></br>
              <button className='button-survey-modal' >Enviar</button>
            </Modal>

        </>
           )}
      
        </div>
      ) : (
        <p>Los detalles de la encuesta no están disponibles.</p>
      )}
     
      <Link to="/encuestasHenry/encuestas" className="SurveysDetail-link">Volver a la lista de encuestas</Link>
    </div>
  );
}

export default SurveysDetail;
