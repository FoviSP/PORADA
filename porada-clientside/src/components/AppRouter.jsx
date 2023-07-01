import React, {useContext, useState, useEffect} from 'react'

import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from '../routes'
import AlertMain from '../components/AlertMain'

import {Context} from '../index'

const AppRouter = () => {

	const {userStorage} = useContext(Context)
	const [id, setId] = useState(0)
	useEffect(()=>{
		setId(userStorage.user.id)
	},[userStorage])
	return(
		<>
		<AlertMain/>
		<Routes>
			{userStorage.isAuth && authRoutes.map(({path, component})=>(
				<Route key={path} path={path} element={component} />
			))}
			{publicRoutes.map(({path, component})=>(
				<Route key={path} path={path} element={component} />
			))}
			<Route
				path="*"
		        element={<Navigate to={"/?noPage=1"} replace={true}/>}
			/>
		</Routes>
		</>
	)
}

export default AppRouter