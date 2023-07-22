import { useState, useEffect } from "react"
import { SearchField } from "./components/SearchField"
import { DataForm } from "./components/DataForm"
import { DataDisplay } from "./components/DataDisplay"
import personService from "./services/personService"

const App = () => {
	const emptyPerson = { name: "", number: "" }
	const [persons, setPersons] = useState([])
	const [newPerson, setNewPerson] = useState(emptyPerson)
	const [keyword, setKeyword] = useState("")

	function handleSubmit(event) {
		event.preventDefault()
		const person = getPerson(newPerson.name)

		if (person) {
			const confirm = window.confirm(
				`Do you want to update ${newPerson.name} number?`
			)
			if (confirm) {
				personService
					.put(person.id, newPerson)
					.then((response) => {
						setPersons((prev) =>
							prev.map((prevPerson) =>
								prevPerson.id === person.id
									? response.data
									: prevPerson
							)
						)
						setNewPerson(emptyPerson)
					})
					.catch((error) => console.log(error))
			}
		} else {
			personService
				.post(newPerson)
				.then((response) => {
					setPersons((prev) => prev.concat(response.data))
					setNewPerson(emptyPerson)
				})
				.catch((error) => console.log(error))
		}
	}

	function getPerson(name) {
		return persons.find((person) => person.name === name)
	}

	function getAllPerson() {
		personService
			.getAll()
			.then((response) => setPersons(response.data))
			.catch((error) => error)
	}

	function handleDelete(id) {
		const confirm = window.confirm(
			"Are you sure you want to delete the person?"
		)
		if (confirm) {
			personService
				.remove(id)
				.then(() =>
					setPersons((prev) =>
						prev.filter((person) => person.id !== id)
					)
				)
				.catch((error) => console.log(error))
		}
	}

	useEffect(() => {
		getAllPerson(setPersons)
	}, [])

	return (
		<div>
			<h2>Phonebook</h2>
			<SearchField keyword={keyword} setKeyword={setKeyword} />
			<DataForm
				newPerson={newPerson}
				setNewPerson={setNewPerson}
				handleSubmit={handleSubmit}
			/>
			<DataDisplay
				persons={persons}
				keyword={keyword}
				handleDelete={handleDelete}
			/>
		</div>
	)
}

export default App
