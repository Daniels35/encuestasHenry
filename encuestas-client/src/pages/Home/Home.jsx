import React, { useState } from 'react';
import  PhoneInput  from  'react-phone-number-input'; 
import  'react-phone-number-input/style.css'; 
import surveyData from './data';
import './Home.css';
import {  useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    start_date: '',
    preferred_language: '',
    how_found: '',
    newsletter_subscription: false,
  });

  const surveyForm = surveyData;
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      console.log(`Campo ${name} marcado: ${checked}`);
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      console.log(`Campo ${name} valor cambiado a: ${value}`);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://daniels35.com/recibir-encuesta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Encuesta enviada con éxito');
        window.alert("Encuesta enviada con éxito, pronto recibirás un correo electrónico con tus respuestas, te vamos a redirigir a tu encuesta.");
        const data = await response.json();
        navigate(`/encuestasHenry/encuestas/${data.insertedId}`, { state: { redirigido: true } });
        console.log("Id de la encuesta: ", data.insertedId)
      } else {
        console.error('Error al enviar la encuesta al servidor');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      return;
    }
    console.log("Datos del formulario enviados:", formData);
    clearForm();
  };

  const clearForm = () => {
    console.log("Clic en borrar");
    const fieldsToPreserve = ['how_found', 'newsletter_subscription'];
    const emptyFormData = {};
    for (const key in formData) {
      if (fieldsToPreserve.includes(key)) {
        emptyFormData[key] = formData[key];
      } else {
        emptyFormData[key] = '';
      }
    }
    setFormData(emptyFormData);
    console.log(formData);
  };

  return (
    <div className='Home-contenedor'>
      <h2>Formulario de Encuesta</h2>
      <form onSubmit={handleSubmit} className='form-home-container'>
        {surveyForm.items.map((item, index) => (
          <div key={index}>
            {item.type === "submit" ? (
              <button type="submit">{item.label}</button>
            ) : (
              <div className='imputs-home-container'>
                <label>{item.label}</label>
                {item.type === "text" ? (
                  <input
                    placeholder="Nombre completo"
                    type={item.type}
                    name={item.name}
                    required={item.required}
                    onChange={handleInputChange}
                    value={formData[item.name] || ''}
                    maxlength="20"
                  />
                ) : item.name === "email" ? (
                  <input
                    placeholder="Correo electrónico"
                    type="email"
                    name={item.name}
                    required={item.required}
                    onChange={handleInputChange}
                    value={formData[item.name] || ''}
                    maxlength="30"
                  />
                ) : item.type === "tel" ? (
                  <div className='input-home-phone-container'>
                    <PhoneInput
                      className='input-home-phone'
                      placeholder="Número de teléfono"
                      name={item.name}
                      value={formData[item.name] || ''}
                      required={item.required}
                      onChange={(phone_number) => setFormData({ ...formData, phone_number })}
                      maxlength="17"
                    />
                  </div>
                ) : item.type === "date" ? (
                  <input
                    type="date"
                    name={item.name}
                    onChange={handleInputChange}
                    value={formData[item.name] || ''}
                  />
                ) : item.type === "select" ? (
                  <select
                    name={item.name}
                    required={item.required}
                    onChange={handleInputChange}
                    value={formData[item.name] || ''}
                  >
                    <option value="">Seleccionar...</option>
                    {item.options.map((option, optionIndex) => (
                      <option
                        key={optionIndex}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : item.type === "radio" ? (
                  <div className='optionHow-home-container'>
                    {item.options.map((option, optionIndex) => (
                      <label key={optionIndex}>
                        <input
                          type="radio"
                          name={item.name}
                          value={option.value}
                          required={item.required}
                          onChange={handleInputChange}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                ) : item.type === "checkbox" ? (
                  <label>
                    <input
                      type="checkbox"
                      name={item.name}
                      onChange={handleInputChange}
                    />
                  </label>
                ) : null}
              </div>
            )}
          </div>
        ))}
        <div className='button-home-clearForm-container'>
        <span className='button-home-clearForm' onClick={clearForm}>Limpiar</span>
        </div>
      </form>
    </div>
  );  
}

export default Home;