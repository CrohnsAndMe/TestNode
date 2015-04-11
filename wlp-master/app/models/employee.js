var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
	firstname: String,
	surname: String,
	email: String
});

module.exports = mongoose.model('Employee', employeeSchema);