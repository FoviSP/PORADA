import React, {useState} from 'react'

import { useSearchParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

import PageList from '../components/PageList';

const SearchPage = () => {

	const [searchParams, setSearchParams] = useSearchParams();

	return(
		<Container>
		<Card className="mt-3">
			<Card.Body>
			<Card.Title>
				Пошук постів
			</Card.Title>
			<Form>
				<Form.Group className="d-flex mb-2">
					<InputGroup>
						<InputGroup.Text>
							Знайти по назві
						</InputGroup.Text>
						<Form.Control type="text" onChange={(e) => setSearchParams({...searchParams, query: e.target.value})} value={searchParams.get('query')} placeholder="Як змістити елемент..." />
					</InputGroup>
				</Form.Group>

			</Form>
			</Card.Body>
			<Card.Body>
		        <PageList contains={searchParams.get('query').toLowerCase()}/>
	      	</Card.Body>
		</Card>
		</Container>
	)
}

export default SearchPage