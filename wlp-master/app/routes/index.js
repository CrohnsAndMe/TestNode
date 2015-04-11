var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Staffordshire University Workdload Planning System' });
});

/* GET Hello World Page */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', {title: 'Hello, World!'})
  
});

/* GET EmployeeList page */
router.get('/employeelist', function(req, res) {
    var db = req.db;
    var collection = db.get('employeecollection');
    collection.find({},{},function(e,docs){
        res.render('employeelist', {
        	"title" : "WLP Employee List",
            "employeelist" : docs
        });
    });
});

/* GET EmployeeList page */
router.get('/playerlist', function(req, res) {
    var db = req.db;
    var collection = db.get('testData');
    collection.find({},{},function(e,docs){
        res.render('playerlist', {
        	"title" : " Player List",
            "playerlist" : docs
        });
    });
});

/* GET New Employee Page */
router.get('/newemployee', function(req, res) {
	res.render('newemployee', { title: 'Add New Employee'});
});

/* GET New Employee Page */
router.get('/newplayer', function(req, res) {
	res.render('newplayer', { title: 'Add New Player'});
});

/* POST: New Employee Serice */
router.post('/newemployee', function(req, res) {
	var db = req.db;

	// get the form values.
	var firstname = req.body.firstname;
	var surname = req.body.surname;
	var email = req.body.email;

	var collection = db.get('employeecollection');

	// submit to the DB
	collection.insert({
		"firstname" : firstname,
		"surname" : surname,
		"email" : email
	}, function(err, doc){
		if(err){
			// It failed, return an error
			res.send("There was a problem adding the information to the database");
		}
		else
		{
			// It worked, set the header so the address bar doesnt still say /adduser
			res.location('employeelist');
			res.redirect('employeelist');
		}
	})
})

/* POST: New Employee Serice */
router.post('/newplayer', function(req, res) {
	var db = req.db;

	// get the form values.
	var name = req.body.name;
	var ipaddress = req.body.ipaddress;

	var collection = db.get('testData');

	// submit to the DB
	collection.insert({
		"name" : name,
		"ipaddress" : ipaddress
	}, function(err, doc){
		if(err){
			// It failed, return an error
			res.send("There was a problem adding the information to the database");
		}
		else
		{
			// It worked, set the header so the address bar doesnt still say /adduser
			res.location('playerlist');
			res.redirect('playerlist');
		}
	})
})
module.exports = router;
