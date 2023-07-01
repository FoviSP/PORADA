import {MAIN_ROUTE,
		SEARCH_ROUTE,
		PAGE_ROUTE,
		PROFILE_ROUTE,
		DIRECT_ROUTE,
		HOME_ROUTE,
		REGISTRATION_ROUTE,
		LOGIN_ROUTE} from './utils/consts'

import AuthPage from './pages/AuthPage'
import DirectPage from './pages/DirectPage'
import HomePage from './pages/HomePage'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage'
import ProfilePage from './pages/ProfilePage'

export const authRoutes = [
	{
		path: HOME_ROUTE,
		component: <HomePage/> 
	},
	{
		path: DIRECT_ROUTE+'/:id',
		component: <DirectPage/>
	}
]

export const publicRoutes = [
	{
		path: MAIN_ROUTE,
		component: <MainPage/>
	},
	{
		path: SEARCH_ROUTE,
		component: <SearchPage/> 
	},
	{
		path: PAGE_ROUTE+'/:id',
		component: <UserPage/>
	},
	{
		path: PROFILE_ROUTE+'/:id',
		component: <ProfilePage/>
	},
	{
		path: LOGIN_ROUTE,
		component: <AuthPage/>
	},
	{
		path: REGISTRATION_ROUTE,
		component: <AuthPage/>
	}
]