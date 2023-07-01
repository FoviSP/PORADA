import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import PageCard from '../components/PageCard'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('PageCard testing', () =>{
	it('PageCard', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<PageCard own page={{user:{username:'I am User'}}}/>
			</Context.Provider>
			</Router>
			)	
		expect(screen.queryByText(/I am User/)).toBeInTheDocument()
	})
})
