export function DataForm({ newPerson, setNewPerson, handleSubmit }) {
	return (
		<form>
			<div>
				name:{" "}
				<input
					value={newPerson.name}
					onChange={(e) =>
						setNewPerson((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
				/>
			</div>
			<div>
				number:{" "}
				<input
					value={newPerson.number}
					onChange={(e) =>
						setNewPerson((prev) => ({
							...prev,
							number: e.target.value.replace(/[^0-9]/, ""),
						}))
					}
				/>
			</div>
			<div>
				<button type="submit" onClick={(e) => handleSubmit(e)}>
					add
				</button>
			</div>
		</form>
	)
}
