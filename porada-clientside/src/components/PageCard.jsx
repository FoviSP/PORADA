import React, {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import { Link } from "react-router-dom";

import {PAGE_ROUTE} from '../utils/consts'

import MySpinner from '../components/MySpinner';

import {getScore} from '../http/scoreAPI'
import ScoreForm from '../components/ScoreForm';

import dateformat from '../utils/dateformat'

const PageCard = ({own,page}) => {

	const [score, setScore] = useState([{score: 0}])
	let date = new Date(page.createdAt);

	useEffect(()=>{
		getScore(page.id).then(data=>{
			if(data[0].score === null) return
			setScore(data)
		})
	}, [])

	return(
	<Button
		as={Link}
		to={PAGE_ROUTE+'/'+page.id}
		size="sm"
		variant="light"
		style={{
			width: '100%',
			maxHeight: '60px',
			textAlign: 'left',
			display: 'block',
			margin: '5px 0'
		}}>
		<div style={{display: 'flex', justifyContent: 'space-between'}}>
			<div>
				<h6>{page.name} <Badge style={{color: 'white'}} bg={
					own ? "primary" : "secondary"}>#{page.user.username}</Badge></h6>
				<i>{dateformat(page.createdAt)}</i>
			</div>
			<div style={{fontSize: '18pt'}}>
			{score === undefined
			?
			<MySpinner/>
			:
			<p className="m-1">{score[0].score}</p>				
			}
			</div>
		</div>
	</Button>
	)
}

export default PageCard