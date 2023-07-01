import React from 'react'

import Spinner from 'react-bootstrap/Spinner'

const MySpinner = () => {

	return(
		<div style={{
			display: 'flex',
			width: '100%',
			minWidth: '10%',
			justifyContent: 'center',
			margin: '20% auto'
		}}>
        	<Spinner variant="primary" animation="grow" role="status" />
		</div>
	)
}

export default MySpinner