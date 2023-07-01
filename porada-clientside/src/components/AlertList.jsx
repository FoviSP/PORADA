import React from 'react'
import Alert from 'react-bootstrap/Alert';

const AlertList = ({errors}) =>{
	return(
		errors && errors.map((elem, index)=>{
			return <Alert key={index} variant="warning">{elem.msg}</Alert>
		})
	)
}

export default AlertList