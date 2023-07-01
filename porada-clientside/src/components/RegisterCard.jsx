import React, {useState} from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import AlertList from './AlertList';

import {registration} from '../http/userAPI'
import {LOGIN_ROUTE} from '../utils/consts'

import eyeoff from '../imgs/eyeoff.png'
import eyeon from '../imgs/eyeon.png'

import { useSearchParams } from "react-router-dom";

const RegisterCard = () => {

	const [emailSend, setEmailSend] = useState("")
	const [showPassword, setShowPassword] = useState(false) 
	const [errors, setErrors] = useState([]) 

	const regIn = async (e) =>{
		try{
			e.preventDefault()
			const elems = e.target.elements
			const formData = new FormData()
			formData.append('username',elems[0].value)
			formData.append('description',elems[4].value)
			formData.append('email',elems[1].value)
			formData.append('password',elems[2].value)
			formData.append('avatar',elems[5].files[0])
			setEmailSend(elems[1].value)
			await registration(formData);
		}catch(ee){
			setErrors(ee.response.data.errors)
		}
	}
	if(emailSend != ""){
		return(
			<Card body style={{ width: '28rem' }}>
				<Card.Title>Підтвердіть аккаунт</Card.Title>
				Письмо на підтвердження аккаунту було відправлено на вашу пошту {emailSend}!
			</Card>
		)
	}

	return (
		<Card style={{ width: '28rem' }}>
	    <Card.Body>
	        <Card.Title>Реєстрація</Card.Title>
	        <Card.Subtitle className="mb-2 text-muted">
	        	або якщо вже маєте аккаунт то <Card.Link as={Link} to={LOGIN_ROUTE}>авторизуйтесь</Card.Link>
	        </Card.Subtitle>
	        <Form onSubmit={regIn}>
	        	<Form.Group className="mb-3">
		        	<Form.Label>Нікнейм:</Form.Label>
		      		<InputGroup>
		      			<InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
		        			@
		        		</InputGroup.Text>
		        		<Form.Control type="text" placeholder="Микола..."/>
		        	</InputGroup>

		        	<Form.Text className="text-muted">
			          Оберіть унікальне ім'я
			        </Form.Text>
		        </Form.Group>

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
		        		<InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
		        			<img alt="Показати\Скрити пароль" draggable="false" width='17px' src={showPassword ? eyeon : eyeoff} />
		        		</InputGroup.Text>
		        	</InputGroup>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Підтвердження паролю:</Form.Label>
		        	<Form.Control type='password' placeholder="Повторно введіть пароль..."/>
		        </Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Опишіть себе:</Form.Label>
					<Form.Control as="textarea" rows={3} />
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Завантажте аватар:</Form.Label>
					<Form.Control type="file" />
				</Form.Group>

				<Button variant="primary" placeholder="Введіть" type="submit">
					Зареєструватися
				</Button>
	        </Form>
		</Card.Body>
		<AlertList errors={errors}/>
    	</Card>
	)
}

export default RegisterCard