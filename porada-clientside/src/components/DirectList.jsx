import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { Link } from 'react-router-dom'

import {getDirects} from '../http/directAPI'

import { DIRECT_ROUTE } from '../utils/consts'

import dateformat from '../utils/dateformat'

const DirectList = ({userId}) => {

	const [directs, setDirects] = useState(undefined)

	useEffect(()=>{
		getDirects(null, userId).then(data=>{
			setDirects(data.rows[0].directlists)
		})
	}, [])

	if(directs === undefined){
		return(
			<p>Приватних повідомлень не знайдено</p>
		)
	}

	return (
		<div style={{display: 'flex', flexWrap: 'wrap'}}>
		{directs.map((elem, index) => {
			return(
				<Button className="m-1" as={Link} to={DIRECT_ROUTE+'/'+elem.id} variant='light'>
					{elem.users.map((elem, index)=>{
						if(elem.id !== userId)
							return elem.username
					})}
					<br/>
					<Form.Text>{dateformat(elem.createdAt)}</Form.Text>
				</Button>
			)
		})}
		</div>
	)
}

export default DirectList