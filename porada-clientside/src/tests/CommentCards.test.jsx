import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import CommentCards from '../components/CommentCards'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';

describe('CommentCards testing', () =>{
	it('Comments list', () =>{
		render(
			<Context.Provider value={{userStorage: new UserStorage()}}>
				<CommentCards userId='-1' pageId='1'/>
			</Context.Provider>
			)
		expect(screen.queryByText('Коментарів поки що не має')).toBeInTheDocument()
	})
})
