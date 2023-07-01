import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import CommentForm from '../components/CommentForm'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';

describe('CommentForm testing', () =>{
	it('Comments form', () =>{
		render(
			<CommentForm userId pageId comments callBackComment/>
			)
		expect(screen.getByText('Текст вашого комментаря:')).toBeInTheDocument()
		expect(screen.getByText('Відправити комментар')).toBeInTheDocument()
	})
})
