let errmsg = document.getElementById('error-text');
let fnameinp = document.getElementById('fname');
let lnameinp = document.getElementById('lname');
let emailinp = document.getElementById('email');
let passinp = document.getElementById('pass');
let cnfpassinp = document.getElementById('cnfpass');
let Signup = document.getElementById('Signup-btn');

Signup.addEventListener("click", (e)=>{
    e.preventDefault();
 
    if(fnameinp.value.trim() === "" || lnameinp.value.trim() === ""||  emailinp.value.trim() ==="" || passinp.value.trim() =="" || cnfpassinp.value.trim() ==""){    
      errmsg.innerText  = "Error : All the fields are mandatory";
      errmsg.style.color = "#FF4F4F";
      errmsg.style.display = "inline-block";
      return;
    }
 
    if(passinp.value.trim() !== cnfpassinp.value.trim()){
     errmsg.innerText  = "Password not matching";
     errmsg.style.color = "#FF4F4F";
     errmsg.style.display = "inline-block";
     return;
    }

    let user = {
       firstname: fnameinp.value,
       lastname: lnameinp.value,
       email: emailinp.value,
       password: passinp.value,
      }

     console.log(user);

    if(!localStorage.getItem("users")){
    
          let usersarr = [];
          usersarr.push(user);

          localStorage.setItem("users", JSON.stringify(usersarr));

    }
    else{

       let usersarr = JSON.parse(localStorage.getItem("users"));
       console.log(usersarr);

         for(let userobj of usersarr){
           if(userobj.email === emailinp.value){
               console.log("hi");
               errmsg.innerText  = `User with email ${userobj.email} already exists`;
               errmsg.style.color = "#FF4F4F";
               errmsg.style.display = "inline-block";
               found=true;
              return;
           }
         }

       
       usersarr.push(user);
       localStorage.setItem("users", JSON.stringify(usersarr));


    }
 
     user.token = generatetoken();
    sessionStorage.setItem("currentuser", JSON.stringify(user));
   
    errmsg.innerText  = "Successfully Signed Up!";
    errmsg.style.color = "#7ECD71";
    errmsg.style.display = "inline-block";
  
 
    setTimeout(()=>{
     window.location.href  ='../shop/index.html';
    },1000);
 
       
 
 });
 
 
 function generatetoken(){
   let str = "";
   for(let i=0; i<16; i++){
       str +=   String.fromCharCode  (Math.floor(Math.random() * 89) + 33); //33 to 122
   }
 
   return str;
 }