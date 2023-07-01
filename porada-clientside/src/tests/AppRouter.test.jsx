import React from 'react'

import { render, fireEvent, screen } from '@testing-library/react'

import AppRouter from '../components/AppRouter'

import {BrowserRouter as Router} from 'react-router-dom'

import { Context } from "../index";

import UserStorage from '../storages/userStorage';


const renderAppRouter = () => {
	return(render(
			<Router>
			<Context.Provider value={{userStorage: new UserStorage()}}>
				<AppRouter/>
			</Context.Provider>
			</Router>
		))
}

describe('AppRouter testing Main', () =>{
	it('Main page', () =>{

		renderAppRouter()
		expect(screen.getByText('ПОРАДА')).toBeInTheDocument()
		expect(screen.getByText('Про нас')).toBeInTheDocument()
		expect(screen.getByText('Знайти')).toBeInTheDocument()
		expect(screen.getByText('Увійти')).toBeInTheDocument()
		expect(screen.getByText('Актуальні питання')).toBeInTheDocument()
		expect(screen.getByText('Останні теги')).toBeInTheDocument()
	})
})

describe('AppRouter testing Auth', () =>{
	it('Login page', () =>{

		renderAppRouter()
		fireEvent.click(screen.getByText('Увійти'))
		expect(screen.getByText('Авторизація')).toBeInTheDocument()
		expect(screen.getByText('Пошта:')).toBeInTheDocument()
		expect(screen.getByText('Пароль:')).toBeInTheDocument()
		expect(screen.getByText('Авторизуватися')).toBeInTheDocument()

	})

	it('Register page', () =>{

		renderAppRouter()
		fireEvent.click(screen.getByText('Увійти'))
		fireEvent.click(screen.getByText('зареєструйтеся'))
		expect(screen.getByText('Реєстрація')).toBeInTheDocument()
		expect(screen.getByText('Нікнейм:')).toBeInTheDocument()
		expect(screen.getByText('Пошта:')).toBeInTheDocument()
		expect(screen.getByText('Пароль:')).toBeInTheDocument()
		expect(screen.getByText('Підтвердження паролю:')).toBeInTheDocument()
		expect(screen.getByText('Опишіть себе:')).toBeInTheDocument()
		expect(screen.getByText('Завантажте аватар:')).toBeInTheDocument()
		expect(screen.getByText('Зареєструватися')).toBeInTheDocument()
	})
})

describe('AppRouter testing Search', () =>{
	it('Search page', () =>{

		renderAppRouter()
		fireEvent.click(screen.getByText('Знайти'))
		expect(screen.getByText('Пошук постів')).toBeInTheDocument()
		expect(screen.getByText('Знайти по назві')).toBeInTheDocument()

	})
})