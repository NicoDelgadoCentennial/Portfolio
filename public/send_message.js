document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
  
    // Convert form data to a JSON object
    const contactData = {};
    for (const [key, value] of formData.entries()) {
      contactData[key] = value;
    }
  
    fetch('/contacts_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  