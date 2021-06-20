import React from 'react';

const authData ={
    nombre: 'Mariano',
    idioma: 'España',
    edad: 25,
  
    cambioPerfil: (nombre,edad,idioma) =>{
    setAuthData({nombre,edad,idioma})
  }
}

export {authData}

export default React.createContext(authData)

