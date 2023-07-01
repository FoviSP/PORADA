import React, {useContext,useState,useEffect} from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import {Link, useLocation, useNavigate} from "react-router-dom";

import AboutModal from '../components/AboutModal';

import SearchForm from './SearchForm'
import {Context} from '../index'

import {logout} from '../http/userAPI'
import {get} from '../http/userAPI'

import { MAIN_ROUTE, HOME_ROUTE, SEARCH_ROUTE, LOGIN_ROUTE } from '../utils/consts'

const MyNavbar = () =>{
	let location = useLocation()
  	const [showModal, setShowModal] = useState(false)
	const {userStorage} = useContext(Context)
	const navigate = useNavigate()
	const [user, setUser] = useState(undefined)

	const logOut = () => {
		userStorage.setUser({})
		userStorage.setAuth(false)
		logout()

	}

	useEffect(() => {
		if(userStorage.user.id === undefined) return;
		get(userStorage.user.id).then(data => {
			userStorage.setUser({id: data.id, username: data.username, role: data.role})
			setUser(data)
		})
	},[])
	const popover = (
	  <Popover id="popover-basic">
	    <Popover.Body>
	      Ви дійсно бажаєте <strong>вийти</strong> з аккаунту?
	      <br/>
	      <div className="d-flex justify-content-center" style={{gap: '20px'}}>
	      <Button size="sm" as={Link} to={MAIN_ROUTE} variant="outline-primary" onClick={logOut}>Так</Button>
	      <Button size="sm" variant="outline-danger" onClick={() => document.body.click()}>
            Ні
          </Button>
          </div>
	    </Popover.Body>
	  </Popover>
	);

	

	return(
		<>
		<AboutModal visible={showModal} setVisible={setShowModal}/>
		<Navbar
			style={{
				display: 'flex',
				justifyContent: 'center',
			}} 
			bg="light"
			variant="light"
			>
			<Navbar.Brand style={{color: '#007bff', fontWeight: 'bolder'}} as={Link} to={MAIN_ROUTE}>ПОРАДА</Navbar.Brand>
    		<Nav style={{
    			display: 'flex',
				width: '40%',
				gap: '4px',
				maxHeight:"40px",
				justifyContent: 'left'
			}}
			>
    			<Button onClick={() => setShowModal(true)} variant="light" as={Link} to="#about"
    				style={{minWidth: "90px"}}>Про нас</Button>
    			{location.pathname === SEARCH_ROUTE ||
					<SearchForm/>
				}
            </Nav>
			
			<Nav style={{
				display: 'flex',
				maxHeight:"40px",
				width: '40%',
				gap: '4px',
				justifyContent: 'right',
			}}>
			{ !userStorage.isAuth
			?
			<>
			<Button variant="light" as={Link} to={LOGIN_ROUTE}>Увійти</Button>
	       	</>
	       	:
	       	<>
	       	<Button variant="light" as={Link} to={HOME_ROUTE}>#{userStorage.user.username}</Button>
	       	<OverlayTrigger
	       		trigger="click"
	       		placement="bottom"
	       		overlay={popover}
	       		rootClose>
	       		<Button variant="light">Вийти</Button>
	       	</OverlayTrigger>
	       	</>
			}
			</Nav>
		</Navbar>
		</>
	)
}
export default MyNavbar