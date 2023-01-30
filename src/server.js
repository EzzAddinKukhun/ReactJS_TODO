const mysql = require('mysql'); 
const express = require('express'); 
let app = express(); 
const cors = require('cors'); 
app.use(cors())
// const bodyparser = require('body-parser'); 
// app.use(bodyparser.json); 


let mysqlConnection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database:'todo_list'
    }
); 
mysqlConnection.connect((err)=>{
    if(!err){
        console.log("CONNECTION SUCCESS")

    }
    else{
        console.log("CONNECTION FAILED")
        console.log(err)
    }
});



app.listen('8000', ()=>{
    console.log("express is running at 8000")
}); 


app.get('/allTodos', (req,res)=>{
    console.log("INSIDE REQ")
    mysqlConnection.query('SELECT * FROM todos', (err,rows,fileds)=>{
        if (!err){
            console.log(rows); 
            // res.send(rows); 
            // res.render('sample_data', {
            //     title: 'ALL_TODO',
            //     action: 'list',
            //     todos: rows
            // })
           return (res.json(rows)); 
        }
        else{
            console.log(err); 
        }
    })
})