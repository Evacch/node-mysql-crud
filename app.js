const express = require('express');
const mysql = require('mysql');

//create db connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user:'root',
    password: 'password',
    database: 'nodemysql'
});

//connect to db
db.connect((err) => {
    if(err) throw err;
       console.log("Mysql Connected...");  
});

//set up express server
var app = express();

//ROUTE
//create db
app.get('/createdb', (req, res) => {
   let query = 'CREATE DATABASE nodemysql';
   db.query(query, (err, result) => {
       if(err)throw err;
            console.log(result);
            res.send('Database created...');
   })
});

//create db table
app.get('/createposttable', (req, res) => {
    let query = 'CREATE TABLE posts(id int AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))';
    db.query(query, (err, result) =>{
       if(err) throw err;
       console.log(result);
       res.send('Posts table created');
    });
})

//insert post data (1)
app.get('/addpost1', (req, res) => {
    let post1 = {title: 'Post One', body: 'This is post one'};
    //? - placeholder
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post1, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('Post one added');    
    });
});

//retrieve posts from db
app.get('/getposts', (req, res) => {
   let query = 'SELECT * FROM posts';
   db.query(query, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send("Posts fetched"); 
   });
});

//get single post
app.get('/getpost/:id', (req, res) => {
    let query = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(query, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send("Post fetched")
    });
});

//update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = "Updated Title";
    let query = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(query, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send("Post updated");
    });
});

//delete post
app.get('/deletepost/:id', (req, res) => {
    let query = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(query, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send("Post deleted");
    });
});

//start server
app.listen('8080', () =>{
    console.log('Server started on port 8080')
});

module.exports = app;
