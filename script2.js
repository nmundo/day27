const formModal = new bootstrap.Modal(document.getElementById('formModal')); // Inititalize modal
const phoneTypes = ['Home', 'Cell', 'Work']; // Array to map phones types

const showContacts = () => {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const contactsList = document.getElementById('contactsList');

  // Clear out contacts list
  while(contactsList.firstChild) {
    contactsList.removeChild(contactsList.firstChild);
  }

  // Generate a new table row for each contact in the contacts array
  contacts.forEach(contact => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contact.firstName}</td>
      <td>${contact.lastName}</td>
      <td>${phoneTypes[contact.phoneType]}</td>
      <td>${contact.phoneNumber}</td>
      <td>${contact.email}</td>
      <td>
        <button class="btn btn-outline-danger" onclick="deleteContact('${contact.phoneNumber}')">Delete</button>
        <button class="btn btn-outline-primary" onclick="editContact('${contact.phoneNumber}')">Edit</button>
      </td>
    `;
    // Add the newly created row to the contacts list
    contactsList.appendChild(row);
  })
}

const submitForm = () => {
  // Get values from form fields
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phoneType = document.getElementById('phoneType').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const email = document.getElementById('email').value;
  const mode = document.getElementById('mode').value;

  // Create the contact object
  const newContact = {
    firstName,
    lastName,
    phoneType,
    phoneNumber,
    email,
  };

  // Get existing contacts array
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

  // If form mode is edit then remove the contact we're editing from the contacts array
  if (mode === 'E') {
    contacts = contacts.filter(contact => contact.phoneNumber !== newContact.phoneNumber);
  }

  // Set local storage to the existing contacts array + the new contact
  localStorage.setItem('contacts', JSON.stringify([...contacts, newContact]));
  formModal.hide();
  document.getElementById('contactForm').reset();

  // Reload contacts display
  showContacts();
}

const deleteContact = (phoneNumber) => {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

  // Filter out contact we want to delete
  contacts = contacts.filter(contact => contact.phoneNumber !== phoneNumber);
  localStorage.setItem('contacts', JSON.stringify(contacts));

  // Reload contacts display
  showContacts();
}

const editContact = (phoneNumber) => {
  document.getElementById('mode').value = 'E'; // Set form mode to edit

  // Get contacts and find the one we want to edit
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const contact = contacts.find(contact => contact.phoneNumber === phoneNumber);

  // Get the form input fields
  const firstNameField = document.getElementById('firstName');
  const lastNameField = document.getElementById('lastName');
  const phoneTypeField = document.getElementById('phoneType');
  const phoneNumberField = document.getElementById('phoneNumber');
  const emailField = document.getElementById('email');

  // Pre fill form fields with existing contact values
  firstNameField.value = contact.firstName;
  lastNameField.value = contact.lastName;
  phoneTypeField.value = contact.phoneType;
  phoneNumberField.value = contact.phoneNumber;
  emailField.value = contact.email;

  // Show the form
  formModal.show();
}

// Populate contacts table on initital page load
showContacts();