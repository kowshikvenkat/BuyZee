import React, { Component } from 'react';
import axios from 'axios';
export default function Connection(){
      var ff ;
 React.useEffect(()=>{
 
     axios({
    method: "GET",
    url: "http://localhost:5000/groceries",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
   
      console.log(res.data.status)
       

  });
},[])
 React.useEffect(()=>{
 
     axios({
    method: "GET",
    url: "http://localhost:5000/pharmacy",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
   
      console.log(res.data.status)
       

  });
},[])
 React.useEffect(()=>{
 
     axios({
    method: "GET",
    url: "http://localhost:5000/shoe",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
   
      console.log(res.data.status)
       

  });
},[])
 React.useEffect(()=>{
 
     axios({
    method: "GET",
    url: "http://localhost:5000/jacket",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
   
      console.log(res.data.status)
       

  });
},[])
const[groceries,setgroceries] = React.useState([])
const[pharmacy,setpharmacy] = React.useState([])
const[shoe,setshoe] = React.useState([])
const[jacket,setjacket] = React.useState([])
// React.useEffect(()=>{
//     for(let i =0;i<groceries.length;i++){
//         console.log(Object.keys(groceries[i]['specification'])[0],":",Object.values(groceries[i]['specification'])[0])
//     }
// })
    
     

return(
    <>
        {}
        <h1>ss</h1>
    </>
)
}