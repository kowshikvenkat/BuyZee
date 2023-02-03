import React, { Component } from 'react'
import axios from 'axios'
export default function Grocery({data}){
    const [grocery,setgrocery] = React.useState([])
React.useEffect(()=>{
     axios({
    method: "GET",
    url: "http://localhost:5000/groceries",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
   
       
       setgrocery(res.data.status)
      

  });
},[])
React.useEffect(()=>{
    console.log(grocery)
})
function fetchgrocery(){
    for(let i=0;i<grocery.length;i++){
        
    }
}
return(
    <div>
         <div className='d-flex flex-column' style={{}}>
       <div  style={{display:'flex',flex:1 ,alignItems:'center',marginBottom:10}}> 
       <h2 className='mx-2'>Grocery</h2> <div style={{width:20,height:20,borderRadius:"50%",backgroundColor:'white',border:"2px solid grey",marginLeft:20}}></div> <hr style={{flexGrow:1,border:"3px solid black"}}  /></div>
     
        </div>
    </div>
)
}