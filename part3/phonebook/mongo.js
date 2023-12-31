const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (!password) {
	console.log('give password as argument')
	process.exit(1)
}

const url = `mongodb+srv://fullstackopen:${password}@fullstackopen.1gxwu92.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
	name: name,
	number: number,
})

if (name && number) {
	person.save().then(() => {
		console.log(`added ${name} ${number} to phonebook`)
		mongoose.connection.close()
	})
} else {
	Person.find({}).then((res) => {
		res.forEach((person) => console.log(person))
		mongoose.connection.close()
	})
}
