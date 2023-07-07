document.addEventListener('DOMContentLoaded', fetchContacts);

function fetchContacts() {
  fetch('/contacts')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data && data.length > 0) {
        displayContacts(data);
      } else {
        console.log('No contacts found. 1');
      }
    })
    .catch(error => console.error('Error:', error));
}

function displayContacts(contacts) {
  if (!contacts || contacts.length === 0) {
    console.log('No contacts found. 2');
    return;
  }

  contacts.sort((a, b) => a.name.localeCompare(b.name));

  const contactsBody = document.getElementById('contactsBody');

  contacts.forEach(contact => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>
        <button onclick="updateContact('${contact._id}')">Update</button>
        <button onclick="deleteContact('${contact._id}')">Delete</button>
      </td>
    `;
    contactsBody.appendChild(row);
  });
}
function updateContact(id) {
  window.location.href = `/update?identifier=${id}`;
}

function deleteContact(id) {
  fetch(`/contacts/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
  window.location.href = '/business'; 
  
}
