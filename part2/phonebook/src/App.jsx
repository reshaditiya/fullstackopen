import { useState, useEffect } from "react"
import { SearchField } from "./components/SearchField"
import { DataForm } from "./components/DataForm"
import { DataDisplay } from "./components/DataDisplay"
import axios from "axios"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newPerson, setNewPerson] = useState({ name: "", number: "" })
	const [keyword, setKeyword] = useState("")

	function handleSubmit(e) {
		e.preventDefault()

		if (isNameExist(newPerson.number)) {
			alert(`${newPerson.number} is already added to phonebook`)
		} else {
			setPersons((prev) => prev.concat(newPerson))
			setNewPerson({ name: "", number: "" })
		}
	}

	function isNameExist(number) {
		return persons.find((person) => person.number === number)
	}

	useEffect(() => {
		async function getPersons() {
			try {
				const persons = (
					await axios.get("http://localhost:3001/persons")
				).data

				setPersons(persons)
			} catch (error) {
				console.log("Error getting person data: ", error)
			}
		}

		getPersons()
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
			<DataDisplay persons={persons} keyword={keyword} />
		</div>
	)
}

export default App
