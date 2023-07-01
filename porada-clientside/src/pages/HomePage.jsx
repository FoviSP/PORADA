import React, {useContext,useEffect,useState} from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { Link } from "react-router-dom";

import {Context} from '../index'

import NewPageModal from '../components/NewPageModal'
import PageList from '../components/PageList';
import DirectList from '../components/DirectList';
import Selector from '../components/Selector'; 
import MyProfile from '../components/MyProfile';

const HomePage = () => {

	const {userStorage} = useContext(Context)
	const [showNewPageModal, setShowNewPageModal] = useState(false)

	const hideModal = () => {
		setShowNewPageModal(false)
	}
	return(
		<div className="d-flex justify-content-center m-3">
		<NewPageModal visible={showNewPageModal} setVisible={setShowNewPageModal}/>
		<Card body>
		<div className="d-flex">
			<Container style={{width: '240px'}}>
				<MyProfile userId={userStorage.user.id}/>
			</Container>
			<Container style={{width: '600px'}}>
				<Selector
					buttons={['Ваші сторінки', 'Особисті повідомлення']}
					components={[
						<>
						<Button
							size="sm"
							variant='secondary'
							onClick={() => setShowNewPageModal(true)}>
							Створити сторінку
						</Button>
						<hr/>
						<PageList userId={userStorage.user.id} limit='5'/>
						</>,
						<DirectList userId={userStorage.user.id}/>]}
				/>
			</Container>
		</div>
		</Card>
		</div>
	)
}

export default HomePage