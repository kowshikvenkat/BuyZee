import React, { Component } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import back from './back.png'
import downarrow from './down.png'
import creditcard from './visa.png'
import upiimg from './online-payment.png'
import cashimg from './cash-payment.png'
import contact from './telephone-call.png'
import cart from './carts.png'
import logo from './b.png'
export default function Billing(){
    const navigate = useNavigate()
    const location = useLocation()
    const[products,setproducts] = React.useState([])
   const[card,setcard] = React.useState(false)
      const[upi,setupi] = React.useState(false)
         const[cash,setcash] = React.useState(false)
    React.useEffect(()=>{
    
  axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
       setproducts(res.data.status)
       setcartdata(location.state.data)
       
  });
},[])
const[cartdata,setcartdata] = React.useState([])
const[boughtitemno,setboughtitemno] = React.useState([])
const[pricel,setpricel] = React.useState([])
const[qty,setqty] = React.useState([])
const[totpay,settotpay] = React.useState()
let pricing= React.useRef([])
let counting= React.useRef([])
const[ishovering,setishovering] = React.useState(false)
React.useEffect(()=>{
  
if(products.length>0){

    for(let i =0;i<products.length;i++){
    if(cartdata.includes(products[i]['_id'])){
    setboughtitemno((e)=>e.concat(i))
     setpricel((e)=>e.concat(products[i]['price']))     
     setqty((e)=>e.concat(1))
    }
}
}
},[products.length>0])
let sum = React.useRef()
React.useEffect(()=>{
     sum.current=0;
   for(let i =0;i<pricel.length;i++){
    sum.current += pricel[i]
   }
settotpay(sum.current)

})
function cardpay(e){
  e.preventDefault()
   axios.post("http://localhost:5000/orderplaced",{
 orders:cartdata, 
 email:sessionStorage.getItem('email')
})
if(e.target.elements.output.value==123456789){
      navigate('/orders',{state:{data:cartdata}})
  }

}
    return(
        <div className=''>
            <div className='d-flex justify-content-center align-items-center text-primary my-2'><h2 style={{fontFamily:'Times New Roman',letterSpacing:'12px',fontSize:35,}} >
            <img className='mx-3 mb-2' src={cart} width={40} height={40} alt="" /> 
            BILLING
            <img className='mx-1 mb-2' src={logo} width={30} height={30} alt=""  />
            </h2>
            
            </div>
              <button className='backbutton btn btn-outline-primary mx-3' onClick={()=>navigate('/',{state:{data:cartdata}})}> <img width={20} height={20}  src={back} alt="" /> Go back </button>
            <div className='text-center d-flex flex-column mx-5 my-5' style={{boxShadow:'0 0 10px grey',borderRadius:10,backgroundImage:'linear-gradient(to bottom,white,white,#FFD580'}}>
                 <h5 className='ordersummary'>ORDER SUMMARY</h5>
                 <div className='d-flex justify-content-around w-100' style={{flexWrap:'wrap'}}>
         { boughtitemno.map((i,index)=>
        <div className='m-2' >
            <div className='bg-light m-2  border '  style={{boxShadow:'0 0 5px grey',flexWrap:'wrap',display:'inline-flex',justifyContent:'center',width:'18rem',borderRadius:20}}>
                 <div style={{borderBottom:'2px solid grey'}} className='d-flex  w-100' key={index}>
                    <img style={{borderRight:'1px solid grey'}} width={150} height={150} src={products[i]['img']} alt="" />
                    <div className='d-flex w-100  flex-column  '>
                        <div className='d-flex p-1'><h6 className='threelinetext p-1 ' style={{marginLeft:-1}}><b>{products[i]['name']}</b></h6></div>
                        <div className='d-flex justify-content-center w-100'>
                        <h6>Brand : </h6><h6 >&nbsp; <i>{products[i]['brand']}</i></h6>  </div>
                        <div className='d-flex justify-content-center text-success w-100'>
                        <h6>Rs .&nbsp; </h6><h6 > <i>{products[i]['price']}</i></h6>  </div></div>
                   
                 </div>    
              <div className='d-flex justify-content-center  align-items-center'>
                  <p className=' my-2'>QTY : &nbsp;</p> <input type="number" min={1} max={5} onChange={(e)=>{ 
                    
                    if(e.target.value>0&&e.target.value<6){
                    counting.current= qty.slice();counting.current.splice(index,1,e.target.value); setqty(counting.current )  ;pricing.current= pricel.slice();pricing.current.splice(index,1,e.target.value*products[i]['price']); setpricel(pricing.current )}}} value={qty[index]} style={{width:"50%",textAlign:'center',height:"50%"}} />
              </div>
            
            </div>
              <div><button onClick={(iv)=>{ 
                
                 setcartdata((curret)=>curret.filter((id)=>id!==products[i]['_id'])); setboughtitemno((curret)=>curret.filter((id)=>id!==boughtitemno[index]));setpricel((curret)=>curret.filter((id)=>id!==pricel[index]));
                 if(pricel.length==1){
                  navigate('/')
                 }
                 }} className='btn btn-warning'>Cancel</button></div>
            </div>
         )}

     
                 </div>
                 <h3 className='m-5'>Total Pay : <b> Rs {sum.current}</b></h3>
                 <div style={{border:'2px dashed grey'}}></div>
                 <div className='p-5'>
          
                  <h3 className='text-primary'> <i>Payment</i> </h3>

                    <form action="" onSubmit={cardpay} className='m-5'>
                 <div className='d-flex flex-column align-items-start p3'>
                    <label htmlFor=""> <h5>1) <img src={creditcard} width={40}height={40} alt="" />   Credit / Debit / BAJAJ EMI CARD <img onClick={()=>{setcard(true);setupi(false);setcash(false)}} style={{cursor:'pointer'}} src={downarrow}width={30}height={30}   /> </h5></label>
                   {card==true&&<div className='d-flex flex-column align-items-center '><input className='payment m-3 text-center' placeholder="1221-1221-1221-1221" name="output" style={{borderRadius:10,height:40}} type="text" required />
                   <input type="submit" className='btn btn-primary' style={{}} value="Pay" /></div>}
                 </div>
                    </form>
                      <form action="" onSubmit={cardpay} className='m-5'>
                 <div className='d-flex flex-column align-items-start p3'>
                    <label htmlFor=""> <h5>2) <img src={upiimg} width={40}height={40} alt="" /> GPay / PhonePe <img onClick={()=>{setcard(false);setupi(true);setcash(false)}} style={{cursor:'pointer'}} src={downarrow}width={30}height={30}   /> </h5></label>
                   {upi==true&&<div className='d-flex flex-column align-items-center '><input className='payment m-3 text-center' placeholder="Enter UPI N0." name="output" style={{borderRadius:10,height:40}} type="text" required />
                   <input type="submit" className='btn btn-primary' style={{}} value="Pay" /></div>}
                 </div>
                    </form>
                      <form action="" onSubmit={cardpay} className='m-5'>
                 <div className='d-flex flex-column align-items-start p3'>
                    <label htmlFor=""> <h5>3) <img src={cashimg} width={40}height={40} alt="" />Cash On Delivery<img onClick={()=>{setcard(false);setupi(false);setcash(true)}} style={{cursor:'pointer'}} src={downarrow}width={30}height={30}   /> </h5></label>
                    <input type="number" value={123456789} hidden name="output" />
                   {cash==true&&<div className='d-flex flex-column align-items-center '>
                   <input type="submit" className='btn btn-primary' style={{width:100,height:50}} value="Order" /></div>}
                 </div>
                    </form>
          
                 </div>
            </div>
            <div className='footer' style={{borderTop:'2px solid black'}}>
               <div className='d-flex align-items-start justify-content-between w-100  mx-3 ' >
   <div className='d-flex align-items-start'>
     <img className='mx-3' width={30} height={30} src={contact} alt="" />
    <p  onMouseOver={()=>setishovering(true)} onMouseLeave={()=>setishovering(false)} className="my-1">Contact</p>
      {ishovering&& <p class="text-muted" style={{position:'absolute',marginTop:-20,marginLeft:40,fontSize:12,border:'1px solid black',marginRight:10,transitionDuration:5,borderRadius:5,transition:3,padding:2,backgroundColor:'white'}}>022-3043-0101</p>}
   </div>
        <div className='footer_fields  w-50'>
        
          <h6>About Us</h6>
          <h6>Careers</h6>
          <h6>Press Releases</h6>
          <h6>BuyZee sciences</h6>
        </div>
   </div>
            </div>
        </div>
    )
}