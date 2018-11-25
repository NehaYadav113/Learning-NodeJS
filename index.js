let express = require('express');
let app = express();
let mon = require('mongoose');
mon.connect("mongodb://nehayadav113:10000000000neha@ds025409.mlab.com:25409/learning", { useNewUrlParser: true });
var db = mon.connection;

db.once('open', function(){
	console.log('connected');
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('API is running on port', app.get('port'))
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let userSchema = mon.Schema({username:String, password:String});
let user = mon.model('user', userSchema);

app.get('/', function(req, res){
	let id = req.query.id;
	let name = req.query.name;
	res.send('id is ' + id + ' name is ' + name);

});
 
app.post('/neha', function(req, res){
	let id = req.body.id;
	for(var i=0; i<10000; i++){
		id++;
	}

	res.send(''+id);
});

app.post('/signup', function(req, res){
	let username = req.body.username;
	let password = req.body.password;
	let usr = new user({username:username, password:password});
	usr.save(function(err, usr){
		if(err){
			res.send({"code":1});
		}else{
			res.send({"code":0});
		}
	})
});


app.post('/login', function(req, res){
	let username = req.body.username;
	let password = req.body.password;
	user.findOne({username: username, password: password}, function(err, info){
		if(info){
			res.send({"code":0});
		}else{
			res.send({"code":1});
		}
	});

	
});

