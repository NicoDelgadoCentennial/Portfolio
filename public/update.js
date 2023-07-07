// Retrieve the id from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('identifier');
fetchContactById(id);


const updateButton = document.getElementById('updateButton');
const cancelButton = document.getElementById('cancelButton');
const deleteButton = document.getElementById('deleteButton');
const updateForm = document.getElementById('updateForm');


function fetchContactById(contactId) {
    fetch(`/contacts/${contactId}`)
      .then(response => response.json())
      .then(contact => {
        if (contact) {
          console.log(contact.email)
          populateContactForm(contact);
        } else {
          console.log('Contact not found');
        }
      })
      .catch(error => console.error('Error:', error));
  }

  function populateContactForm(contact) {
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;
  }

cancelButton.addEventListener('click', event => {
event.preventDefault(); // Prevent the default form submission
window.location.href = '/business';
});

cancelButton.addEventListener('click', event => {
event.preventDefault(); // Prevent the default form submission
window.location.href = '/business';
});


function deleteContact(id) {
    fetch(`/contacts/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
    window.location.href = '/business'; 
  }

  deleteButton.addEventListener('click', event => {
    event.preventDefault(); // Prevent the default form submission
    deleteContact(id);
    window.location.href = '/business';
    });


updateButton.addEventListener('click', event => {
  event.preventDefault(); // Prevent the default form submission
  
  const updatedContact = {
    name: updateForm.name.value,
    email: updateForm.email.value,
    phone: updateForm.phone.value,
  };
  
  fetch(`/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedContact),
  })
    .then(response => response.json())
    .then(updatedContact => {
      console.log('Contact updated:', updatedContact);
      // Redirect to the business contact page
      window.location.href = '/business';
    })
    .catch(error => console.error('Error:', error));
});
