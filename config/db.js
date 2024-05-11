var mongoose = require('mongoose');
var URL = 'mongodb://127.0.0.1:27017/test-one-db';
var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
};

mongoose.connect(URL, options, (err, con) => {
    if (err) {
        console.log("mongodb not connected!")
    } else {
        console.log("mongodb connected successfully!")
    }
});


module.exports = mongoose;