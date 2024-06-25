const formModal = new bootstrap.Modal(document.getElementById('formModal'));
const phoneTypes = ['Home', 'Cell', 'Work'];

const showContacts = () => {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const contactsList = document.getElementById('contactsList');
  while(contactsList.firstChild) {
    contactsList.removeChild(contactsList.firstChild);
  }
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
    contactsList.appendChild(row);
  })
}

const submitForm = () => {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const phoneType = document.getElementById('phoneType');
  const phoneNumber = document.getElementById('phoneNumber');
  const email = document.getElementById('email');
  const mode = document.getElementById('mode').value;
  const newContact = {
    firstName: firstName.value,
    lastName: lastName.value,
    phoneType: phoneType.value,
    phoneNumber: phoneNumber.value,
    email: email.value,
  };
  console.log(newContact);
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  if (mode === 'E') {
    contacts = contacts.filter(contact => contact.phoneNumber !== newContact.phoneNumber);
  }
  localStorage.setItem('contacts', JSON.stringify([...contacts, newContact]));
  formModal.hide();
  document.getElementById('contactForm').reset();
  showContacts();
}

const deleteContact = (phoneNumber) => {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts = contacts.filter(contact => contact.phoneNumber !== phoneNumber);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  showContacts();
}

const editContact = (phoneNumber) => {
  document.getElementById('mode').value = 'E';
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const contact = contacts.find(contact => contact.phoneNumber === phoneNumber);
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const phoneType = document.getElementById('phoneType');
  const phoneNumberField = document.getElementById('phoneNumber');
  const email = document.getElementById('email');
  firstName.value = contact.firstName;
  lastName.value = contact.lastName;
  phoneType.value = contact.phoneType;
  phoneNumberField.value = contact.phoneNumber;
  email.value = contact.email;
  formModal.show();
}

showContacts();