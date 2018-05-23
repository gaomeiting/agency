import axios from "axios";
export function loginCompany(url, params) {
	return axios.post(url, params).then(res => {
		return Promise.resolve(res.headers.authorization
	);
	}).catch(err => {
		/*console.log(err, 123)*/
		return Promise.reject(err);
	})
}