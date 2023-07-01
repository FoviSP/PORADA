import React, {useState, useContext} from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import AlertList from './AlertList';
import Alert from 'react-bootstrap/Alert';

import {MAIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {Context} from '../index'

import {login} from '../http/userAPI'

import eyeoff from '../imgs/eyeoff.png'
import eyeon from '../imgs/eyeon.png'

const LoginCard = () => {
	const [showPassword, setShowPassword] = useState(false) 
	const navigate = useNavigate()
	const {userStorage} = useContext(Context)
	const [errors, setErrors] = useState([]) 
	const [searchParams,setSearchParams] = useSearchParams();

	const signIn = async (e) => {
		try{
			e.preventDefault()
			const elems = e.target.elements
			const data = await login(elems[0].value, elems[1].value);
			userStorage.setAuth(true)
			userStorage.setUser(data)
			navigate(MAIN_ROUTE)
		}catch(ee){
			setErrors(ee.response.data.errors)
		}
		
	}

	return (
		<Card style={{ width: '28rem' }}>
		{searchParams.get('submit') &&
		<Alert variant='success'>
			<div>
				<b>Підтвердження виконано</b>
			</div>
		    <p>
		    	Аккаунт успішно підтверджен, теперь можна авторизуватись
		    </p>
		</Alert>
		}
	    <Card.Body>
	        <Card.Title>Авторизація</Card.Title>
	        <Card.Subtitle className="mb-2 text-muted">
	        	або якщо зайшли вперше то <Card.Link as={Link} to={REGISTRATION_ROUTE}>зареєструйтеся</Card.Link>
	        </Card.Subtitle>
	        <Form onSubmit={signIn}>
	        	<Form.Group className="mb-3">
		        	<Form.Label>Пошта:</Form.Label>
		        	<Form.Control type="email" placeholder="моя123пошта@gmail.com..."/>
		        	<Form.Text className="text-muted">
			          Ми ніколи і нікому не передамо вашу електронну адресу.
			        </Form.Text>
		        </Form.Group>
		        <Form.Group className="mb-3">
		        	<Form.Label>Пароль:</Form.Label>
		        	<InputGroup>
		        		<Form.Control type={showPassword ? 'text' : 'password'} placeholder="Введіть пароль..."/>
		        		<InputGroup.Text onClick={(e) => setShowPassword(!showPassword)}>
		        			<img alt="Показати\Скрити пароль" draggable="false" width='17px' src={showPassword ? eyeon : eyeoff} />
		        		</InputGroup.Text>
		        	</InputGroup>
				</Form.Group>
				
				<Button type="submit" variant="primary">
					Авторизуватися
				</Button>
	        </Form>
		</Card.Body>
		<AlertList errors={errors}/>
    	</Card>
	)
}

export default LoginCard