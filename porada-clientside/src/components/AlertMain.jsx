import React from 'react'

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useSearchParams } from "react-router-dom";

import css from '../css/alert.module.css'

const AlertMain = () =>{
	const [searchParams,setSearchParams] = useSearchParams();

	const removeParam = () => {
		searchParams.delete('noPage')
		setSearchParams(searchParams)
	}

	if(!searchParams.get('noPage')){
		return(<div/>)
	}

	return(
		<div className={css.alertMain}>
			<Alert variant='danger'>
				<div className={css.alertTitle}>
					<b>Помилка сторінки не існує</b>
					<Button onClick={removeParam} size="sm" variant='danger' >X</Button>
				</div>
			    <p>
			    	Упс! Ви перейшли на неіснуючу сторінку, ми Вас перевели на головну сторінку
			    </p>
			</Alert>
		</div>
	)
}
export default AlertMain