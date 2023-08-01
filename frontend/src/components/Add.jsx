import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
//in doing api request make the function async
const Add = () => {
  const[book,setBook]=useState({
    title:"",
    desc:"",
    price:null,
    cover:"",
  });

const navigate  = useNavigate();

const handleClick=async (e)=>{
  e.preventDefault()
  try{
    await axios.post("http://localhost:8000/books",book)
    navigate("/")//if everything goe sfine navigate to home page
  }catch(err){
    console.log(err)
  }
} 

const handleChange=(e)=>{
  setBook((prev)=>({...prev,[e.target.name]:e.target.value}));
};

  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" placeholder='Title' onChange={handleChange} name="title"/>
      <input type="text" placeholder='Description' onChange={handleChange} name="desc"/>
      <input type="number" placeholder='Price' onChange={handleChange} name="price"/>
      <input type="text" placeholder='Cover' onChange={handleChange} name="cover"/>

      <button  className='formbutton' onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add
