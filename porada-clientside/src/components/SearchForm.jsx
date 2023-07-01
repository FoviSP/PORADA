import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";

import { SEARCH_ROUTE } from '../utils/consts'

const SearchForm = () => {

	const navigate = useNavigate() 

	const navSearch = (e) => {
		e.preventDefault();
		const sp = e.target.elements[0].value.split('/');
		navigate(SEARCH_ROUTE+'?query='+(sp[0] || '')+'&'+'tags='+(sp[1] || ''))
	}


	return(
		<Form onSubmit={navSearch} style={{
			display: 'flex',
			width: '86%'
		}}>
            <Form.Control
            	style={{width: '45%', margin: '0 5px'}}
				type="search"
				placeholder="Пошук..."
            />
          	<Button
          		style={{margin: '0 5px'}}
          		variant="outline-primary"
          		type="submit"
          	>
          		Знайти
          	</Button>

		</Form>
	)
}

export default SearchForm