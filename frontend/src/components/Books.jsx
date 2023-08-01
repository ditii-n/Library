//axios is used to make api requests

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import Update from './Update';

const Books = () => {
const [books,setBooks]=useState([])

useEffect(()=>{
    const fetchAllBooks=async()=>{
      try{
        const res=await axios.get("http://localhost:8000/books")
        //console.log(res)
        setBooks(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllBooks();
},[]);
//[] in useeffect means it is going to run only once and not everytime we render our react app
//console.log(books);
//api request is always asynchronous


const handleDelete=async(id)=>{
  try{
    await axios.delete("http://localhost:8000/books/"+id)
    window.location.reload();

  }catch(err){
    console.log(err)
  }

}

  return (
    <div>
      <h1>Blossoms Book House</h1>
      <div className="books">
        {books.map((book)=>(
          <div className='book' key={book.id}>
            {book.cover && <img src={book.cover} alt=""/>}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
            <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button><Link to="/add">Add a new book</Link></button>
    </div>
  )
}

export default Books
