import {$authHost} from './index'

export const createDirect = async (users) =>{
	const {data} = await $authHost.post('api/direct/create', {users})
	return data
}

export const getDirects = async (id, userId) => {
	const {data} = await $authHost.get('api/direct', {params: {id, userId}})
	return data
}