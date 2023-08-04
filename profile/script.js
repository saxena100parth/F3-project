// Write your script here
// Write your script here
if (!sessionStorage.getItem("currentuser")) {
  window.location.href = "../login/index.html";
  alert("you need to login or signup first");
}

let saveinfobtn = document.querySelector("#Save");
let logoutbtn = document.querySelector("#logout");

let fnameinp = document.querySelector("#fname");
let lnameinp = document.querySelector("#lname");

let oldpassinp = document.querySelector("#oldpass");
let newpassinp = document.querySelector("#newpass");
let cnfnewpassinp = document.querySelector("#cnfpass");

let changepassbtn = document.querySelector("#changepass");
let errmsg1 = document.querySelector("#err-msg1");
let errmsg2 = document.querySelector("#err-msg2");

let currentuser = JSON.parse(sessionStorage.getItem("currentuser"));
fnameinp.value = currentuser.firstname;
lnameinp.value = currentuser.lastname;
// oldpassinp.value=currentuser.password;

let profileheader = document.querySelector(".pro-hdr");

profileheader.innerHTML = `My Profile (${currentuser.firstname} ${currentuser.lastname})`;

saveinfobtn.addEventListener("click", () => {
  //  e.preventDefault();
  console.log("hello");

  let usersarr = JSON.parse(localStorage.getItem("users"));
  console.log(usersarr);

  for (let i = 0; i < usersarr.length; i++) {
    if (usersarr[i].email == currentuser.email) {
      currentuser = {
        firstname: fnameinp.value,
        lastname: lnameinp.value,
        email: usersarr[i].email,
        password: usersarr[i].password,
      };

      usersarr.splice(i, 1, currentuser);
      break;
    }
  }

  errmsg1.innerText = "Details sucessfully updated";
  errmsg1.style.color = "#7ECD71";
  errmsg1.style.display = "inline-block";
  localStorage.setItem("users", JSON.stringify(usersarr));

  currentuser.token = generatetoken();
  sessionStorage.setItem("currentuser", JSON.stringify(currentuser));
  profileheader.innerHTML = `My Profile (${currentuser.firstname} ${currentuser.lastname})`;
});

changepassbtn.addEventListener("click", () => {
  if (
    oldpassinp.value.trim() == "" ||
    newpassinp.value.trim() == "" ||
    cnfnewpassinp.value.trim() == ""
  ) {
    errmsg2.innerText = "Error : All the fields are mandatory";
    errmsg2.style.color = "#FF4F4F";
    errmsg2.style.display = "inline-block";
    return;
  }

  if (oldpassinp.value == newpassinp.value) {
    errmsg2.innerText =
      "New Password matching with old password make sure it is different";
    errmsg2.style.color = "#FF4F4F";
    errmsg2.style.display = "inline-block";
    return;
  }

  if (newpassinp.value != cnfnewpassinp.value) {
    errmsg2.innerText = "confirm password not matching with new password";
    errmsg2.style.color = "#FF4F4F";
    errmsg2.style.display = "inline-block";
    return;
  }

  let usersarr = JSON.parse(localStorage.getItem("users"));
  console.log(usersarr);

  for (let i = 0; i < usersarr.length; i++) {
    if (
      usersarr[i].email == currentuser.email &&
      usersarr[i].password == oldpassinp.value
    ) {
      currentuser = {
        firstname: usersarr[i].firstname,
        lastname: usersarr[i].lastname,
        email: usersarr[i].email,
        password: newpassinp.value,
      };

      usersarr.splice(i, 1, currentuser);

      localStorage.setItem("users", JSON.stringify(usersarr));
      sessionStorage.setItem("currentuser", JSON.stringify(currentuser));

      errmsg2.innerText = "Password changed successfully";
      errmsg2.style.color = "#7ECD71";
      errmsg2.style.display = "inline-block";
      oldpassinp.value = "";
      newpassinp.value = "";
      cnfnewpassinp.value = "";
      return;
    }
  }

  errmsg2.innerText = "old password not matching with existing password";
  errmsg2.style.color = "#FF4F4F";
  errmsg2.style.display = "inline-block";
});

logoutbtn.addEventListener("click", () => {
  sessionStorage.removeItem("currentuser");
  localStorage.removeItem("cartproducts");
  localStorage.removeItem("products");

  alert("Redirecting you to index page...");
  setTimeout(() => {
    window.location.href = "../login/index.html";
  }, 1000);
});

function generatetoken() {
  let str = "";
  for (let i = 0; i < 16; i++) {
    str += String.fromCharCode(Math.floor(Math.random() * 89) + 33); //33 to 122
  }

  return str;
}
