import React, {useContext} from 'react'
import { useLocation, Navigate } from 'react-router-dom';


import LoginCard from '../components/LoginCard'
import RegisterCard from '../components/RegisterCard'

import {LOGIN_ROUTE} from '../utils/consts'

import {Context} from '../index'

const AuthPage = () => {

	let location = useLocation()
	const {userStorage} = useContext(Context)
	if(userStorage.isAuth){
		return(
			<Navigate to='/' replace />
		)
	}

	return(
		<div className="d-flex justify-content-center m-3">
			{location.pathname === LOGIN_ROUTE
			?
			<LoginCard/>
			:
			<RegisterCard/>
			}
		</div>
	)
}

export default AuthPage