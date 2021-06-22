import React from 'react';

const authData ={
    _id: '',
    name: '',
    language: '',
    age: 2,
    token: '',
    changeProfile: (name, age, language) =>{
    setAuthData({name, age, language})
  }
}

export {authData}

export default React.createContext(authData)

