import axios from 'axios'

const baseUrl = '/api/persons'

function post(newPerson) {
	return axios.post(baseUrl, newPerson)
}

function put(id, newPerson) {
	return axios.put(`${baseUrl}/${id}`, newPerson)
}

function getAll() {
	return axios.get(baseUrl)
}

function remove(id) {
	return axios.delete(`${baseUrl}/${id}`)
}

export default { post, put, getAll, remove }
