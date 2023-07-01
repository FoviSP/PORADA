import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStorage from './storages/userStorage';


const rootElement = document.getElementById('root') || document.createElement('div');
const root = ReactDOM.createRoot(rootElement);

export const Context = createContext()

root.render(
  <Context.Provider value={{
      userStorage: new UserStorage()
  }}>
    <App />
  </Context.Provider>
);
