import axios from "axios";
export function getSingers(url) {
	return axios.get(url).then((res) => {
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
