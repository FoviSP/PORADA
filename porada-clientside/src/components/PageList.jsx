import React, {useState, useEffect, useContext} from 'react'

import Pagination from 'react-bootstrap/Pagination'

import {getPages} from '../http/pageAPI'

import MySpinner from '../components/MySpinner';
import PageCard from '../components/PageCard';

import {Context} from '../index'


const PageList = ({userId,contains,limit}) => {
	const {userStorage} = useContext(Context)
	const [active, setActive] = useState(1);
	const [count, setCount] = useState(undefined)
	const [pages, setPages] = useState(undefined)
	const pageLimit = limit || 10;

	async function fetchPage(){
		const pages = await getPages(userId, contains, pageLimit, 1);
		setCount(Math.ceil(pages.count/pageLimit))
		setPages(pages.rows)
	}
	async function reFetchPage(){
		const pages = await getPages(userId, contains, pageLimit, active);
		setPages(pages.rows)
	}

	useEffect(() => {
		fetchPage()
	},[])

	useEffect(() => {
		reFetchPage()
	},[active,contains])


	if(count === undefined || pages === undefined){
		return(
			<MySpinner/>
		)
	}

	return(
		<div>
			{pages.map((elem, index)=>{
				return(
					<PageCard key={index} page={elem} own={elem.user.id === userStorage.user.id}/>
				)
			})
			}
			<Pagination>
				{[...Array(count)].map((elem, index)=>{
					return(
						<Pagination.Item
							activeLabel = ""
							key={index}
							active={index+1 === active}
							onClick={()=>setActive(index+1)}
						>
							{index+1}
						</Pagination.Item>
					)
				})}
			</Pagination>
		</div>
	)
}

export default PageList