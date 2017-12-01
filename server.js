var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser'),
  routes = require('./api/routes/todoListRoutes'),
  cfenv = require('cfenv'),
  oAppEnv = cfenv.getAppEnv();
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;

if(oAppEnv.isLocal === true){
   mongoose.connect('mongodb://localhost/Tododb'); 
}else{
   mongoose.connect(oAppEnv.services.mongodb[0].credentials.uri); 
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(oAppEnv.port, function(){
    console.log('todo list RESTful API server started on: ' + oAppEnv.url);
});
