var express = require('express');
var router = express.Router();
const mysql = require('mysql')

//create a connection pool to access data
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '.amazonaws.com',    //aws RDS endpoint 
    user: '',                   //user name of the database
    password: '',               //password
    database: 'acronym_cracker_database' //database name

})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Please pass in an acronym as a parameter');
});

router.get('/:acronym', (req, res) => {
    pool.getConnection((err, conn) => {
      conn.release()
      if(err){
        res.sendStatus(500)
      }
  
      const queryString = 'SELECT * FROM definitions WHERE acronym = ?'
      const theAcronym = req.params.acronym
      conn.query(queryString, [theAcronym.trim().toLowerCase()], (err, rows) => {
        if(err){
          res.sendStatus(500)
        }
        res.json(rows)
      })
    })
  })
  

module.exports = router;