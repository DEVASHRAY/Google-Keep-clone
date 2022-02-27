import { displayNotes } from "./modules/displayNotes.js";
import { AddNotesToFirebase, getSnapShot } from "../firebase/firestore.js";
import checkUserLoggedIn from "../sharedScripts/checkAuth.js";

const userExist = checkUserLoggedIn();
if (!userExist) {
  window.location = "index.html";
}

const getSnapShotData = async () => {
  const { snapshotData } = await getSnapShot();
  console.log("snapshotData", snapshotData);

  let latestNoteNo = 0;

  snapshotData.map((snapshot) => {
    if (snapshot?.noteNo > latestNoteNo) {
      latestNoteNo = snapshot.noteNo;
    }
    displayNotes(snapshot?.note, snapshot?.noteNo);
  });

  console.log("latestNoteNo before creating note in function", latestNoteNo);

  console.log("latestNoteNo before creating note", latestNoteNo);

  let inputArea = document.querySelector("#inputArea");

  let toogleInputAreaElements = document.querySelectorAll(
    ".input__section__details"
  );

  let closeButton = document.querySelector(".section__options__submit");

  let body = document.querySelector("body");

  const handleToogleHide = (eventType, event) => {
    if (eventType === "inputClick" || eventType === "closeButton") {
      event.stopPropagation();
    }
    toogleInputAreaElements.forEach((checkclass) => {
      if (eventType === "inputClick") {
        checkclass.classList.contains("section__hide") &&
          checkclass.classList.toggle("section__hide");
      } else if (eventType === "bodyClick" || eventType === "closeButton") {
        !checkclass.classList.contains("section__hide") &&
          checkclass.classList.toggle("section__hide");
      }
    });
  };

  inputArea.addEventListener("click", () => {
    handleToogleHide("inputClick", event);
  });

  inputArea.addEventListener("change", ({ target }) => {
    displayNotes(target.value, latestNoteNo + 1);
    AddNotesToFirebase(target.value);
    inputArea.value = "";
  });

  body.addEventListener("click", () => {
    handleToogleHide("bodyClick", event);
  });

  closeButton.addEventListener("click", () => {
    handleToogleHide("closeButton", event);
  });
};

getSnapShotData();
