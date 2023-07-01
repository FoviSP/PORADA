import React, {useState, useEffect, useContext} from 'react'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

import {useParams} from 'react-router-dom'

import {Context} from '../index'

import MySpinner from '../components/MySpinner'
import MessageForm from '../components/MessageForm'

import {getDirects} from '../http/directAPI'
import {getMessages} from '../http/messageAPI'

import dateformat from '../utils/dateformat'

const DirectPage = () => {

	const {id} = useParams()

	const [user, setUser] = useState(undefined)
	const [messages, setMessages] = useState(undefined)

	const {userStorage} = useContext(Context)

	useEffect(()=>{
		getDirects(id, null).then(data => {
			data.rows.map((elem, index)=>{
				if(elem.id !== userStorage.user.id){
					setUser(elem)
				}
			})
		})
		getMessages(id).then(data => {
			setMessages(data)
		})
	}, [])

	console.log(messages)

	return(
		<div className="d-flex justify-content-center m-3">
			<Card body style={{width: '50%', height: '500px'}}>
				{user === undefined
				?
					<MySpinner/>
				:
					<h5 style={{fontWeight: 'normal'}}>
					<img src={process.env.REACT_APP_API_URL+user.avatar} style={{width: '70px'}}/> {user.username} <>
					{user.role === 'ADMIN'
					    ?
					    <Badge pill bg="danger">Адмін</Badge>
					    :
					    <Badge pill bg="primary">Користувач</Badge>
						}
						</>
					</h5>
				}

				<hr/>
				<div style={{overflowY: 'scroll', width: '100%', height: '360px'}}>
				{messages === undefined
				?
					<MySpinner/>
				:
					messages.rows.map((elem, index)=>{
						return (
							<div className={
								userStorage.user.id === elem.userId
								?
								"d-flex m-1 justify-content-end"
								:
								"m-1"
							}>
							<Card className="mb-3" body style={{minWidth: '100px',width: '70%', maxWidth: '500px'}}>
								<Form.Text>{dateformat(elem.createdAt)}</Form.Text><br/>
								{elem.content}
							</Card>
							</div>
						)
					})
				}
				</div>
				<MessageForm directId={id}/>
				</Card>
		</div>
	)
}

export default DirectPage