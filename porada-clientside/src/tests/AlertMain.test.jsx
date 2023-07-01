import React from 'react'

import { render, screen } from '@testing-library/react'

import AlertMain from '../components/AlertMain'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams({ noPage: 'true' })],
}));

describe('AlertMain testing', () => {
	it('Correct list', ()=>{
		render(
			<AlertMain/>
		)
		expect(screen.queryByText(/Помилка сторінки не існує/)).toBeInTheDocument()
		expect(screen.queryByText(/Упс! Ви перейшли на неіснуючу сторінку, ми Вас перевели на головну сторінку/)).toBeInTheDocument()
	})
})