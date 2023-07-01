import React, {useState, useContext} from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import {Context} from '../index'

import {addMessage} from '../http/messageAPI'

const MessageForm = ({directId}) => {

	const [content, setContent] = useState(undefined)

	const {userStorage} = useContext(Context)

	async function newMessage(){
		const message = addMessage(directId, content, userStorage.user.id)
	}

	return (
		<Card body>
		<Form>
			<Form.Group className="mb-2">
				<Form.Label>Текст вашого повідомлення:</Form.Label>
				<Form.Control
					onChange={e => setContent(e.target.value)}
					as="textarea"
					placeholder="Привіт..."
					rows={2}
					value={content}
				/>
			</Form.Group>
			<Form.Group className="d-flex justify-content-end">
				<Button onClick={newMessage} variant='outline-primary'>Відправити</Button>
			</Form.Group>
		</Form>
		</Card>
	)
}

export default MessageForm