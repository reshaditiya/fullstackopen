# Phonebook Backend Service

This is a backend service for a phonebook app. It provides APIs to manage phonebook entries, allowing users to get all persons, add new persons, and delete existing persons.

## API Endpoints

### Get All Persons

This endpoint allows you to retrieve the details of all persons in the phonebook.

- **URL:** `https://rsh-fullstackopen-phonebook.fly.dev/api/persons`
- **Method:** GET
- **Response:** JSON array containing details of all persons.
- **Example Response:**

```json
[
	{
		"id": 1,
		"name": "John Doe",
		"number": "1234567890"
	},
	{
		"id": 2,
		"name": "Jane Smith",
		"number": "9876543210"
	}
]
```

### Add a New Person

This endpoint allows you to add a new person to the phonebook.

- **URL:** `https://rsh-fullstackopen-phonebook.fly.dev/api/persons`
- **Method:** POST
- **Request Body:** JSON object with `name` and `number` properties.
- **Example Request Body:**

```json
{
	"name": "Alice Johnson",
	"number": "555-1234"
}
```

- **Response:** JSON object containing the details of the newly added person.
- **Example Response:**

```json
{
	"id": 3,
	"name": "Alice Johnson",
	"number": "555-1234"
}
```

### Delete a Person

This endpoint allows you to delete a person from the phonebook using their unique `id`.

- **URL:** `https://rsh-fullstackopen-phonebook.fly.dev/api/persons/:id`
- **Method:** DELETE
- **URL Parameter:** `id` - The unique identifier of the person to be deleted.
- **Example URL:** `https://rsh-fullstackopen-phonebook.fly.dev/api/persons/3`
- **Response:** No content (204) if the person is successfully deleted.

### Get One Person

This endpoint allows you to retrieve the details of a specific person using their unique `id`.

- **URL:** `https://rsh-fullstackopen-phonebook.fly.dev/api/persons/:id`
- **Method:** GET
- **URL Parameter:** `id` - The unique identifier of the person to retrieve.
- **Example URL:** `https://rsh-fullstackopen-phonebook.fly.dev/api/persons/2`
- **Response:** JSON object containing the details of the requested person.
- **Example Response:**

```json
{
	"id": 2,
	"name": "Jane Smith",
	"number": "9876543210"
}
```

## Post Request Body Format

The request body format for adding a new person should be a JSON object with the following properties:

- `name`: A string representing the name of the person.
- `number`: A string representing the phone number of the person.

Example:

```json
{
	"name": "John Doe",
	"number": "1234567890"
}
```

## Status Codes

- `200 OK`: The request was successful, and the response contains the expected data.
- `201 Created`: The request to add a new person was successful, and the new person has been added to the phonebook.
- `204 No Content`: The request to delete a person was successful, and the person has been removed from the phonebook.
- `400 Bad Request`: The request was malformed or missing required data (e.g., missing `name` or `number` in the request body).
- `404 Not Found`: The requested resource (person or endpoint) could not be found.
- `500 Internal Server Error`: An unexpected error occurred on the server.

Please make sure to handle the responses accordingly in your frontend application when interacting with this backend service.
