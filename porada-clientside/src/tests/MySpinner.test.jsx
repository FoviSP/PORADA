import React from 'react'
import { render, screen } from '@testing-library/react'
import MySpinner from '../components/MySpinner'

describe('MySpinner testing', () =>{
	it('MySpinner', () =>{
		render(
			<MySpinner/>
			)
	})
})
