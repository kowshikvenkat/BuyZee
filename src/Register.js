import React, { Component } from 'react';
import {app,createUserDocument} from './firebase';
import { getAuth, RecaptchaVerifier ,signInWithPhoneNumber,createUserWithEmailAndPassword,sendEmailVerification,updateEmail} from "firebase/auth";
import {getFirestore,getDocs,where,query,addDoc,collection,doc} from 'firebase/firestore';
import { useNavigate,useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import phone from './email.png'
import back from './back.png'
export default function Register(){

  const navigate = useNavigate()
  const location = useLocation()
    const auth = getAuth(app);
    const[cartdatas,setcartdatas] = React.useState([])
    const[sentmobileotp,setsentmobileotp] = React.useState(false)
     const[emailsent,setemailsent] = React.useState(false)
    const[firstname,setfirstname] = React.useState("")
    const[lastname,setlastname] = React.useState("")
    const[email,setemail] = React.useState("")
    const[mobile,setmobile] = React.useState()
    const[mobileotp,setmobileotp] = React.useState()
   const[emailotp,setemailotp] = React.useState()
    const[address,setaddress] = React.useState()
    let userdata = React.useRef({})
    function randomnumber(){
      var min = 100000;
      var max=999999;
      userdata.current =  Math.floor(Math.random()*(max-min))+min;
    }
    React.useEffect(()=>{
      randomnumber()
      setcartdatas(location.state.data)
    },[])
     function oncaptchaverify(){
    console.log('oncaptchaverify')
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    handleClick()
  },
}, auth);
  }
  function handleClick(event){
    event.preventDefault()
   oncaptchaverify()
   if(emailsent!==true&&sentmobileotp!==true){
const phoneNumber = '+91'+mobile;
const appVerifier = window.recaptchaVerifier;
   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {

      window.confirmationResult = confirmationResult;
      
      setsentmobileotp(true)

    }).catch((error) => {
 
      console.log(error)
    });

          emailjs.sendForm('service_odh7aa6', 'template_p9ew3bg',event.target, 'hcsWT9t1HwZVn40PM').then(()=>{
            setemailsent(true)
          }).catch((err)=>{
            console.log(err)
          })
        }else{
          verificationCode()
        }
      }
       const firestore = getFirestore(app)
 
const createUserDocument = async(firstname,lastname,address,email,mobile)=>{
 let isolddata =false;
try {
const q = query(collection(firestore, "users"), where("Email", "==", email));
const querySnapshot = await getDocs(q);
console.log(querySnapshot)
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
   isolddata= true
});
const g = query(collection(firestore, "users"), where("Mobile", "==", mobile));

const querySnap = await getDocs(g);
console.log(querySnap)
querySnap.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
   isolddata= true
});

   if(isolddata==false){
       const docRef = addDoc(collection(firestore, "users"), {
   firstName : firstname,
   lastName : lastname,
   Email : email,
   Mobile: mobile,
   Address:address,
   createdAt : new Date()
  });
     sessionStorage.setItem('email',email)
sessionStorage.setItem('firstname',firstname)
         sessionStorage.setItem('address',address)
         
if(location.state.loc!=='home'){
navigate('/billing',{state:{data:cartdatas}})}
else if(location.state.loc==='home'){
navigate('/',{state:{data:cartdatas}})
}
   }

} catch (e) {
  console.error("Error adding document: ", e);
}
}
  function verificationCode(event){
    window.confirmationResult.confirm(mobileotp).then((result) => {
      if(emailotp==userdata.current){
  const user  = createUserWithEmailAndPassword(auth,email,'buyzee').then(()=>{
  
createUserDocument(firstname,lastname,address,email,mobile);

  }).catch((err)=>{
    console.log(err)
  })
}
}).catch((error) => {
  alert('invalid OTP')
});



  }

  
 
      return(
        <div className='d-flex flex-column align-items-center'>
   <div className="d-flex justify-content-center w-100">
    <div className="w-50 d-flex justify-content-start">
      
          <button className='backbutton btn btn-outline-primary  m-3'  onClick={()=>navigate('/',{state:{data:cartdatas}})}> <img className='mt-1' width={20} height={20}  src={back} alt="" />&nbsp; Back to home </button>
    </div>
        <h1 className='w-100 '> <img src={phone} width={50} height={50} alt="" /> BuyZee - Register</h1>
   </div>
      
        <div className='d-flex flex-column align-items-center p-3' style={{boxShadow:'0  0 10px grey',borderRadius:10}}>
            <form className='d-flex flex-column align-items-center' onSubmit={handleClick} action="">
       <div className='d-flex flex-column '>   <label htmlFor="">FIRST NAME</label> <input type="text" onChange={(e)=>setfirstname(e.target.value)} className='form-control' required/></div>
                <div className='d-flex flex-column'>
                     <label htmlFor="">SECOND NAME</label> <input onChange={(e)=>setlastname(e.target.value)} type="text" className='form-control' required/>
                </div>
                 <div className='d-flex flex-column'>
                     <label htmlFor="">EMAIL</label> <input onChange={(e)=>setemail(e.target.value)} name="email" type="email" className='form-control' required/>
                </div>
                 <div className='d-flex flex-column'>
                     <label htmlFor="">PHONE</label> <input onChange={(e)=>setmobile(e.target.value)} className='form-control' type="number" required/>
                     <div id='recaptcha-container'></div>
                </div>
                 <div className='d-flex flex-column'>
                     <label htmlFor="">ADDRESS</label> <input onChange={(e)=>setaddress(e.target.value)} minLength={15} className='form-control' type="text" required/>
                 
                </div>

                   {(emailsent)&& <p><i>OTP Sent</i></p>}
                  <div className={(emailsent)?'d-flex flex-column bg-light':'d-flex flex-column bg-secondary'}>
                     <label htmlFor="">PHONE OTP</label> <input onChange={(e)=>setmobileotp(e.target.value)} style={{border:'none',outline:'none',borderBottom:'1px solid black',backgroundColor:'transparent'}} type="number" disabled={emailsent?false:true} required={emailsent?true:false}/>
                   
                </div>
                   <div className={(emailsent)?'d-flex flex-column bg-light':'d-flex flex-column bg-secondary'}>
                     <label htmlFor="">EMAIL OTP</label> <input onChange={(e)=>setemailotp(e.target.value)} style={{border:'none',outline:'none',borderBottom:'1px solid black',backgroundColor:'transparent'}} type="number" disabled={emailsent?false:true} required={emailsent?true:false}/>
                   
                </div>
                <input type="number" name="message" value={userdata.current} hidden   />
            <input type="submit" className='btn btn-warning' value={emailsent?"Register":'Send Otp'} />

            </form>

            <h4>Already have an account?</h4>
            <button className='btn btn-primary' onClick={()=>navigate('/login',{state:{data:cartdatas}})}>Login</button>
            </div>
        </div>
      )

}