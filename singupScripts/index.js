import { FirebaseAuth } from "../firebase/auth.js";
import checkUserLoggedIn from "../sharedScripts/checkAuth.js";

const userExist = checkUserLoggedIn();
if (userExist) {
  window.location = "home.html";
}

//GO TO SIGNIN PAGE

const goToSigin = document.querySelector("#goToSignIn");

goToSigin.addEventListener("click", () => {
  window.location = "signin.html";
});

//REFERENCE ELEMENTS

const userName = document.querySelector("#signup__name");
const userEmail = document.querySelector("#signup__email");
const userPassword = document.querySelector("#signup__password");
const submit = document.querySelector(".signup__CTA");

//state value

let name = "";
let email = "";
let password = "";
//ADD EVENT LISTENER

userName.addEventListener("change", ({ target }) => {
  name = target.value;
});

userEmail.addEventListener("change", ({ target }) => {
  email = target.value;
});

userPassword.addEventListener("change", ({ target }) => {
  password = target.value;
});

submit.addEventListener("click", (event) =>
  FirebaseAuth(name, email, password, event, true)
);
