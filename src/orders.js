import React, { Component } from 'react'
import axios from 'axios';
import { useLocation ,useNavigate} from 'react-router-dom';
import logo from './b.png';
import contact from './telephone-call.png'
import back from './back.png'
import emailjs from '@emailjs/browser';
import cart from './carts.png'
export default function Orders(){
    let location = useLocation()
    let navigate = useNavigate()
       React.useEffect(()=>{
 
       })
    React.useEffect(()=>{
     
  axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
     setproducts(res.data.status)
  // setcartdata(location.state.data)  
  });
   axios.post("http://localhost:5000/orders",{
                                      
 email:sessionStorage.getItem('email')
}).then(res =>{
    setcartdata(res.data.status)
    
})
},[])



const[orderdelivered,setorderdelivered] = React.useState(false)
const [products,setproducts] = React.useState([])
const[cartdata,setcartdata] = React.useState([])

 let todayorder = React.useRef([])
 let restorder = React.useRef([])
  let todayproducts = React.useRef([])
   let restproducts = React.useRef([])
  const [ishovering,setishovering] = React.useState(false)
React.useEffect(()=>{
const s=new Date()

 cartdata.map((i,index)=>
 {if((s.getMonth()+1==i.createdAt.slice(2,3))&&(s.getFullYear()==i.createdAt.slice(4))){
 
 if(s.getDate()==i.createdAt.slice(0,1)){
       localStorage.setItem('date',i.createdAt)
       todayorder.current =  todayorder.current.concat(i['_id']) 
      todayproducts.current =   todayproducts.current.concat([ i['order'].map((j)=>j)])
              localStorage.setItem('todayorder',todayorder.current)
             
      }
      else if(s.getDate()-1==i.createdAt.slice(0,1)){
        if(s.getHours()<10){
          todayorder.current =  todayorder.current.concat(i['_id']) 
      todayproducts.current =   todayproducts.current.concat([ i['order'].map((j)=>j)])
              localStorage.setItem('todayorder',todayorder.current)
             
        }else if(s.getHours()>=10){
           
                restorder.current = restorder.current.concat(i['_id'])
     restproducts.current =  restproducts.current.concat([i['order'].map((j)=>j  )])
     if(( localStorage.getItem('todayorder')!==null&& localStorage.getItem('todayorder')).length>0)
      {
         let blog = (localStorage.getItem('todayorder'))
       if(restorder.current.includes(blog.split(',')[0])){
        setorderdelivered(true)
       }
      }
        }
      }
       else if(s.getDate()-1>i.createdAt.slice(0,1)){
         
          restorder.current = restorder.current.concat(i['_id'])
     restproducts.current =  restproducts.current.concat([i['order'].map((j)=>j  )])
     if(( localStorage.getItem('todayorder')!==null&& localStorage.getItem('todayorder')).length>0)
      {
         let blog = (localStorage.getItem('todayorder'))
       if(restorder.current.includes(blog.split(',')[0])){
        setorderdelivered(true)
       }
      }
       }
      }
      else {
         restorder.current = restorder.current.concat(i['_id'])
     restproducts.current =  restproducts.current.concat([i['order'].map((j)=>j  )])
     if(( localStorage.getItem('todayorder')!==null&& localStorage.getItem('todayorder')).length>0)
      {
         let blog = (localStorage.getItem('todayorder'))
       if(restorder.current.includes(blog.split(',')[0])){
        setorderdelivered(true)
       }
      }
      }
 }

 )
},[cartdata.length>0])
function orderList(coll){
return(
  <div className='d-flex flex-column'>
 <div className='d-flex flex-column '>
  {todayorder.current.length!==0&& <h2 className='text-center text-primary' style={{fontFamily:'fantasy'}}> Pending Orders</h2>}
{todayorder.current.map((id,index)=>
< >
  <h3 className='text-center'>Order Id : {id}</h3> {todayproducts.current[index].map((j,indexj)=>{
  for(let i=0;i<products.length;i++){
      if(products[i]['_id']===j){
        return(
          <div className='mx-5 my-3' style={{border:'1px solid grey',boxShadow:'0 0 10px grey',borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
          <div className='my-3 d-flex  justify-content-center' style={{borderTop:'1px solid grey ',borderBottom:'1px solid grey '}} >
  <div className="d-flex flex-column justify-content-center h-100 w-100 " style={{borderRight:'1px solid grey'}}>
             
           <br /> <h6 className='px-3'>  {products[i]['name']}</h6>
            <hr />
            <h6 className='px-3 ' ><i>Brand : {products[i]['brand']}</i></h6>
            <h6 className='px-3 text-success'>Rs . {products[i]['price']}</h6>
          
  </div>
  <img  className='w-25' style={{objectFit:'contain'}} height={100} src={products[i]['img']} alt="" />
      
          </div>
          <h6 className='mx-2' style={{color:'green',fontWeight:600}}>
            &#10003; &nbsp; Order Confirmed
          </h6>
          <h6 ><ul >
            <li  style={{color:'grey'}}>{sessionStorage.getItem('address')}</li>
          </ul></h6>
          <div className='d-flex'><h5 className='mx-2' style={{color:'grey',fontWeight:600}}>
            &#10003; &nbsp; Order will be delivered By 
            {cartdata.map((k)=>{
          if(k['_id']==id){
            return(
              <> {Number(k['createdAt'].slice(0,1))+1}</>)}})}
            &nbsp;{
              ['January','February','March','April','May','June','July','August','September','October','November','December'][new Date().getMonth()]
            } &nbsp;10 AM
         
          </h5> <i><p className='text-secondary'> 0 Days :    {(24 - new Date().getHours())+10} Hours  Remaining</p></i></div>
          </div>
        )
      }
  }
  })}
</>
)}
{todayorder.current.length!==0&&
<div className="d-flex justify-content-center my-5">
   <button onClick={()=>navigate('/')} className='btn btn-info w-50 text-light'>Okay</button>
</div>
}
 </div>
 
  <div className='d-flex flex-column '>
 {restorder.current.length!==0&& <h2  style={{fontFamily:'fantasy'}} className='text-center text-success'> Recieved Orders</h2>}
{restorder.current.slice(0).reverse().map((p,index)=>
< >
  <h5 className='text-center'>Order Id : {p}</h5> {restproducts.current[index].map((j,indexj)=>{
  for(let i=0;i<products.length;i++){
      if(products[i]['_id']==j){
        return(
            <div className='mx-5 my-3' style={{border:'1px solid grey',boxShadow:'0 0 10px grey',borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
          <div className='my-3 d-flex justify-content-center' style={{borderTop:'1px solid grey ',borderBottom:'1px solid grey '}}>
  <div className="d-flex flex-column justify-content-center h-100 w-100 " style={{borderRight:'1px solid grey'}}>
         <br />   <h6 className='px-3'>  {products[i]['name']}</h6>
            <hr />
            <h6 className='px-3'>Brand : {products[i]['brand']}</h6>
            <h6 className='px-3 text-success'>Rs . {products[i]['price']}</h6>
            
  </div>
  <img className='w-25' style={{objectFit:'contain'}} height={100} src={products[i]['img']} alt="" />
          </div>
          <h6 className='mx-2' style={{color:'green',fontWeight:600}}>
            &#10003; &nbsp; Order Confirmed
          </h6>
          <h6 ><ul >
            <li  style={{color:'grey'}}>{sessionStorage.getItem('address')}</li>
          </ul></h6>
          <div className='d-flex'><h6 className='mx-2' style={{color:'green',fontWeight:600}}>
            &#10003;&#10003; &nbsp; Order delivered on   </h6>
             <h6 className='mx-2' style={{color:'green',fontWeight:600}}>{cartdata.map((i)=>{
          if(i['_id']==p){
            return(
              <p>{Number(i['createdAt'].slice(0,1))+1}   {
              ['January','February','March','April','May','June','July','August','September','October','November','December'][new Date().getMonth()]
            } &nbsp;10 AM</p>
            )
          }
          })}</h6>
         </div> </div>
        )
      }
  }
  })}
</>
)}
{restorder.current.length!==0&&
<div className="d-flex justify-content-center my-5">
   <button onClick={()=>navigate('/')} className='btn btn-info w-50 text-light'>Okay</button>
</div>
}
 </div>
  </div>
)
}
    return(
        <div >
        <div className='d-flex flex-column align-items-center'>
          
            <h2 style={{fontFamily:'Times New Roman',letterSpacing:'6px',fontSize:35,}} >
            <img className='mx-3 mb-2' src={cart} width={40} height={40} alt="" /> 
            Your Placed Orders
          
            </h2>
             <button className='backbutton btn btn-outline-primary align-self-start mx-3' onClick={()=>navigate('/')}> <img width={20} height={20}  src={back} alt="" /> Go back </button>
        </div>
{orderdelivered&&<div class="d-flex alert alert-warning alert-dismissible fade show" role="alert">
 Your previous order  Id : <strong>{localStorage.getItem('todayorder') }</strong> &nbsp;is&nbsp; <p className='text-success'>successfully delivered!</p> 
  <button type="button" class="btn-close" onClick={()=>{localStorage.removeItem('todayorder');setorderdelivered(false);localStorage.removeItem('date')}} ></button>
</div>}
{orderList('ll')}
<div className='footer d-flex flex-row w-100 justify-content-between' style={{display:'flex',flexWrap:'wrap'}}>
   <div className='d-flex w-100 ' >
     <img className='mx-3' width={30} height={30} src={contact} alt="" />
    <p onMouseOver={()=>setishovering(true)} onMouseLeave={()=>setishovering(false)} className="my-1">Contact</p>
      {ishovering&& <p class="text-muted" style={{position:'absolute',marginTop:-20,marginLeft:40,fontSize:12,border:'1px solid black',marginRight:10,transitionDuration:5,borderRadius:5,transition:3,padding:2,backgroundColor:'white'}}>022-3043-0101</p>}
   </div>
      <div className='footer_fields d-flex flex-row justify-content-end w-100  text-center'>
        <div className=' '>
          <h3>Get to Know Us</h3>
          <h6>About Us</h6>
          <h6>Careers</h6>
          <h6>Press Releases</h6>
          <h6>BuyZee sciences</h6>
        </div>
        <div className=' '>
          <h3>Connect with Us</h3>
          <h6>Instagram</h6>
          <h6>Facebook</h6>
          <h6>LinkedIn</h6>
        </div>
        <div className=' '>
          <h3>Make Money with Us</h3>
          <h6>	Sell on BuyZee</h6>
          <h6>Sell under BuyZee Accelerator</h6>
          <h6>Protect and Build Your Brand</h6>
          <h6>BuyZee Global Selling</h6>
          <h6>Become an Affiliate</h6>
        </div>
        <div className=' '>
          <h3>Let Us Help You</h3>
          <h6>COVID-19 and BuyZee</h6>
          <h6>Your Account</h6>
          <h6>Returns Centre</h6>
          <h6>100% Purchase Protection</h6>
          <h6>BuyZee App Download</h6>
        </div>
</div> <br />

      </div>
      <div className='footer '>
    
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