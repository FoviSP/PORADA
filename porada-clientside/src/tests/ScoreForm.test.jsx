import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ScoreForm from '../components/ScoreForm'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('PageList testing', () =>{
	it('PageList', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<ScoreForm pageId author/>
			</Context.Provider>
			</Router>
			)	
	})
})
