import express from "express" 
import mysql from "mysql" /*to use import in index.js use type:module in pakage .json */
import cors from 'cors'

const app=express()
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"test"
})

//to use express as middleware otherwise we can't read data from client
app.use(express.json())
app.use(cors())
//The word CORS stands for “Cross-Origin Resource Sharing”. Cross-Origin 
//Resource Sharing is an HTTP-header based mechanism implemented by the browser 
//which allows a server or an API(Application Programming Interface) to indicate any origins 
//(different in terms of protocol, hostname, or port) other than its origin from which the unknown origin 
//gets permission to access and load resources. The cors package available in the npm registry is used 
//to tackle CORS errors in a Node.js application. 

app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books",(req,res)=>{
    const q="SELECT * from test.books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//if there is a auth problem then use this
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root123'

app.post("/books",(req,res)=>{
    const q="INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)"
    //const values=["title from backend","desc from backend","cover pic from backend"]
    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price 
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.delete("/books/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="DELETE FROM books WHERE id=?" //writhing ? means we can't pass directy the id we will fetch it
    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("deleted successfully")
    })
})

app.put("/books/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="UPDATE books SET `title`=?, `desc`=? , `price`=?,`cover`=? WHERE id=?";
    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]
    db.query(q,[...values,bookId],(err,data)=>{  //...vlaues is to show previos value before updation
        if(err) return res.json(err);
        return res.json("Book has been updated successfully.");
    });
});

app.listen(8000,()=>{
    console.log("connected to backend")
})