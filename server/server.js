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
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
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
