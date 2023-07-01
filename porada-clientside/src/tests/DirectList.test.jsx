import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import DirectList from '../components/DirectList'
import { Context } from "../index";
import UserStorage from '../storages/userStorage';

describe('DirectList testing', () =>{
	it('list', () =>{
		render(
			<DirectList userId/>
			)
		expect(screen.queryByText('Приватних повідомлень не знайдено')).toBeInTheDocument()
	})
})
