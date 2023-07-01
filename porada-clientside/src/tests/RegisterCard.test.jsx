import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import RegisterCard from '../components/RegisterCard'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('LoginCard testing', () =>{
	it('LoginCard', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<RegisterCard/>
			</Context.Provider>
			</Router>
			)
		expect(screen.getByText('Реєстрація')).toBeInTheDocument()
	})
})
