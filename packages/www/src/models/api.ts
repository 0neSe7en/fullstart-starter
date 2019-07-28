import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api'
axios.defaults.withCredentials = true

export function setToken(token: string) {
	axios.defaults.headers = {
		Authorization: `Bearer ${token}`
	}
}

export function removeToken() {
	axios.defaults.headers = {
		Authorization: ''
	}
}


export default axios
