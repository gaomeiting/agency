import axios from "axios";
export function getSingers(url) {
	let path = `/api/${url}`;
	return axios.get(path,{
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
