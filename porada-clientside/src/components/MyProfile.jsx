import React, {useContext,useEffect,useState} from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import MySpinner from '../components/MySpinner';
import UpdateModal from '../components/UpdateModal';

import {get, blockUser} from '../http/userAPI'
import {Context} from '../index'

import dateformat from '../utils/dateformat'


const MyProfile = ({userId}) => {

	const {userStorage} = useContext(Context)
	const [user, setUser] = useState({})
	const [description, setDescription] = useState({})
	const [username, setUsername] = useState({})

	const [modal, setShowModal] = useState(false)

	
	useEffect(() => {
		get(userId).then(data => {
			setUser(data)
			setUsername(data.username)
			setDescription(data.description)
		})
	},[])

	return (
		<>
		<UpdateModal setVisible={setShowModal} visible={modal} data={{id: userStorage.user.id, username, description}}/>
		<Form style={{width: '170px'}}>
			<img src={
				process.env.REACT_APP_API_URL+
				(user.deletedAt ? 'blocked.jpg' : user.avatar)
			} style={{width: '70px'}}/><br/>
			<Form.Group className='mb-3'>
				<Form.Label>Ім'я:</Form.Label><br/>
				<Form.Control type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder={user.username}/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Редагування опису:</Form.Label><br/>
				<Form.Control type="text" onChange={(e) => setDescription(e.target.value)} value={description} placeholder={user.description}/>
			</Form.Group>
			<Form.Label>Дата реєстрації:</Form.Label><br/>
			<Form.Label style={{fontSize: '11pt'}}>{dateformat(user.createdAt)}<br/></Form.Label>
			{user.deletedAt &&
				<>
				<Form.Label>Дата блокування:</Form.Label><br/>
				<Form.Label style={{fontSize: '11pt'}}>{dateformat(user.deletedAt)}<br/></Form.Label>
				</>
			}
			<hr/>
			<Button onClick={(e) => {e.preventDefault(); setShowModal(true);}} type="submit" variant="outline-success">
				Оновити особисті дані
			</Button>
		</Form>
		</>
	)
}

export default MyProfile