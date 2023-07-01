import {$authHost} from './index'

export const addMessage = async (directId, content, userId) =>{
	const {data} = await $authHost.post('api/message/add', {directId, content, userId})
	return data
}

export const getMessages = async (directId) =>{
	const {data} = await $authHost.get('api/message', {params: {directId}})
	return data
}