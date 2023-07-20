import { useState } from "react"
import { SearchField } from "./components/SearchField"
import { DataForm } from "./components/DataForm"
import { DataDisplay } from "./components/DataDisplay"

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040123456" },
		{ name: "Ada Lovelace", number: "39445323523" },
		{ name: "Dan Abramov", number: "1243234345" },
		{ name: "Mary Poppendieck", number: "39236423122" },
	])
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
