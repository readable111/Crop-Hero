var mysql = require('mysql')
const express = require('express')
const fs = require('fs')
const crypto = require('crypto')
const { auth, requiresAuth } = require('express-openid-connect')
const dotenv = require('dotenv')

dotenv.config()

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'CBBwPxvnwu8abEKR7OGhyF9ci8tfokvc',
  issuerBaseURL: 'https://dev-00e0exzucdhwq0a0.us.auth0.com'
};

const app = express() 




app.use(auth(config))
var connection=mysql.createConnection({

  host:process.env.DB_HOST_URL, 
  user:process.env.DB_ADMIN_USER, 
  password:process.env.DB_ADMIN_PASSWORD, 
  database:"db_cropdev", 
  port:3306, 
  ssl:{
    ca:fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")
    }
});

connection.connect();
app.get('/profile',requiresAuth(),(req, res)=> {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/sub',(req,res)=>{
  connection.query("SELECT * FROM tbl_subscribers;", (error, results, fields)=>{
    res.json(results)
    res.send(200)
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
