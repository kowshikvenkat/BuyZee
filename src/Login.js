import React, { Component } from 'react';
import {app,createUserDocument,login} from './firebase';
import { getAuth, RecaptchaVerifier ,signInWithPhoneNumber,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendEmailVerification,updateEmail} from "firebase/auth";
import {getFirestore,getDocs,where,query,addDoc,collection,doc} from 'firebase/firestore';
import { useNavigate,useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import phone from './online-payment.png'
import back from './back.png'
export default function Login(){
 
    const location = useLocation()
  const navigate = useNavigate()
    const auth = getAuth(app);
    const firestore = getFirestore(app)
  const[cartdatas,setcartdatas] = React.useState([])
       React.useEffect(()=>{

setcartdatas(location.state.data)
if(sessionStorage.getItem('firstname')!==null&&cartdatas.length>0&&oldemail.current==false&&oldmobile.current==false){
  navigate('/billing',{state:{data:cartdatas}})
}
})
 function oncaptchaverify(){
    console.log('oncaptchaverify')
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    sendmobileotp()
    console.log('captcha')
  },
}, auth);
  }
  

    const [emailactive,setemailactive] = React.useState(false)
    const[emailsent,setemailsent] = React.useState(false)
    const[email,setemail] = React.useState("")
    const[emailotp,setemailotp] = React.useState()
    let oldemail = React.useRef(false)

      const [mobileactive,setmobileactive] = React.useState(false)
          const[mobilesent,setmobilesent] = React.useState(false)
    const[mobile,setmobile] = React.useState("")
    const[mobileotp,setmobileotp] = React.useState()
    const[error,seterror] = React.useState("")
    let oldmobile = React.useRef(false)

      let otp = React.useRef()
    
          function randomnumber(){
      var min = 100000;
      var max=999999;
      otp.current =  Math.floor(Math.random()*(max-min))+min;
    }
      React.useEffect(()=>{
      randomnumber()
     
    },[])
       const checkUseremail = async(email)=>{
const q = query(collection(firestore, "users"), where("Email", "==", email));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data().firstName);
  sessionStorage.setItem('firstname',doc.data().firstName)
  sessionStorage.setItem('email',doc.data().Email)
           sessionStorage.setItem('address',doc.data().Address)
   oldemail.current = true

   })
           
           }
           const checkUsermobile = async(mobile)=>{
const g = query(collection(firestore, "users"), where("Mobile", "==", mobile));
const querySnap = await getDocs(g);
querySnap.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
    sessionStorage.setItem('firstname',doc.data().firstName)
        sessionStorage.setItem('email',doc.data().Email)
         sessionStorage.setItem('address',doc.data().Address)
   oldmobile.current = true
 
   })
           
           }
      
  function sendemailotp(event){
    event.preventDefault()
           if(emailsent!==true){
            console.log('email not sent')
           checkUseremail(email).then(()=>   {
            if(oldemail.current==true){
                  seterror("")
            console.log('old email-true')
               emailjs.sendForm('service_odh7aa6', 'template_p9ew3bg',event.target, 'hcsWT9t1HwZVn40PM').then(()=>{
            setemailsent(true)
          }).catch((err)=>{
            console.log(err)
          })
           }else if(oldemail.current==false){
            seterror("You don't have an account!")
           }
           }   
           )
        
         
           }else if(emailsent==true){
            if(otp.current==emailotp){
                const user  = signInWithEmailAndPassword(auth,email,'buyzee').then(()=>{
                    sessionStorage.setItem('email',email);
                     
                    if(location.state.loc!=='home'){
                    navigate('/billing',{state:{data:cartdatas}})
                    }else if(location.state.loc=='home'){
                           navigate('/',{state:{data:cartdatas}})
                    }
  }).catch((err)=>{
    console.log(err)
        seterror( "User already logged In !")
  })
            }else if(otp.current!==emailotp){
                alert('INVALID OTP ! Refresh page and try again !')
            }
           }
  }
  function sendmobileotp(event){
    event.preventDefault()
   if(mobilesent!==true){
           checkUsermobile(mobile).then(()=>
           {
  if(oldmobile.current===true){
    seterror("")
            oncaptchaverify()
        
            const phoneNumber = '+91'+mobile;
const appVerifier = window.recaptchaVerifier;
   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setmobilesent(true)
    }).catch((error) => {
      console.log(error)
    });
           }else if(oldmobile.current===false){
            console.log('false')
            seterror( "You don't have an account!")
           }
           })
       
           }else if(mobilesent==true){         
              window.confirmationResult.confirm(mobileotp).then((result) => {
  sessionStorage.setItem('mobile',mobile);
                    
                    if(location.state.loc!=='home'){
                    navigate('/billing',{state:{data:cartdatas}})
                    }else if(location.state.loc=='home'){
                           navigate('/',{state:{data:cartdatas}})

                    }
}).catch((error) => {

  alert('invalid OTP ! Refresh page and try again !')
});
        }
  }
    return(
          
        <div className='text-center'>
           <h3 className='my-2'><img src={phone} width={50} height={50} alt="" /> BuyZee - LOGIN</h3>
           <button className='backbutton btn btn-outline-primary d-flex justify-content-start  m-3'  onClick={()=>navigate('/',{state:{data:cartdatas}})}> <img className='mt-1' width={20} height={20}  src={back} alt="" />&nbsp; Back to home </button>
          <p className='w-100 bg-info' style={{letterSpacing:5,wordSpacing:5}}><i>Click an option to login</i></p>
            <div  className='d-flex justify-content-center mx-5 '  style={{boxShadow:'0 0 10px grey',paddingTop:40,paddingBottom:20,flexWrap:'wrap',}}>
            <div className='d-flex flex-column align-items-center ' style={{width:"100vh",}}>
                <h4 className='text-primary w-100 loginheader m-0' style={{cursor:'pointer',borderBottom:'2px solid blue'}} onClick={()=>{setemailactive(true);setmobileactive(false)}}>EMAIL</h4>
            <div className='w-100 h-100 d-flex flex-column align-items-center ' style={{backgroundColor:mobileactive?'grey':'white',}}>
                {emailactive&&<form className='d-flex flex-column align-items-center w-75' onSubmit={sendemailotp}>
<input className='text-center form-control my-2 w-100' type="email" name="email" placeholder='Enter Email Id' onChange={(e)=>setemail(e.target.value)} required/>
<input type="number" className='form-control my-2 w-100' onChange={(e)=>setemailotp(e.target.value)} disabled={emailsent?false:true} required={emailsent?true:false} />
  <input type="number" name="message" value={otp.current} hidden   />
<input type="submit" className='btn btn-warning my-2 w-50' value={emailsent?'SIGN IN':'Get OTP'} />
<p className='text-danger'>{error}</p>

  <h4>Don't have an account?</h4>
            <button className='btn btn-primary' onClick={()=>{
            if(location.state.loc!=='home'){
            navigate('/register',{state:{data:cartdatas}})}
              if(location.state.loc==='home'){
            navigate('/register',{state:{data:cartdatas,loc:'home'}})}
            }
            }>Register</button>
</form>}
</div>
</div>
               <div className='d-flex flex-column align-items-center  ' style={{borderLeft:'2px solid blue',width:"100vh"}}> <h4 className='text-primary w-100 loginheader m-0' style={{borderBottom:'2px solid blue',cursor:'pointer'}} onClick={()=>{setemailactive(false);setmobileactive(true)}}>MOBILE</h4>
                     <div className='w-100 h-100 d-flex flex-column align-items-center ' style={{backgroundColor:emailactive?'grey':'white',}}>
               {mobileactive&&<form className='d-flex flex-column w-75 align-items-center' onSubmit={sendmobileotp}>
<input className='text-center form-control my-2 w-100' minLength={10} maxLength={10}  type="number" placeholder='Enter mobile no.' onChange={(e)=>setmobile(e.target.value)} required />
    <div id='recaptcha-container'></div>
<input className='text-center form-control my-2 w-100' minLength={6} type="number" onChange={(e)=>setmobileotp(e.target.value)} disabled={mobilesent?false:true} required={mobilesent?true:false} />

<input className='btn btn-warning my-2 w-50' type="submit" value={mobilesent?'SIGN IN':'Get OTP'} />
<p className='text-danger'>{error}</p>
  <h4>Don't have an account?</h4>
            <button className='btn btn-primary' onClick={()=>{
            if(location.state.loc!=='home'){
            navigate('/register',{state:{data:cartdatas}})}
              if(location.state.loc==='home'){
            navigate('/register',{state:{data:cartdatas,loc:'home'}})}
            }
            }>Register</button>
               </form>}</div>
               </div>
          


            </div>

        </div>
    )
}