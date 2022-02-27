let inputNote = document.querySelector(".input__section__noteInput");

let closeButton = document.querySelector(".section__options__submit");

function handleCreatePost() {
  console.log(closeButton);

  inputNote.addEventListener("click", handleClick, false);

  closeButton.addEventListener("click", handleClose, false);
}

function handleClick() {
  let getClasses = document.querySelectorAll(".input__section__details");

  getClasses.forEach((sec) => sec.classList.toggle("section__hide"));

  inputNote.removeEventListener("click", handleClick, false);
}

function handleClose() {
  let getClasses = document.querySelectorAll(".input__section__details");

  getClasses.forEach((sec) => sec.classList.toggle("section__hide"));

  inputNote.addEventListener("click", handleClick, false);
}

export { handleCreatePost };
