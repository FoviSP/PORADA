import React, {useContext,useEffect,useState} from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Badge from 'react-bootstrap/Badge'

import MySpinner from '../components/MySpinner';

import {Link, useNavigate} from 'react-router-dom'

import {Context} from '../index'

import {get, blockUser} from '../http/userAPI'
import {createDirect} from '../http/directAPI'

import { HOME_ROUTE } from '../utils/consts'

import dateformat from '../utils/dateformat'

const UserForm = ({userId}) => {

	const navigate = useNavigate()
	const {userStorage} = useContext(Context)
	const [user, setUser] = useState({})

	const newDirect = () => {
		createDirect([userStorage.user.id, userId]).then(data=>{
			console.log(data)
			navigate(HOME_ROUTE+'/'+'?directs=yes')
		})
	}

	const banUser = (id) => {
		blockUser(id)
		get(userId).then(data => {
			setUser(data)
		})
	}
	

	useEffect(() => {
		get(userId).then(data => {
			setUser(data)
		})
	},[])

	
	const toolTip = (props) => (
		<Tooltip {...props}>
			{userStorage.user.id === userId
			?
				<Button as={Link} to={HOME_ROUTE} variant='primary' size="sm">До доманьої сторінки</Button>
			:
				<>
				<Button variant='primary' onClick={newDirect} size="sm">Відправити приватне повідомлення</Button>
				{userStorage.user.role === 'ADMIN'
				&&
					<>
					<br/>
					<Button variant='danger' onClick={() => banUser(userId)} size="sm">Заблокувати</Button>
					</>
				}
				</>
			}

		</Tooltip>
	);

	if(user === null){
		return(
			<MySpinner/>
		)
	}

	if(user.deletedAt){
		return(
		<Form style={{width: '170px'}}>
			<img 
				src={process.env.REACT_APP_API_URL+'blocked.jpg'}
				style={{width: '70px'}}
			/><br/>
			<Form.Text>Ім'я:</Form.Text><br/>
			<del style={{margin: '0'}}><a>{user.username}</a></del><br/>
			<Badge bg="secondary">заблокован</Badge><br/>
			<Form.Text>Опис:</Form.Text><br/>
			<del style={{fontSize: '10pt'}}>{user.description}</del><br/>
			<Form.Text>Дата реєстрації:</Form.Text><br/>
			<del style={{fontSize: '9pt'}}>{dateformat(user.createdAt)}<br/></del>
			<Form.Text>Дата блокування:</Form.Text><br/>
			<div style={{fontSize: '9pt'}}>{dateformat(user.deletedAt)}<br/></div>
		</Form>

		)
	}

	return (
		<Form style={{width: '170px'}}>
			<img src={
				process.env.REACT_APP_API_URL+
				(user.deletedAt ? 'blocked.jpg' : user.avatar)
			} style={{width: '70px'}}/><br/>
			<OverlayTrigger
		      placement="right"
		      delay={{ show: 250, hide: 900 }}
		      overlay={toolTip}
		    >
				<Form.Label style={{margin: '0'}}><a href='' onClick={e=>e.preventDefault()}>{user.username}</a></Form.Label>
		    </OverlayTrigger><br/>
		    {user.role === 'ADMIN'
		    ?
		    <Badge pill bg="danger">Адмін</Badge>
		    :
		    <Badge pill bg="primary">Користувач</Badge>
			}

			<div style={{fontSize: '10pt'}}>{user.description}</div>
			<Form.Text>Дата реєстрації:</Form.Text><br/>
			<div style={{fontSize: '9pt'}}>{dateformat(user.createdAt)}<br/></div>
			{user.deletedAt &&
				<>
				<Form.Text>Дата блокування:</Form.Text><br/>
				<div style={{fontSize: '9pt'}}>{dateformat(user.deletedAt)}<br/></div>
				</>
			}
		</Form>
	)
}

export default UserForm