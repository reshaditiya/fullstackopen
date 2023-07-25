const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentDate = new Date()

const year = currentDate.getFullYear()
const month = months[currentDate.getMonth()]
const dayOfWeek = days[currentDate.getDay()]
const day = currentDate.getDate()
const hours = currentDate.getHours()
const minutes = currentDate.getMinutes()
const seconds = currentDate.getSeconds()
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

const formattedDateTime = `${dayOfWeek} ${month} ${day} ${year} ${hours
	.toString()
	.padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
	.toString()
	.padStart(2, '0')} GMT+0200 (${timeZone})`

module.exports = formattedDateTime
