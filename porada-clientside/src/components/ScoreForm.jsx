import React, {useEffect,useState,useContext} from 'react'

import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import MySpinner from '../components/MySpinner';

import {ReactComponent as ArrowDown} from '../imgs/arrow-down.svg'
import {ReactComponent as ArrowUp} from '../imgs/arrow-up.svg'

import {Context} from '../index'

import {getScores,getScore,setScore} from '../http/scoreAPI'

const ScoreForm = ({pageId, author}) => {

	const {userStorage} = useContext(Context)
	const [active, setActive] = useState(0)
	const [pageScore, setPageScore] = useState(0)

	useEffect(()=>{
		getScore(pageId).then(data=>{
			setPageScore(parseInt(data[0].score))
		})
		getScores(userStorage.user.id, pageId).then(data=>{
			data.rows.map((elem, index)=>{
				if(elem.userId === userStorage.user.id){
					setActive(elem.score)	
				}
			})
		})
	}, [])

	if(pageScore === undefined){
		return(
			<MySpinner/>
		)
	}
	
	const arrowUpTooltip = (props) => (
		<Tooltip {...props}>
			Так, це питання є актуальним
		</Tooltip>
	);
	const arrowDownTooltip = (props) => (
		<Tooltip {...props}>
			Ні, це питання не є вже актуальним
		</Tooltip>
	);

	const onUpClick = () => {
		if(active === 1 || author == userStorage.user.id || userStorage.user.id === 0) return
		setScore(1, userStorage.user.id, pageId)
		if(pageScore+1 === 0){
			setPageScore(pageScore+2)
		}else{
			setPageScore(pageScore+1)
		}
		setActive(1)
	}

	const onDownClick = () => {
		if(active === -1 || author == userStorage.user.id || userStorage.user.id === 0) return
		setScore(-1, userStorage.user.id, pageId)
		if(pageScore-1 === 0){
			setPageScore(pageScore-2)
		}else{
			setPageScore(pageScore-1)
		}
		setActive(-1)
	}

	return (
		<Form style={{width: '25%', maxWidth: '60px', marginRight: '10px', textAlign: 'center'}}>
			<OverlayTrigger
		      placement="right"
		      delay={{ show: 250, hide: 400 }}
		      overlay={arrowUpTooltip}
		    >
				<ArrowUp
				fill={active === 1 || author == userStorage.user.id || userStorage.user.id === undefined ? 'gray' : '#0d6efd'}
				onClick={onUpClick}
				style={{
					width: '50%',
					maxWidth: '35px',
					height: '35px',
					maxHeight: '50%'}}
				/>
		    </OverlayTrigger>

			<div style={{fontSize: '18pt'}}>
			{!pageScore
			?
			0
			:
			pageScore}
			</div>
			<OverlayTrigger
		      placement="right"
		      delay={{ show: 250, hide: 400 }}
		      overlay={arrowDownTooltip}
		    >
				<ArrowDown
					fill={active === -1 || author == userStorage.user.id || userStorage.user.id === undefined ? 'gray' : '#0d6efd'}
					onClick={onDownClick}
					style={{
						width: '50%',
						maxWidth: '35px',
						height: '35px',
						maxHeight: '50%'}}
				/>
		    </OverlayTrigger>
		</Form>
	)
}

export default ScoreForm