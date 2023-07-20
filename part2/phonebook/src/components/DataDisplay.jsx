export function DataDisplay({ persons, keyword }) {
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
							{person.name} {person.number}
						</li>
					))}
			</ul>
		</>
	)
}
