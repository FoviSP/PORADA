import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import FootNavbar from '../components/FootNavbar'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('FootNavbar testing', () =>{
	it('Navbar', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<FootNavbar/>
			</Context.Provider>
			</Router>
			)
		expect(screen.getByText('ПОРАДА')).toBeInTheDocument()
		expect(screen.getByText('Про нас')).toBeInTheDocument()
		expect(screen.getByText('Знайти')).toBeInTheDocument()
		expect(screen.getByText('Увійти')).toBeInTheDocument()

	})
})
