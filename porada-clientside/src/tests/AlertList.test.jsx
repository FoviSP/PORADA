import React from 'react'

import { render, screen } from '@testing-library/react'

import AlertList from '../components/AlertList'

describe('AlertList testing', () => {
	it('Correct list', ()=>{
		const errors = [
			{
				msg: 'test'
			},
			{
				msg: 'second test'
			},
			{
				msg: 'third'
			},
			{
				msg: 'test4'
			}
		]
		const { getByText } = render(<AlertList errors={errors}/>)
		errors.map((elem, index)=>{
			expect(getByText(elem.msg)).toBeInTheDocument()
		})
	})
})