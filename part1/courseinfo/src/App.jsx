const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	}

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default App

function Header({ course }) {
	return <h1>{course}</h1>
}

function Content({ parts }) {
	return (
		<>
			{parts.map((part) => (
				<Part part={part.name} exercises={part.exercises} />
			))}
		</>
	)
}

function Total({ parts }) {
	return (
		<p>
			Number of exercises{" "}
			{parts.reduce((acc, part) => part.exercises + acc, 0)}
		</p>
	)
}

function Part({ part, exercises }) {
	return (
		<p>
			{part} {exercises}
		</p>
	)
}
