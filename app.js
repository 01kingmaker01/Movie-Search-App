const axios = require('axios');
const express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('search');
});

app.get('/results', function (req, res) {
  var title = req.query.name;
  axios
    .get('http://www.omdbapi.com/?s=' + title + '&apikey=thewdb')
    .then((response) => {
      var data = JSON.parse(JSON.stringify(response.data));
      var results = data['Search'];
      res.render('result', { results: results, title: title });
      console.log(results);
      // console.log(data['Search'][8]);
    })
    .catch((error) => console.error(error));
});

app.listen(2000, function () {
  console.log('Server has STARTED!!!');
});
