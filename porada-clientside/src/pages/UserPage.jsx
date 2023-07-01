import React, {useState, useEffect, useContext} from 'react'

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import { useParams, useNavigate } from 'react-router-dom';

import MySpinner from '../components/MySpinner';
import UserForm from '../components/UserForm';
import CommentCards from '../components/CommentCards';
import CommentForm from '../components/CommentForm';
import ScoreForm from '../components/ScoreForm';

import {getPage,removePage} from '../http/pageAPI'
import {Context} from '../index'

import {HOME_ROUTE} from '../utils/consts'

import dateformat from '../utils/dateformat'

const UserPage = () => {

	const {id} = useParams()
	const navigate = useNavigate()
	const {userStorage} = useContext(Context)
	const [data, setData] = useState({})

	useEffect(() => {
		getPage(id).then(pageData=>{
	   		setData(pageData[0])
	   	})
	},[])


	function destroyPage(){
		removePage(id)
		navigate(HOME_ROUTE)
	}


	if(data === undefined){
		return (
		<Container className="mt-3">
			<h3>Сторінки не існує</h3>
		</Container>
		)
	}

	if(data.id === undefined){
		return(
			<MySpinner/>
		)
	}

	return(
		<Container>
			<Card body className="mt-3">
				<div className="d-flex">
					<ScoreForm author={data.userId} pageId={data.id}/>
					<div>
						<Card.Title>{data.name} <Badge style={{color: 'white'}} bg={data.userId === userStorage.user.id
						? "primary" : "secondary"}>#{data.user.username}</Badge>
						{userStorage.user.role === 'ADMIN'
						&&
							<Button
								onClick={destroyPage}
								variant='danger'
								style={{margin: '0 15px'}}
								size='sm'
							>
							Видалити
							</Button>
						}			
						</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{dateformat(data.createdAt)}</Card.Subtitle>
						<hr/>
						<p>{data.description}</p>
						{data.taglists.map((elem, index) => {
							return <><Badge bg="light" text="dark">{elem.name}</Badge> </>
						})}
					</div>
				</div>
			</Card>
			<CommentCards userId={userStorage.user.id} pageId={data.id} />
		</Container>
	)
}

export default UserPage