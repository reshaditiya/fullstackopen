import { useState, useEffect } from "react"
import { SearchField, DataForm, DataDisplay, Notification } from "./components"
import personService from "./services/personService"

const App = () => {
	const emptyPerson = { name: "", number: "" }
	const emptyNotification = { message: "", error: false }
	const [persons, setPersons] = useState([])
	const [newPerson, setNewPerson] = useState(emptyPerson)
	const [keyword, setKeyword] = useState("")
	const [notification, setNotification] = useState(emptyNotification)

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
						setNotification({
							message: `Update ${person.name}`,
							error: false,
						})
						setNewPerson(emptyPerson)
					})
					.catch((error) => {
						console.log(error)
						setNotification({
							message: `Something wrong happen, try again`,
							error: true,
						})
						getAllPerson()
					})
			}
		} else {
			personService
				.post(newPerson)
				.then((response) => {
					setPersons((prev) => prev.concat(response.data))
					setNotification({
						message: `Added ${response.data.name}`,
						error: false,
					})
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
				.then(() => {
					setNotification({
						message: `Deleted ${
							persons.find((person) => person.id === id).name
						}`,
						error: false,
					})
					setPersons((prev) =>
						prev.filter((person) => person.id !== id)
					)
				})
				.catch((error) => {
					console.log(error)
					setNotification({
						message: `Something wrong happen, try again`,
						error: true,
					})
					getAllPerson()
				})
		}
	}

	useEffect(() => {
		getAllPerson(setPersons)
	}, [])
	useEffect(() => {
		if (notification)
			setTimeout(() => {
				setNotification(emptyNotification)
			}, 4000)
	}, [notification])

	return (
		<div>
			<h2>Phonebook</h2>
			{notification.message && (
				<Notification notification={notification} />
			)}
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
