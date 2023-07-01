import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import NewPageModal from '../components/NewPageModal'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('NewPageModal testing', () =>{
	it('NewPageModal', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<NewPageModal/>
			</Context.Provider>
			</Router>
			)
		
	})
})
