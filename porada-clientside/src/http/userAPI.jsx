import {$authHost, $host} from './index'

import jwt_decode from 'jwt-decode'; 

export const login = async (email, password) =>{
	const {data} = await $host.post('api/user/login', {email, password})
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const registration = async (formData) =>{
	const {data} = await $host.post('api/user/register', formData)
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const check = async () => {
	const {data} = await $authHost.get('api/user/updateToken')
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const updateData = async (id, name, description) => {
	const {data} = await $authHost.post('api/user/updateData', {id, name, description})
	return data;
}

export const get = async (id) => {
	const promise = await $authHost.get('api/user?id='+id)
	return promise.data
}

export const blockUser = async (id) => {
	const {data} = await $authHost.post('api/user/remove', {id})
	return data;
}

export const logout = async () => {
	localStorage.removeItem('token')
}