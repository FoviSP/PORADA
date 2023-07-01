import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import MessageForm from '../components/MessageForm'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('MessageForm testing', () =>{
	it('MessageForm', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<MessageForm/>
			</Context.Provider>
			</Router>
			)
		expect(screen.getByText('Текст вашого повідомлення:')).toBeInTheDocument()
		expect(screen.getByText('Відправити')).toBeInTheDocument()
	})
})
