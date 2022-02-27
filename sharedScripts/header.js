let sign_out = document.querySelector("#sign_out");

sign_out.addEventListener("click", () => {
  localStorage.clear("userName");
  window.location = "index.html";
});
