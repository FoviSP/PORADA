import React, {useState} from 'react'

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import {Link} from 'react-router-dom'

import {addComment} from '../http/commentAPI'

const CommentForm = ({userId,pageId, comments,callBackComment}) => {

	const [content, setContent] = useState('')
	const [files, setFiles] = useState(undefined)

	async function sendComment(e) {
		e.preventDefault()
		document.body.click()
		const formData = new FormData()
		formData.append('content',content)
		formData.append('userId',userId)
		formData.append('pageId',pageId)
		if(files) {
			formData.append('files',files)
		}
		const comment = await addComment(formData)
		callBackComment([...comments, comment])
		setContent('')
		setFiles(undefined)
	}

	const popover = (
		<Popover id="popover-basic">
			<Popover.Body>
				<strong>Відправити</strong> цей коментар?
				<br/>
				<div className="d-flex justify-content-center" style={{gap: '20px'}}>
					<Button
						size="sm"
						variant="outline-primary"
						onClick={sendComment}
					>
						Так
					</Button>
					<Button
						size="sm"
						variant="outline-danger"
						onClick={() => document.body.click()}
					>
						Ні
					</Button>
				</div>
			</Popover.Body>
		</Popover>
	);
	return (
		<Card body>
		<Form>
			<Form.Group className="mb-2">
				<Form.Label>Текст вашого комментаря:</Form.Label>
				<Form.Control
					onChange={e => setContent(e.target.value)}
					as="textarea"
					placeholder="Привіт, щоб вирішити це питання..."
					rows={2}
					value={content}
				/>
			</Form.Group>
			
			<Form.Group className="d-flex justify-content-end">
			<OverlayTrigger
	       		trigger="click"
	       		placement="top"
	       		overlay={popover}
	       		rootClose>
				<Button variant='outline-primary'>Відправити комментар</Button>
	       	</OverlayTrigger>
			</Form.Group>
			
		</Form>
		</Card>
	)
}

export default CommentForm