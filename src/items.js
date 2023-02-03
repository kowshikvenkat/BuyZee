import React, { Component } from 'react'
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom';
import back from './back.png'
import './item.css'
import freedelivery from './fast-delivery.png'
import pay from './hand.png';
import replacement from './replacement.png'
import buyzeedelivered from './ingot.png'
import cart from './shopping-cart.png'
import buy from './buy.png'
import logo from './b.png'
export default function Items(props){
    const navigate = useNavigate();
const location = useLocation();
React.useEffect(()=>{
    
  axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
       setproducts(res.data.status)
  
  });
},[])

const [products,setproducts] = React.useState([])
const[displayid,setdisplayid] = React.useState("")
let item = React.useRef({})
const[headname,setheadname] = React.useState('')
const[cartdatas,setcartdatas] = React.useState([])
let related = React.useRef([])
React.useEffect(()=>{
   setdisplayid(location.state.id)

   for(let i=0;i<products.length;i++){
    if(products[i]['_id']==displayid){
      item.current = products[i] 
    }
   }
     for(let i=0;i<products.length;i++){
     if(products[i]['Category']==item.current.Category){
         if(products[i]['_id']==item.current['_id']){

         }else{
        related.current = related.current.concat(products[i])    }
    }
 
  }
console.log(item.current)

},[products.length>0])
React.useEffect(()=>{
setcartdatas(location.state.data)

},[products.length>0])
 function addtocart(e){
    if(cartdatas.includes(e)){
      setcartdatas((curret)=>curret.filter((id)=>id!==e))
    }else{
         console.log(e)
    setcartdatas(cartdatas.concat(e))
   }}
    return(
    <div>
    <h1 className='d-flex justify-content-center text-danger' style={{fontFamily:'Times New Roman'}}>{item.current.brand} - {item.current.name!==undefined&&item.current.name.split("|")[0]}</h1>
     <button className='backbutton btn btn-outline-primary' onClick={()=>navigate('/',{state:{data:cartdatas}})}> <img width={20} height={20}  src={back} alt="" /> Go back </button>
     <div className='d-flex m-2 items' style={{boxShadow:'0 0 5px grey'}}>
     <div className='d-flex w-100 h-100 border'>
        <img style={{objectFit:'cover',width:"100%"}}  src={item.current.img} alt="" />
     </div>
     <div className='d-flex mx-2 flex-column ' >
<div>
    <h4 className='twolinetext'>{item.current.name}</h4>
    <h4 className='d-flex'><b>Brand : {item.current.brand}</b></h4>
    <h4 className='d-flex  m-0'>{[...Array(item.current.review)].map((star,index)=>
           <p className=' align-self-end ' style={{color:'orange'}} key={index}>&#9733;</p>
         )}</h4>
</div>
<hr />

<div className='d-flex flex-column'><h4 className='text-success '>Rs . {item.current.price}</h4>
</div>
<div className='d-flex  flex-column align-items-center'>
    <p>Inclusive of all taxes .</p>
    <ul>
        <li><b>EMI</b> starts from Rs . {item.current.price*(30/100)}</li>
    </ul>
</div>
<hr />

<div className='d-flex justify-content-around desc'>
   <div>
    <img  src={freedelivery} alt="" />
    <p>Fast Delivery</p>
</div>
 <div>
    <img src={pay} alt="" />
    <p>Pay on Delivery</p>
</div>
 <div>
    <img src={replacement} alt="" />
    <p>7 days replacement</p>
</div>
 <div>
    <img src={buyzeedelivered} alt="" />
    <p>BuyZee Delivered</p>
</div>
</div>
<hr />

<div>
    <h3 className='mx-1'>Specification</h3>
    <div className='mx-5' >
    <h5 ><b>{item.current.specification!==undefined &&Object.keys(item.current.specification)[0]}</b> : <i style={{fontWeight:'400'}}>{item.current.specification!==undefined &&Object.values(item.current.specification)[0]}</i></h5>
        <h5><b>{item.current.specification!==undefined &&Object.keys(item.current.specification)[1]}</b> : <i style={{fontWeight:'400'}}>{item.current.specification!==undefined &&Object.values(item.current.specification)[1]}</i></h5>
            <h5><b>{item.current.specification!==undefined &&Object.keys(item.current.specification)[2]}</b> : <i style={{fontWeight:'400'}}>{item.current.specification!==undefined &&Object.values(item.current.specification)[2]}</i></h5>
                <h5><b>{item.current.specification!==undefined &&Object.keys(item.current.specification)[3]}</b> : <i style={{fontWeight:'400'}}>{item.current.specification!==undefined &&Object.values(item.current.specification)[3]}</i></h5>
                    <h5><b>{item.current.specification!==undefined &&Object.keys(item.current.specification)[4]}</b> : <i style={{fontWeight:'400'}}>{item.current.specification!==undefined &&Object.values(item.current.specification)[4]}</i></h5></div>
</div>
<hr />
<div>
     <h3 className='mx-1'>About this Item</h3>
  <div>
    <ul>
     {item.current['about item']!==undefined &&Object.values(item.current['about item']).map((value,index)=>
          <li key={index}>{value}</li>
     )}
    </ul>
  </div>
</div>
     </div>
     </div>
     <div className='d-flex flex-column align-items-center ' style={{}}>
    <button className='w-50 btn btn-warning' onClick={()=>{setcartdatas((e)=>e.concat(displayid));if(cartdatas.includes(displayid)){
      navigate('/login',{state:{data:cartdatas}})
    }}}>Buy Now <img className='mx-2' width={20} height={20} src={buy} alt="" /></button>
    {cartdatas.includes(item.current['_id']) &&<button onClick={()=>addtocart(item.current['_id'])} style={{backgroundColor:'lime',color:'white'}} className='w-50 my-3 btn'>In the Cart <img width={20} height={20} src={cart} alt="" /></button>}
   {!cartdatas.includes(item.current['_id']) && <button onClick={()=>addtocart(item.current['_id'])} className='w-50 my-3 btn btn-primary'>Add to Cart <img width={20} height={20} src={cart} alt="" /></button>
    }

     </div>
       <div onClick={(()=>navigate('/',{state:{data:cartdatas,category:item.current['Category']}}))} className='w-100 scrollbarstyle my-2' style={{display:'flex',overflowX:'auto',flexWrap:'nowrap',border:'2px solid grey',boxShadow:'0 0 10px grey',backgroundImage:"linear-gradient(to right, white,grey,white)"}}>
       <h4 className='mx-3' style={{fontFamily:"Times New Roman",fontWeight:'700',color:'purple'}}>Related Products </h4>
{related.current.map((value)=>


         <div  class="card mx-2 h-100 my-3 mb-5" style={{width: "18rem",display:'inline-flex',flexShrink:0}}>
 <img class=" " style={{height:200,objectFit:'contain'}} src={value.img} alt="Card image cap" />
   <div class="card-body">
    <h5 class="card-title twolinetext">{value.name}</h5>
    <p class="card-text">Brand : {value.brand}</p>
    <p class="card-text text-success">Rs.{value.price}</p>
  </div>
         </div>
)}</div>
<div className='footer mt-5'>
    
<div className='d-flex justify-content-center mb-5'><img width={50} height={50} src={logo} alt="" /><h2>BuyZee</h2> <select className='mx-3' name="lang" id="lang"><option value="English">English</option></select></div>
<div className='d-flex justify-content-around'>
  <p>Australia</p>
  <p>India</p>
  <p>England</p>
  <p>Canada</p>
  <p>Sri lanka</p>
  <p>Singapore</p>
  <p>China</p>
</div>
</div>
<div className='copyrights bg-dark'>
    <p>BuyZee Pvt Ltd</p>
  <p>© 1996-2023, BuyZee.com, Inc. or its affiliates</p>
</div>
    </div>
)
}
