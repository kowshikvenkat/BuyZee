import React, { Component } from 'react'
import {Routes,Route,Link,NavLink,useLocation,useNavigate} from 'react-router-dom'
import RemainingHome from './remaininghome'
import SelectedCategory from './selectedcategory'
import login from './user.png'
import moon from './moon.png';
import moon1 from './moon (1).png'
import back from './back.png'
import offer from './gift.png'
import contact from './telephone-call.png'
import order from './email.png'
import './App.css'
import search from './zoom.png';
import logo from './b.png'
import cart from './shopping-cart.png'
import axios from 'axios'


export default function Home(){

  const navigate = useNavigate();
  const location = useLocation()
   const[products,setproducts] = React.useState([])
   React.useEffect(()=>{
    let s = new Date()
    console.log('email',sessionStorage.getItem('email'));
       if(sessionStorage.getItem('email')!==undefined&&sessionStorage.getItem('email')!==null&&localStorage.getItem('date')!==undefined && localStorage.getItem('date')!==null){
        if((s.getMonth()+1==localStorage.getItem('date').slice(2,3))&&(s.getFullYear()==localStorage.getItem('date').slice(4))){
           if(s.getDate()-1==localStorage.getItem('date').slice(0,1)&&s.getHours()>=10){
                setnotification(true)
                console.log("notiii")
           }
           else if(s.getDate()-1>localStorage.getItem('date').slice(0,1)){
            setnotification(true)
           }
        }else{
                   setnotification(true)
        }
       }
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
 
       if(      sessionStorage.getItem('firstname')!==null){
      setloginName(sessionStorage.getItem('firstname'))
      }else{
             setloginName('Login')
      }

  });
 
},[])
   
   React.useEffect(()=>{
      for(let i=0;i<products.length;i++){
        if(i==0){    
            categoryTitle.current = categoryTitle.current.concat(products[i]['Category'])
        }
      else if(categoryTitle.current.includes(products[i]['Category'])===false){
     categoryTitle.current = categoryTitle.current.concat(products[i]['Category'])
      }
     }
   },[products.length>0])
   function addtocart(e){
    
    if(cartdata.includes(e)){
      setcartdata((current)=>current.filter((id)=>id!==e))
   
    }else{
    setcartdata(cartdata.concat(e))
   }}

  function Searchbar(coll){
        let y=  coll.charAt(0).toUpperCase()+coll.slice(1)
        
    return(

         <div className=''>
       <button className='backbutton btn btn-outline-primary' onClick={()=>{setselectedcategory("");setinputvalue("")}}> <img style={{backgroundColor:dark?'white':''}} width={20} height={20} src={back} alt="" /> Go back </button>
           <div  style={{display:'flex',flex:1 ,alignItems:'center'}}> 
       <h2 className='mx-2' style={{color:dark?'white':'black'}}>{y}</h2> <div style={{width:20,height:20,borderRadius:"50%",backgroundColor:'white',border:"2px solid grey",marginLeft:20}}></div> <hr style={{flexGrow:1,border:dark?"3px solid white":'3px solid black'}}  /></div>
       <div className='d-flex  my-3' style={{display:'inline-flex',overflowX:'auto',overflowY:'hidden',flexWrap:'wrap'}}>
 
 {     products.map((value,i)=>
              products[i]['Category'] === y &&
                 <div className='mb-5'>
         
        <div class="card mx-2 h-100 my-3" style={{width: "18rem",display:'inline-flex',flexShrink:0}}>
  <img class=" " style={{height:200,objectFit:'contain'}} src={products[i].img} alt="Card image cap" />
  <div onClick={()=>navigate('/items',{state:{id:products[i]['_id'],data:cartdata}})} class="card-body">
    <h5 class="card-title twolinetext">{products[i].name}</h5>
    <p class="card-text">Brand:{products[i].brand}</p>
    <p class="card-text text-success">Rs.{products[i].price}</p>
  </div>
  <div className='d-flex align-self-end   w-100 justify-content-around ' style={{}}>
         {!cartdata.includes(products[i]['_id'])&&<button type="button" class="btn btn-primary my-4" onClick={()=>addtocart(products[i]['_id'])} >Add to cart <img style={{width:20,height:20}} src={cart} alt="" /> </button>}
         {cartdata.includes(products[i]['_id'])&&<button type="button" style={{backgroundColor:'lime',color:'white'}} class="btn  my-4" onClick={()=>addtocart(products[i]['_id'])} >In the cart <img style={{width:20,height:20}} src={cart} alt="" /> </button>}
         <h2 className='d-flex  m-0'>{[...Array(products[i].review)].map((star,index)=>
           <p className=' align-self-end ' style={{color:'orange'}} key={index}>&#9733;</p>
         )}</h2>
         
    </div>
</div>
          </div>
              )}</div></div>
    )

  }

   function fetchCategory(coll){   
        return(
          <div className='w-100 scrollbarstyle ' style={{display:'inline-flex',overflowX:'auto',flexWrap:'nowrap'}}>
          {products.map((value,i)=>
              products[i]['Category'] == coll && 
         <div  class="card mx-2 h-100 my-3 mb-5" style={{width: "18rem",display:'inline-flex',flexShrink:0}}>
  <img class=" " style={{height:200,objectFit:'contain'}} src={products[i].img} alt="Card image cap" />
  <div onClick={()=>navigate('/items',{state:{id:products[i]['_id'],data:cartdata}})} class="card-body">
    <h5 class="card-title twolinetext">{products[i].name}</h5>
    <p class="card-text">Brand:{products[i].brand}</p>
    <p class="card-text text-success">Rs.{products[i].price}</p>
  </div>
  <div className='d-flex align-self-end   w-100 justify-content-around ' style={{}}>
         {!cartdata.includes(products[i]['_id'])&&<button type="button" class="btn btn-primary my-4" onClick={()=>addtocart(products[i]['_id'])} >Add to cart <img style={{width:20,height:20}} src={cart} alt="" /> </button>}
         {cartdata.includes(products[i]['_id'])&&<button type="button" style={{backgroundColor:'lime',color:'white'}} class="btn  my-4" onClick={()=>addtocart(products[i]['_id'])} >In the cart <img style={{width:20,height:20}} src={cart} alt="" /> </button>}
         <h2 className='d-flex  m-0'>{[...Array(products[i].review)].map((star,index)=>
           <p className=' align-self-end ' style={{color:'orange'}} key={index}>&#9733;</p>
         )}</h2>
    </div>    
</div>
            )}
            </div>
        )    
   }
    const images = ["https://m.media-amazon.com/images/I/91xWBRGmh8L._SX3000_.jpg","https://m.media-amazon.com/images/I/81sbyyHpGZL._SX3000_.jpg","https://m.media-amazon.com/images/I/81gFjHyx7mL._SX3000_.jpg","https://m.media-amazon.com/images/I/81KHSBIhFgL._SX3000_.jpg","https://m.media-amazon.com/images/I/81oes79TXcL._SX3000_.jpg"]
    const [loginName,setloginName] = React.useState('')
    const [dark,setdark] = React.useState(false)
    const[startinput,setstartinput] = React.useState(false)
    const[inputvalue,setinputvalue] = React.useState("")
    const[ishovering,setishovering] = React.useState(false)
    const[cartdata,setcartdata] = React.useState([])
    const[image,setimage] = React.useState("")
    const[selectedcategory,setselectedcategory] = React.useState("")
    const[scroll,setscroll] = React.useState(false)
    let sidebar = React.useRef()
    let categoryTitle = React.useRef([])
      let b =React.useRef([])
    let input = React.createRef("")
    let box = React.createRef("")
    const [notification,setnotification] = React.useState(false)
    React.useEffect(()=>{
        const intervalid = setInterval(()=>{
            setimage(images[Math.floor(Math.random()*images.length)])
        
        },5000)
    let s = new Date();
   
    },[])
React.useEffect(()=>{
     sidebar.current=box.current.getBoundingClientRect()

},[scroll])
React.useEffect(()=>{
  if(products.length>0){
   if(location.state!==null){
      if(location.state.category!==undefined){
      let news = location.state.category;
      if(news==="Groceries"){
fetchCategory('groceries');setselectedcategory('groceries')
      }if(news==="Pharmacy"){
        fetchCategory('pharmacy');setselectedcategory('pharmacy')
      }if(news==="Shoe"){
        fetchCategory('shoe');setselectedcategory('shoe')
      }if(news==="Jacket"){
        fetchCategory('jacket');setselectedcategory('jacket')
      }
        
    }
      }
      if(location.state!==null){
        setcartdata(location.state.data)}}
},[products.length>0])
    React.useEffect(()=>{

      const addtocart = document.querySelector('.add_to_cart')
       if(selectedcategory.length>1){
    addtocart.classList.add('isabsolute_categ')
      addtocart.classList.remove('isabsolute')
              addtocart.classList.remove('issticky')
                addtocart.classList.remove('issticky_categ')
  }
  window.addEventListener('scroll',(e)=>{
     setscroll(true)
  if(selectedcategory.length>1){
   if(window.pageYOffset>=sidebar.current.y){
          addtocart.classList.add('issticky_categ')
        addtocart.classList.remove('isabsolute_categ')
   }
  }else{addtocart.classList.remove('isabsolute_categ')
  addtocart.classList.remove('issticky_categ')
    if(window.pageYOffset>=sidebar.current.y){
        addtocart.classList.add('issticky')
        addtocart.classList.remove('isabsolute')
       addtocart.classList.remove('isabsolute_categ')
  addtocart.classList.remove('issticky_categ')
      }else{
        addtocart.classList.add('isabsolute')
        addtocart.classList.remove('issticky')
        addtocart.classList.remove('isabsolute_categ')
  addtocart.classList.remove('issticky_categ')
      }}
    })

  })
  React.useEffect(()=>{
     categoryTitle.current.map(x=>{
    let y=  x.charAt(0).toLowerCase()+x.slice(1)
    b.current= b.current.concat(y)
    })
  },[categoryTitle.current.length>0])
    function darkmode (){
        setdark( !dark)
    }
      
  function textchange(event){
    setinputvalue(event.target.value)
          setstartinput(true)
          if(event.target.value.length===0){
            setstartinput(false)
          }
  }

    const handleSpace=(e)=>{
          if(e.keyCode===13){
        
                setstartinput(false)
         for(let i =0;i<=b.current.length;i++){
           if(inputvalue.trim()===b.current[i]){
         
             setselectedcategory(inputvalue.trim())
           }
         }
          }
    
        }
        
   return(
  //NAVBAR
    <div className={dark?'home-dark':'home'}>
<nav class="nav navbar navbar-expand-lg navbar-light bg-info p-0 h-100" style={{backgroundImage:"linear-gradient(to right, white,cyan,white)",boxShadow:'0 0 10px grey'}}>
<div className='d-flex  align-items-center'>
<div className='d-flex'>
<img className='mx-2' src={logo} alt="" />
  <h3 className='text-success'>BuyZee</h3>
  </div>
  <div className='d-flex align-self-end mt-5 mx-3'>
    <button className='mx-2' onClick={()=>{fetchCategory('groceries');setselectedcategory("groceries")}}> <i>Grocery</i> </button>
     <button onClick={()=>{fetchCategory('pharmacy');setselectedcategory("pharmacy")}}><i>Pharmacy</i></button>
  </div>
</div>

  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse justify-content-end mt-3" id="navbarSupportedContent">
   <div className='d-flex flex-column mx-3 ' onClick={()=>{
       if(sessionStorage.getItem('email')!==null){
 navigate('/orders')
       }
      }}>
      {  notification&&   <p className='bg-danger' style={{borderRadius:'50%',position:'absolute',padding:4,marginTop:-15,width:20,color:'white'}}>1</p>}
      
    <img src={order} alt="" />
    <p>Orders</p>
   </div>
      <div className='d-flex flex-column mx-3' onMouseOver={()=>setishovering(true)} onMouseLeave={()=>setishovering(false)} >
    <img src={contact} alt="" />
    <p id="">Contact</p>
      {ishovering&& <p class="text-muted" style={{position:'absolute',fontSize:12,border:'1px solid black',marginRight:10,transitionDuration:5,borderRadius:5,transition:3,padding:2,backgroundColor:'white'}}>022-3043-0101</p>}
   </div>

    <div className='d-flex flex-column mx-3' >
    <img src={offer} alt="" />
    <p>Offers</p>
   </div>

   {dark==false&&(<div className='d-flex flex-column mx-3' onClick={darkmode} style={{cursor:'pointer'}}>
    <img src={moon} alt="" />
    <p>Light</p>
   </div>)}
   {dark==true&&(<div className='d-flex flex-column mx-3' style={{cursor:'pointer'}} onClick={darkmode}>
    <img src={moon1} alt="" />
    <p>Dark</p>
   </div>)}


   <div onClick={()=>{
     if(      sessionStorage.getItem('firstname')==null){
   navigate('/login',{state:{data:cartdata,loc:'home'}})
     }else if(sessionStorage.getItem('firstname')!==null){
      
        navigate('/logout',{state:{data:cartdata}})
     }
   }} className='d-flex flex-column mx-3'>
    <img src={login} alt="" />
    <p>{loginName}</p>
   </div>
    
  </div>
</nav>
        
<div className='nav d-flex  justify-content-center align-items-center'>
   
       <input type="text" ref={input} value={inputvalue} placeholder='  Search for categories ...' onChange={textchange}  onKeyDown={handleSpace} /> 
    <img src={search}  alt="" style={{position:'absolute',right:"28%",alignSelf:'center'}} />
       
</div>
<div style={{border:startinput?"2px solid tan":'none',marginLeft:"25%",marginRight:"25%",borderBottomLeftRadius:30,borderBottomRightRadius:30,fontSize:15,position:'absolute',width:"50%",zIndex:10000,backgroundColor:'white'}}>
 {startinput && b.current.map((value)=>
        <div className='d-flex justify-content-center ' style={{backgroundColor:dark?'white':'transparent',borderTop:"none"}}>
        <p onClick={()=>{setinputvalue(value);input.current.focus()}} style={{cursor:'pointer'}}>{value}</p>
        </div>
        )}
        </div>
          
       {selectedcategory.length===0&&<div className='d-flex my-5'>
           
                <div className=' d-flex justify-content-center mx-2' ><h3 id="onlyonbuyzee">#OnlyOnBuyZee</h3></div>  
         <div className=' h-20 ' style={{width:"82%"}}>
          <img className='mr-5 ' style={{width:"100%",height:"100%",zIndex:12,boxShadow:'0 0 20px grey'}} src={image} alt="" />
         </div>
            <h1 className='mt-1 mx-0' style={{position:'absolute ',width:"1.5%",right:"11%",color:'white',textShadow:'1px 1px black',cursor:'pointer',zIndex:100}}>X</h1>
        </div>
       }   
        <div className=' d-flex justify-content-end'>
            <button ref={box} className='add_to_cart isabsolute d-flex p-2' onClick={()=>{if(cartdata.length!==0){
      navigate('/login',{state:{data:cartdata}})}}} style={{borderRadius:10,boxShadow:'0 0 5px grey',backgroundColor:'orange',border:'none',fontFamily:'arial'}} ><div> Cart Items </div> <div style={{backgroundColor:'red',width:30,height:30,textAlign:'center',borderRadius:"50%",padding:3,marginLeft:10}}> { cartdata.length } </div></button>
        </div>
       {selectedcategory.length===0&&categoryTitle.current.map((value)=>
       <div className='d-flex flex-column' style={{}}>
       <div  style={{display:'flex',flex:1 ,alignItems:'center'}}> 
       <h2 className='mx-2' style={{color:dark?'white':'black',fontFamily:'Times New Roman'}}>{value}</h2> <div style={{width:20,height:20,borderRadius:"50%",backgroundColor:'white',border:"2px solid grey",marginLeft:20}}></div> <hr style={{flexGrow:1,border:dark?"3px solid white":'3px solid black'}}  /></div>
        <h6 className=''>{fetchCategory(value)}</h6>
        </div>

       )}
       {
        selectedcategory.length>1&&
        <div>{Searchbar(selectedcategory)}</div>
       }
      <div className='footer'>
      <div className='footer_fields text-center'>
        <div>
          <h3>Get to Know Us</h3>
          <h6>About Us</h6>
          <h6>Careers</h6>
          <h6>Press Releases</h6>
          <h6>BuyZee sciences</h6>
        </div>
        <div>
          <h3>Connect with Us</h3>
          <h6>Instagram</h6>
          <h6>Facebook</h6>
          <h6>LinkedIn</h6>
        </div>
        <div>
          <h3>Make Money with Us</h3>
          <h6>	Sell on BuyZee</h6>
          <h6>Sell under BuyZee Accelerator</h6>
          <h6>Protect and Build Your Brand</h6>
          <h6>BuyZee Global Selling</h6>
          <h6>Become an Affiliate</h6>
        </div>
        <div>
          <h3>Let Us Help You</h3>
          <h6>COVID-19 and BuyZee</h6>
          <h6>Your Account</h6>
          <h6>Returns Centre</h6>
          <h6>100% Purchase Protection</h6>
          <h6>BuyZee App Download</h6>
        </div>
</div> <br />
<div className='d-flex justify-content-center'><img width={50} height={50} src={logo} alt="" /><h2>BuyZee</h2>
</div>
      </div>
</div>

    )
}