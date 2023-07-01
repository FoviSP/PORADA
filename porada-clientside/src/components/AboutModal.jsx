import React, {useState,useContext} from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const AboutModal = ({visible,setVisible}) => {

	return (
		<Modal show={visible}>
			<Modal.Header>
				<Modal.Title>Про нас</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<p>ПОРАДА - вітчизняний вебфорум програмістів який дасть можливість спілкуватися, вдосконалювати свої навички, ділитися знаннями, допомагати вирішувати проблеми шукати відповіді на свої питання та розвинути IT-сферу в Україні. </p>
			<div className='d-flex justify-content-end'>
			<Button variant='primary' onClick={() => setVisible(false)}>Закрити</Button>
			</div>
			</Modal.Body>
		</Modal>
	)
}

export default AboutModal