let persons = require('./data/persons.js')
const currentTime = require('./data/currentTime.js')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.post('/api/persons', (request, response) => {
	const id = Math.max(...persons.map((person) => person.id)) + 1 ?? 0
	const body = request.body

	if (!(body.name && body.number)) {
		return response.status(400).json({
			error: 'content missing',
		})
	}
	if (persons.find((person) => person.name === body.name))
		return response.status(400).json({
			error: 'name must be unique',
		})

	const person = {
		id: id,
		name: body.name,
		number: body.number,
	}

	persons = persons.concat(person)

	response.json(person)
})
app.get('/', (request, response) => response.send('<h1>Hello World</h1>'))
app.get('/api/persons', (request, response) => response.json(persons))
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find((person) => person.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})
app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter((person) => person.id !== id)

	response.status(240).end()
})
app.get('/info', (request, response) =>
	response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentTime}</p>
  `)
)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
