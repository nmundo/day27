const formModal = new bootstrap.Modal(document.getElementById('formModal')); // Inititalize modal
const phoneTypes = ['Home', 'Cell', 'Work']; // Array to map phones types
const apiUrl = 'http://localhost:3000';

const getContacts = async () => {
  const response = await fetch(`${apiUrl}/contacts`);
  const contacts = await response.json();
  return contacts;
}

const getContact = async (id) => {
  const contact = fetch(`${apiUrl}/contacts/${id}`)
  .then(res => res.json());
  return contact;
}

const createContact = async (contact) => {
  const response = await fetch(`${apiUrl}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  })
  const newContact = await response.json();
  return newContact;
}

const updateContact = async (contact) => {
  const response = await fetch(`${apiUrl}/contacts/${contact.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
  const updatedContact = response.json();
  return updatedContact;
}

const deleteContact = (id) => {
  fetch(`${apiUrl}/contacts/${id}`, { method: 'DELETE' })
  .then(() => refreshContacts());
}

const addContactToTable = (contact) => {
  const contactsList = document.getElementById('contactsList');
  const row = document.createElement('tr');
  row.setAttribute('id', contact.id);
  row.innerHTML = `
    <td>${contact.firstName}</td>
    <td>${contact.lastName}</td>
    <td>${phoneTypes[contact.phoneType]}</td>
    <td>${contact.phoneNumber}</td>
    <td>${contact.email}</td>
    <td>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul class="dropdown-menu">
          <li>
            <button class="dropdown-item" type="button" onclick="editContact('${contact.id}')">
              <i class="bi bi-pencil-square"></i> Edit
            </button>
          </li>
          <li>
            <button class="dropdown-item" type="button" onclick="deleteContact('${contact.id}')">
              <i class="bi bi-trash3"></i> Delete
            </button>
          </li>
        </ul>
      </div>
    </td>
  `;
  contactsList.appendChild(row);
}

const refreshContacts = async () => {
  const contacts = await getContacts();
  const contactsList = document.getElementById('contactsList');

  // Clear out contacts list
  while(contactsList.firstChild) {
    contactsList.removeChild(contactsList.firstChild);
  }

  // Generate a new table row for each contact in the contacts array
  contacts.forEach(contact => addContactToTable(contact));
}

const submitForm = async () => {
  const saveButton = document.getElementById('saveButton');
  const loadingIcon = document.getElementById('loadingIcon');
  saveButton.disabled = true;
  loadingIcon.classList.remove('d-none');

  // Get values from form fields
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phoneType = document.getElementById('phoneType').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const email = document.getElementById('email').value;
  const id = document.getElementById('id').value;
  const mode = id ? 'E' : 'N'; // Set form mode to edit or new

  // Create the contact object
  const newContact = {
    firstName,
    lastName,
    phoneType,
    phoneNumber,
    email,
  };

  if (mode === 'E') {
    await updateContact({ ...newContact, id });
    refreshContacts();
  } else {
    const contact = await createContact(newContact);
    addContactToTable(contact);
  }

  formModal.hide();
  document.getElementById('contactForm').reset();
  saveButton.disabled = false;
  loadingIcon.classList.add('d-none');
}

const editContact = async (id) => {
  const contact = await getContact(id);

  // Get the form input fields
  const firstNameField = document.getElementById('firstName');
  const lastNameField = document.getElementById('lastName');
  const phoneTypeField = document.getElementById('phoneType');
  const phoneNumberField = document.getElementById('phoneNumber');
  const emailField = document.getElementById('email');
  const idField = document.getElementById('id');

  // Pre fill form fields with existing contact values
  firstNameField.value = contact.firstName;
  lastNameField.value = contact.lastName;
  phoneTypeField.value = contact.phoneType;
  phoneNumberField.value = contact.phoneNumber;
  emailField.value = contact.email;
  idField.value = contact.id;

  // Show the form
  formModal.show();
}

refreshContacts();