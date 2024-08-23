var mysql = require('mysql')
const express = require('express')
const fs = require('fs')
const crypto = require('crypto')
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const app = express() 

const jwtCheck = auth({
  audience: 'https://cropauth',
  issuerBaseURL: //,
  tokenSigningAlg: 'RS256'
});

app.use(jwtCheck)
var connection=mysql.createConnection({
  host:"", 
  user:"", 
  password:"", 
  database:"db_cropdev", 
  port:3306, 
  ssl:{
    ca:fs.readFileSync("../DigiCertGlobalRootCA.crt.pem")
    }
});

connection.connect();
app.get('/cropauth/public', function (req, res) {
    res.send('Secured Resource');
});

app.post('./signup',(req,res)=>{
  var email = req.body.email
  var password = req.body.password
  
  
  connection.query("SELECT fld_s_email, fld_s_Password, fld_s_PassSalt FROM tbl_subscribers", (error, results, fields)=>{
    results.forEach(element => {  
      async 
    });

  })

})

 /* 
app.get('/connect', (req, res) =>{

  connection.query('SELECT * FROM tbl_subscribers;', (error, results, fields)=>{
    if (error) throw error;
    res.json(results) 
  })
  res.status(200)
  res.send()
})*/

app.listen(3000)
