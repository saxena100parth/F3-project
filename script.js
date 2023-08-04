let login = document.getElementById("login-btn");
let signup = document.getElementById("Signup-btn");

login.addEventListener("click", () => {
  window.location.href = "./login/index.html";
});
signup.addEventListener("click", () => {
  window.location.href = "./signup/index.html";
});

if (sessionStorage.getItem("currentuser")) {
  alert("you have already logged in");
  setTimeout(() => {
    window.location.href = "./shop/index.html";
  }, 1000);
}

document.getElementById("home").addEventListener("click", (e) => {
  e.preventDefault();
  if (sessionStorage.getItem("currentuser")) {
    window.location.href = "../shop/index.html";
  } else {
    alert("Please login first");
  }
});
