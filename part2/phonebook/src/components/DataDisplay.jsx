export default function DataDisplay({ persons, keyword, handleDelete }) {
	return (
		<>
			<h2>Numbers</h2>
			<ul>
				{persons
					.filter((person) => {
						if (!keyword) return true
						return person.name.match(
							new RegExp(keyword.toLowerCase(), "gi")
						)
					})
					.map((person) => (
						<li key={person.number}>
							{person.name} {person.number}{" "}
							<button onClick={() => handleDelete(person.id)}>
								Delete
							</button>
						</li>
					))}
			</ul>
		</>
	)
}
