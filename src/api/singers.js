import axios from "axios";
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
//删除小声咖
export function modifySinger(url, data) {
	return axios.put(url, params).then(res => {
				return Promise.resolve(res.data)
			}).catch(err => {
				return Promise.reject(err)
			});
}