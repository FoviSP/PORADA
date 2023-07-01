import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Selector from '../components/Selector'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';
import {BrowserRouter as Router} from 'react-router-dom'

describe('Selector testing', () =>{
	it('Selector', () =>{
		render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
			<Selector
					buttons={['Ваші сторінки', 'Особисті повідомлення']}
					components={[
						<div/>,
						<div/>]}
				/>
			</Context.Provider>
			</Router>
			)	
		expect(screen.getByText('Ваші сторінки')).toBeInTheDocument()
		expect(screen.getByText('Особисті повідомлення')).toBeInTheDocument()

	})
})
