let sign_out = document.querySelector("#sign_out");

sign_out.addEventListener("click", () => {
  localStorage.clear("userName");
  window.location = "index.html";
});

if (window.location.pathname.includes("home")) {
  let bin = document.querySelector("#trash");

  bin.addEventListener("click", () => {
    window.location = "bin.html";
  });
}

if (window.location.pathname.includes("bin")) {
  let home = document.querySelector("#goHome");

  home.addEventListener("click", () => {
    window.location = "home.html";
  });
}
