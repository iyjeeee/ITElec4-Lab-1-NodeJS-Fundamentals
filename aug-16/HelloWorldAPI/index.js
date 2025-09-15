import express from 'express'; // Importing express module
const app = express(); // Creating an instance of express
const port = 3000; // Defining the port number

app.get('/', (req, res) => { // Defining a route for the root URL
  res.status(200).send('Hello World!'); // Sending a response when the root URL is accessed
});

// Create an endpoint to handle GET request /info showing your name, section, and program
//app.get('/info', (req, res) => { // Defining a route for the root URL
//  res.status(200).send('NAME: Recto, John Andrei D. | SECTION: IT4B | PROGRAM: BSIT'); // Sending a response when the root URL is accessed
//}); 

//app.get('/:id', (req, res) => { // Defining a route that accepts a parameter
//  const id = req.params.id; // Extracting the 'id' parameter from the request
//  console.log(`Received request with ID: ${id}`); // Logging the ID to the console
//  res.status(200).send(`ID received: ${id}`); // Sending a response with the ID
//}); 

// Create an endpoint to handle GET request /hello/:name showing a message
// Hello John Doe!
//app.get('/hello/:name', (req, res) => { // Defining a route that accepts a name parameter
//    const name = req.params.name; // Extracting the 'name' parameter from the request
//    res.status(200).send(`Hello ${name}!`); // Sending a response with the name
//});

//app.get('/foo', (req, res) => { // Defining a route that accepts a name parameter
//    console.log(req.query); // Logging the query parameters to the console
//}); // Sending a response with the query parameters

app.get('/IT', (req, res) => { // Defining a route that accepts a name parameter
    console.log(req.query); // Logging the query parameters to the console
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`)); // Starting the server

