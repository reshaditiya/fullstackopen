export function SearchField({ keyword, setKeyword }) {
	return (
		<div>
			filter shown with{" "}
			<input
				type="text"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			/>
		</div>
	)
}
