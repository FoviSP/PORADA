import React, {useState, useContext} from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import {updateData} from '../http/userAPI'
import {Context} from '../index'

const UpdateModal = ({visible,setVisible,data}) => {
	const {userStorage} = useContext(Context)

	const newData = async (e) => {
		const elems = e.target.elements
		updateData(data.id, data.username, data.description)
		userStorage.setUser({...userStorage.user, username: data.username});
		setVisible(false);
	}


	return (
		<Modal className="p-3" show={visible}>
			<Modal.Header>
			<Modal.Title>
			Зміна персональних даних
			</Modal.Title>
			</Modal.Header>
	        <Modal.Body>
	          <p>Ваше ім'я буде змінено на:</p>
	          <p><b>{data.username}</b></p><br/>
	          <p>Опис буде змінен на:</p>
	          <p><b>{data.description}</b></p>
	        </Modal.Body>

	        <Modal.Footer>
	          <Button variant="success" onClick={newData}>Приняти зміни</Button>
	          <Button variant="danger" onClick={() => setVisible(false)}>Закрити</Button>
	        </Modal.Footer>
     	</Modal>
	)
}

export default UpdateModal