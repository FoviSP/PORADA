import React, {useContext, useState, useEffect} from 'react'

import AppRouter from './components/AppRouter';
import MySpinner from './components/MySpinner';
import {BrowserRouter} from 'react-router-dom'

import {check} from './http/userAPI'

import {Context} from './index'
import MyNavbar from './components/MyNavbar'

function App() {
  const {userStorage} = useContext(Context)
  const [loading,setLoading] = useState(true)


  useEffect(()=>{
      check().then(data => {
        userStorage.setUser(data)
        userStorage.setAuth(true)

    }).finally(() => setLoading(false))
  }, [])

  if(loading){
    return (
      <MySpinner/>
    )
  }

  return (
    <BrowserRouter>

    <MyNavbar/>

      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
