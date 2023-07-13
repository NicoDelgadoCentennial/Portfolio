const Contact = require('../models/contact_info.model')

exports.findAll = (req, res) =>{
    Contact.find().then(contacts => {
        res.send(contacts)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}


exports.create = (req, res) => {
  if (!req.body.firstName) {
    return res.status(400).send({
      message: "First Name cannot be empty"
    });
  }
  if (!req.body.lastName) {
    return res.status(400).send({
      message: "Last Name cannot be empty"
    });
  }
  if (!req.body.phone) {
    return res.status(400).send({
      message: "Phone cannot be empty"
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: "Email cannot be empty"
    });
  }
  if (!req.body.message) {
    return res.status(400).send({
      message: "Message cannot be empty"
    });
  }

  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone:  req.body.phone,
    email: req.body.email,
    message: req.body.message
  });

  contact.save()
    .then(() => {
        res.send(`
          <script>
            alert('Thank you! Your message has been saved.');
            window.location.href = '/contact';
          </script>
        `);
      })
    .catch(error => {
        let errorMessage = "An error occurred";
        res.status(500).send({
            message:"someting went wrong while inserting data"
        })
    });
};

exports.findById = (req, res) => {
    const contactId = req.params.id;
  
    Contact.findById(contactId)
      .then(contact => {
        if (!contact) {
          res.status(404).json({ message: 'Contact not found' });
        } else {
          res.json(contact);
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Something went wrong', error: err });
      });
  };

exports.findOne = (req, res) => {
    const email = req.body.email;

    Contact.findOne({ email: email })
    .then(contact => {
        if(!contact){
            res.status(400).send(
                {
                    'message' : 'Contact not available', 
                    'error' : err
                }
            )
        }
        res.send(contact)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.update = (req,res) =>{
    if (!req.body.firstName) {
        return res.status(400).send({
          message: "First Name cannot be empty"
        });
      }
      if (!req.body.lastName) {
        return res.status(400).send({
          message: "Last Name cannot be empty"
        });
      }
      if (!req.body.phone) {
        return res.status(400).send({
          message: "Phone cannot be empty"
        });
      }
      if (!req.body.email) {
        return res.status(400).send({
          message: "Email cannot be empty"
        });
      }
      if (!req.body.message) {
        return res.status(400).send({
          message: "Message cannot be empty"
        });
      }

    const id =req.params.id;

    Contact.findByIdAndUpdate(id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone:  req.body.phone,
        email: req.body.email,
        message: req.body.message
    },{new:true}).then(contact =>{
        res.send(contact)
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.delete = (req,res) =>{
    const id =req.params.id;
    Contact.findByIdAndRemove(id).then(contact =>{
        res.send({
            'message':'Removed!!'
        })
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}