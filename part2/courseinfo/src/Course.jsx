const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>Number of exercises {sum}</b>

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
)

const Content = ({ parts }) => (
	<>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</>
)

export default function Course({ course, parts }) {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={parts} />
			<Total sum={parts.reduce((acc, part) => acc + part.exercises, 0)} />
		</div>
	)
}
