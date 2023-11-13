const express = require('express');
const app = express();
const http = require('http').Server(app);

// http://localhost:3000/

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
