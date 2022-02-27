export default function checkUserLoggedIn() {
  let isLoggedIn = localStorage.getItem("userName");
  let userExist = false;

  console.log("user", isLoggedIn);

  if (isLoggedIn && isLoggedIn.length > 0 && isLoggedIn !== "") {
    userExist = true;
  }

  return userExist;
}
