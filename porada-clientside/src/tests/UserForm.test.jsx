import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import UserForm from '../components/UserForm'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('UserForm testing', () =>{
	it('UserForm', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<UserForm/>
			</Context.Provider>
			</Router>
			)	
	})
})
