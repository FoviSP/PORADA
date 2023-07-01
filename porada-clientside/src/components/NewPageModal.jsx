import React, {useState,useContext} from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {Context} from '../index'

import { useNavigate } from "react-router-dom";

import AlertList from '../components/AlertList'
import {newPage} from '../http/pageAPI'

import {PAGE_ROUTE} from '../utils/consts'

const NewPageModal = ({visible,setVisible}) => {

	const {userStorage} = useContext(Context)
	const navigate = useNavigate()

	const [errors, setErrors] = useState([])
	const [name, setName] = useState('')
	const [desc, setDesc] = useState('')
	const [tags, setTags] = useState('')
	const createPage = async () => {
		try{
			const tagArray = tags.split(',')
			const formData = new FormData()
			const data = await newPage(name,desc,tagArray,userStorage.user.id)
			setVisible(false)
			navigate(PAGE_ROUTE+'/'+data.id)
		}catch(ee){
			setErrors(ee.response.data.errors)
		}
	}

	return (
		<Modal show={visible}>
			<Modal.Header>
				<Modal.Title>Створення нової сторінки</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
			        	<Form.Label>Назва:</Form.Label>
						<Form.Control value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='Як змінити кольор у елемента...'/>
			        	<Form.Text className="text-muted">
				          * напишіть своє питання або проблему
				        </Form.Text>
		        	</Form.Group>
		        	<Form.Group className="mb-3">
			        	<Form.Label>Опис:</Form.Label>
					<Form.Control value={desc} onChange={(e)=>setDesc(e.target.value)} as='textarea' rows={3} placeholder='Хочу змінити кольор але нічого не вийшло, ось код...'/>
			        	<Form.Text className="text-muted">
				          * опишіть своє питання або проблему
				        </Form.Text>
		        	</Form.Group>
		        	<Form.Group className="mb-3">
		        		<Form.Label>Теги:</Form.Label>
						<Form.Control value={tags} onChange={(e)=>setTags(e.target.value)} type='text' placeholder='js, css, html...'/>
			        	<Form.Text className="text-muted">
				          * напишіть які теми затрагує ваше питання
				        </Form.Text>
		        	</Form.Group>
				</Form>
				<div style={{display: 'flex', justifyContent: 'end', gap: '20px'}}>
					<Button variant='outline-primary' onClick={createPage}>Створити</Button>
					<Button variant='outline-danger' onClick={() => setVisible(false)}>Закрити</Button>
				</div>
			</Modal.Body>
			<AlertList errors={errors}/>
		</Modal>
	)
}

export default NewPageModal