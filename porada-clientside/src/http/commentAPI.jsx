import {$authHost} from './index'

export const addComment = async (form) =>{
	const {data} = await $authHost.post('api/comment/add', form)
	return data
}

export const getComments = async (pageId) =>{
	const {data} = await $authHost.get('api/comment', {params: {pageId}})
	return data
}

export const removeComment = async (id) => {
	const {data} = await $authHost.post('api/comment/remove', {id})
	return data
}