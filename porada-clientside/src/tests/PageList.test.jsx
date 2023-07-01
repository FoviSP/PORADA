import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import PageList from '../components/PageList'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('PageList testing', () =>{
	it('PageList', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<PageList userId contains limit/>
			</Context.Provider>
			</Router>
			)	
	})
})
