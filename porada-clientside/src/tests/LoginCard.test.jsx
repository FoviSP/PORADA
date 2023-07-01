import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import LoginCard from '../components/LoginCard'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('LoginCard testing', () =>{
	it('LoginCard', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<LoginCard/>
			</Context.Provider>
			</Router>
			)
		expect(screen.getByText('Авторизація')).toBeInTheDocument()
	})
})
