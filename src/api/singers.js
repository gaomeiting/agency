import axios from "axios";
import Qs from 'qs';
export function getSingers(url, params) {
	return axios.get(url,{
		params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function addSinger(url, params) {
	return axios.post(url, params).then(res => {
				return Promise.resolve(res.data)
			}).catch(err => {
				return Promise.reject(err)
			});
}
export function addSingerQs(url, params) {
	return axios.post(url, Qs.stringify(params), {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(res => {
				return Promise.resolve(res.data)
			}).catch(err => {
				return Promise.reject(err)
			});
}
//删除小声咖
export function deleteSinger(url, params) {
	return axios.delete(url, params).then(res => {
				return Promise.resolve(res.data)
			}).catch(err => {
				return Promise.reject(err)
			});
}
export function modifySinger(url, params) {
	return axios.put(url, params).then(res => {
				return Promise.resolve(res.data)
			}).catch(err => {
				return Promise.reject(err)
			});
}