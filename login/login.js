let loginbtn = document.getElementById("log-in");
let emailinp = document.querySelector("#email");
let passinp = document.querySelector("#pass");
let errorMessage = document.querySelector("#errorMessage");

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (emailinp.value.trim() === "" || passinp.value.trim() === "") {
    errorMessage.innerText = "Error : All the fields are mandatory";
    errorMessage.style.color = "#FF4F4F";
    errorMessage.style.display = "inline-block";
    return;
  }
  //   console.log(user);

  if (!localStorage.getItem("users")) {
    errorMessage.innerText = `${emailinp.value} is not available You must sign in first`;
    errorMessage.style.color = "#FF4F4F";
    errorMessage.style.display = "inline-block";
    return;
  } else {
    let usersarr = JSON.parse(localStorage.getItem("users"));

    for (let userobj of usersarr) {
      if (
        userobj.email == emailinp.value &&
        userobj.password == passinp.value
      ) {
        userobj.token = generatetoken();
        sessionStorage.setItem("currentuser", JSON.stringify(userobj));

        errorMessage.innerText = "Successfully Login!";
        errorMessage.style.color = "#7ECD71";
        errorMessage.style.display = "inline-block";

        setTimeout(() => {
          window.location.href = "../shop/index.html";
        }, 1000);

        return;
      }
    }
    errorMessage.innerText = `${emailinp.value} is not available or wrong password entered`;
    errorMessage.style.color = "#FF4F4F";
    errorMessage.style.display = "inline-block";
    return;
  }
});
document.getElementById("homeLink").addEventListener("click", (e) => {
  e.preventDefault();
  if (sessionStorage.getItem("currentuser")) {
    window.location.href = "../shop/index.html";
  } else {
    window.location.href = "../index.html";
  }
});

function generatetoken() {
  let str = "";
  for (let i = 0; i < 16; i++) {
    str += String.fromCharCode(Math.floor(Math.random() * 89) + 33);
  }

  return str;
}
