const mongoose = require('mongoose');

const ContactInfoSchema = mongoose.Schema({
    firstName : {type : String, 
                required : true},
    lastName : {type : String, 
                required : true},
    phone : {type : Number, 
            required : true},
    email: {type : String, 
            unique : false, 
            required : true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
    message : {type : String, 
            required : true},
    
},
{
    timestamps:true
}
);
module.exports = mongoose.model('ContactInfo', ContactInfoSchema);