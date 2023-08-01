import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
  const[book,setBook]=useState({
    title:"",
    desc:"",
    price:null,
    cover:"",
  });

  const navigate=useNavigate();
  const location=useLocation();

  const bookId=location.pathname.split("/")[2]
  //console.log(location.pathname.split("/")[2])

  const handleClick=async(e)=>{
    e.preventDefault()
    try{
      await axios.put("http://localhost:8000/books/"+bookId,book)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  const handleChange=(e)=>{
    setBook((prev)=>({...prev,[e.target.name]:[e.target.value]}))
  }

  return (
    <div className='form'>
      <h1>Update Book</h1>
      <input type='text' placeholder='Title' onChange={handleChange} name="title"/>
      <input type='text' placeholder='Description' onChange={handleChange} name="desc"/>
      <input type='text' placeholder='Price' onChange={handleChange} name="price"/>
      <input type='text' placeholder='Cover' onChange={handleChange} name="cover"/>

      <button className='formbutton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update
