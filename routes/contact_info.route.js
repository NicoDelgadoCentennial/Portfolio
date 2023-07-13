module.exports = (app)=>{
    const contacts = require('../controllers/contact_info.controller');
  
    app.post('/contacts_info', contacts.create);
    app.post('/contacts_info/email/', contacts.findOne);
    app.get('/contacts_info', contacts.findAll);
    app.get('/contacts_info/:id', contacts.findById);
    app.put('/contacts_info/:id', contacts.update);
    app.delete('/contacts_info/:id', contacts.delete);
  }