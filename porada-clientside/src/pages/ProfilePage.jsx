import React from 'react'

import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import UserForm from '../components/UserForm'; 

const ProfilePage = () => {

	const {id} = useParams()

	

	return(
		<div className="d-flex justify-content-center m-3">
		<Card style={{width: '30%', maxWidth: '500px'}} body>
			<Container>
				<UserForm userId={id}/>
				<hr/>
			</Container>
		</Card>
		</div>
	)
}

export default ProfilePage