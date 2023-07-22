import axios from "axios"

function post(newPerson) {
	return axios.post("http://localhost:3001/persons", newPerson)
}

function put(id, newPerson) {
	return axios.put(`http://localhost:3001/persons/${id}`, newPerson)
}

function getAll() {
	return axios.get("http://localhost:3001/persons")
}

function remove(id) {
	return axios.delete(`http://localhost:3001/persons/${id}`)
}

export default { post, put, getAll, remove }
