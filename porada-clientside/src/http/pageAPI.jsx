import {$authHost, $host} from './index'

export const getPages = async (userId, contains, limit, page) =>{
	const {data} = await $host.get('api/page', {params: {userId, contains, limit, page}})
	return data
}

export const getPagesByTag = async (tag) =>{
	const {data} = await $host.get('api/tag/'+tag)
	return data
}

export const getTags = async (limit) =>{
	const {data} = await $host.get('api/tag/', {params: {limit}})
	return data
}

export const getPage = async (id) =>{
	const {data} = await $host.get('api/page/'+id)
	return data
}

export const newPage = async (name,description,tags,userId) => {
	let promise;
	if(tags){
		promise = await $authHost.post('api/page/create',{name,description,tags,userId})
		return promise.data
	}
	promise = await $authHost.post('api/page/create',{name,description,userId})
}

export const removePage = async (id) => {
	const {data} = await $authHost.post('api/page/remove',{id})
	return data
}