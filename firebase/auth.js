import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

const db = getDatabase();

const FirebaseAuth = (
  name = "",
  email = "",
  password = "",
  event,
  signUp = true
) => {
  event.preventDefault();
  console.log("CLEED");

  if (name === "" || email === "" || password === "") {
    alert("Enter Valid Details");
    return;
  }

  const dbRef = ref(db);

  get(child(dbRef, "users/" + name)).then((snapshot) => {
    if (!signUp) {
      SignIn(snapshot, name, password);
      return;
    }

    if (snapshot.exists()) {
      alert("User Name already exists.");
      return;
    }
    set(ref(db, "users/" + name), {
      name,
      email,
      password,
    })
      .then(() => {
        localStorage.setItem("userName", JSON.stringify(name));
        window.location = "home.html";
      })
      .catch((err) => alert("err" + err));
  });
};

function SignIn(snapshot, name, password) {
  console.log(snapshot);
  if (snapshot.exists()) {
    if (snapshot.val().password === password) {
      localStorage.setItem("userName", JSON.stringify(name));
      window.location = "home.html";
      return;
    }

    alert("Please enter correct password");

    return;
  }
  alert("User Does not exists");
}

export { FirebaseAuth };
