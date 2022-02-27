import checkUserLoggedIn from "../sharedScripts/checkAuth.js";
import { FirebaseAuth } from "../firebase/auth.js";

const userExist = checkUserLoggedIn();
if (userExist) {
  window.location = "home.html";
}

// go to sign up screen

const goToSigin = document.querySelector("#goToSignUp");

goToSigin.addEventListener("click", () => {
  window.location = "index.html";
});

//REFERENCE ELEMENTS

const userName = document.querySelector("#signin__name");
const userPassword = document.querySelector("#signin__password");
const submit = document.querySelector(".signin__CTA");

let name = "";
let email = "";
let password = "";

userName.addEventListener("change", ({ target }) => {
  name = target.value;
});

userPassword.addEventListener("change", ({ target }) => {
  password = target.value;
});

submit.addEventListener("click", (event) =>
  FirebaseAuth(name, "default", password, event, false)
);
