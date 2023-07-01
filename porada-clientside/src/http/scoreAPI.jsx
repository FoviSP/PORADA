import {$host,$authHost} from './index'

export const setScore = async (score, userId, pageId) => {
	const {data} = await $authHost.post('api/score/set', {score, userId, pageId})
	return data
}

export const getScores = async (userId, pageId) => {
	const {data} = await $host.get('api/score', {params: {userId, pageId}})
	return data
}

export const getScore = async (id) => {
	const {data} = await $host.get('api/score/'+id)
	return data
}