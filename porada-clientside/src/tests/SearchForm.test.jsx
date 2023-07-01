import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SearchForm from '../components/SearchForm'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('SearchForm testing', () =>{
	it('SearchForm', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<SearchForm/>
			</Context.Provider>
			</Router>
			)	
	})
})
