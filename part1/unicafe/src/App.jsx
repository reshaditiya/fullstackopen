import { useState } from "react"

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<main>
			<div>
				<h1>Give Feedback</h1>
				<Button
					text={"GOOD"}
					handleClick={() => setGood((prev) => prev + 1)}
				/>
				<Button
					text={"NEUTRAL"}
					handleClick={() => setNeutral((prev) => prev + 1)}
				/>
				<Button
					text={"BAD"}
					handleClick={() => setBad((prev) => prev + 1)}
				/>
			</div>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</main>
	)
}

export default App

function Statistics({ good, neutral, bad }) {
	const all = good + neutral + bad
	const average = ((good - bad) / all || 0).toFixed(2)
	const positive = ((good / all) * 100 || 0).toFixed(2)

	console.log(positive)

	return (
		<div>
			<h2>Statistics</h2>
			{good + neutral + bad > 0 ? (
				<table>
					<StatisticLine text="Good" value={good} />
					<StatisticLine text="Neutral" value={neutral} />
					<StatisticLine text="Bad" value={bad} />
					<StatisticLine text="All" value={all} />
					<StatisticLine text="Average" value={average} />
					<StatisticLine text="Positive" value={`${positive} %`} />
				</table>
			) : (
				<p>No feedback given</p>
			)}
		</div>
	)
}

function Button({ text, handleClick }) {
	return <button onClick={handleClick}>{text}</button>
}

function StatisticLine({ text, value }) {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}
