const express = require('express');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());

server.listen(3000, () => {
    console.log('Start Server : localhost:3000');
});

const users = [
  {
    id : 'aaa',
    name: 'good',
    email: 'whyso@serious.com'
  },
  {
    id : 'bbb',
    name: 'bad',
    email: 'byebye@serious.com'
  }
];


// server.set('views', __dirname + '/views');
// server.set('view engine', 'ejs');
// server.engine('html', require('ejs').renderFile);

// server.get('/', function (req, res) {
//     res.send('index.html');
// })

// server.get('/about', function (req, res) {
//     res.send('about.html');
// })

server.get('/api/user', (req, res)=>{
  res.json(users);
});

server.get('/api/user/:id', (req,res)=>{
  const user = users.find((u)=>{
    return u.id ===  req.params.id;
  })
  if(user){
    res.json(user);
  }else{
    res.status(404).json({errorMessage: "User was not"});
  }
});

server.post('/api/user', (req, res)=>{
  users.push(req.body);
  res.json(users);
});

server.put('/api/user/:id', (req, res)=>{
  let foundIndex = users.findIndex(u => u.id === req.params.id);
  if (foundIndex === -1) {
    res.status(404).json({ errorMessage: "User was not found" });
  }else {
    users[foundIndex] = { ...users[foundIndex], ...req.body};
    res.json(users[foundIndex]);
  }
});

server.delete('/api/user/:id', (req, res)=>{
  let foundIndex = users.findIndex(u => u.id === req.params.id);
  if(foundIndex === -1){
    res.status(404).json({ errorMessage: "User was not found"});
  }else{
    let foundUser = users.splice(foundIndex,1);
    res.json(foundUser[0]);
  }
});


// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : 'secret',
//   database : 'my_db'
// });

// server.get('/db', function (req, res) {
//     pool.getConnection(function(err, connection) {
//         if (err) throw err; // not connected!
       
//         // Use the connection
//         connection.query('select * from Test', function (error, results, fields) {
//           res.send(JSON.stringify(results));
//             // When done with the connection, release it.
//           connection.release();
       
//           // Handle error after the release.
//           if (error) throw error;
       
//           // Don't use the connection here, it has been returned to the pool.
//         });
//       });
// })