const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let contacts = [
    {
        id: uuidv4(),
        firstName: "Alice",
        lastName: "Johnson",
        phoneType: 1,
        phoneNumber: "555-1234",
        email: "alice.johnson@example.com"
    },
    {
        id: uuidv4(),
        firstName: "Bob",
        lastName: "Smith",
        phoneType: 2,
        phoneNumber: "555-5678",
        email: "bob.smith@example.com"
    },
    {
        id: uuidv4(),
        firstName: "Charlie",
        lastName: "Brown",
        phoneType: 0,
        phoneNumber: "555-8765",
        email: "charlie.brown@example.com"
    },
    {
        id: uuidv4(),
        firstName: "Dana",
        lastName: "White",
        phoneType: 1,
        phoneNumber: "555-4321",
        email: "dana.white@example.com"
    },
    {
        id: uuidv4(),
        firstName: "Eli",
        lastName: "Walker",
        phoneType: 2,
        phoneNumber: "555-8761",
        email: "eli.walker@example.com"
    },
    {
        id: uuidv4(),
        firstName: "Fiona",
        lastName: "Green",
        phoneType: 2,
        phoneNumber: "555-1235",
        email: "fiona.green@example.com"
    },
    {
        id: uuidv4(),
        firstName: "George",
        lastName: "King",
        phoneType: 2,
        phoneNumber: "555-4322",
        email: "george.king@example.com"
    },
    {
        id: uuidv4(),
        firstName: "Hannah",
        lastName: "Scott",
        phoneType: 1,
        phoneNumber: "555-5679",
        email: "hannah.scott@example.com"
    },
    {
        id: uuidv4(),
        firstName: "Ian",
        lastName: "Taylor",
        phoneType: 3,
        phoneNumber: "555-8766",
        email: "ian.taylor@example.com"
    },
    {
        id: uuidv4(),
        firstName: "Jenna",
        lastName: "Adams",
        phoneType: 2,
        phoneNumber: "555-4323",
        email: "jenna.adams@example.com"
    }
];

// Get all contacts
app.get('/contacts', (req, res) => {
    res.json(contacts);
});

// Get a single contact by ID
app.get('/contacts/:id', (req, res) => {
    const contact = contacts.find(c => c.id === req.params.id);
    if (!contact) return res.status(404).send('Contact not found');
    res.json(contact);
});

// Add a new contact
app.post('/contacts', (req, res) => {
    console.log(req.body);
    const newContact = {
        id: uuidv4(),
        ...req.body
    };
    contacts.push(newContact);
    const delayPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            res.status(201).json(newContact);
            resolve();
        }, 1000);
    });
});

// Update an existing contact
app.put('/contacts/:id', (req, res) => {
    const contactIndex = contacts.findIndex(c => c.id === req.params.id);
    if (contactIndex === -1) return res.status(404).send('Contact not found');
    
    contacts.splice(contactIndex, 1);
    contacts.push({ ...req.body });
    res.json({ ...req.body });
});

// Delete a contact
app.delete('/contacts/:id', (req, res) => {
    const contactIndex = contacts.findIndex(c => c.id === req.params.id);
    if (contactIndex === -1) return res.status(404).send('Contact not found');

    const deletedContact = contacts.splice(contactIndex, 1);
    res.json(deletedContact);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});