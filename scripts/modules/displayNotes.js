import { EditNote, DeleteNote } from "../../firebase/firestore.js";

const colorArr = ["blue", "#000", "green", "red"];

export function displayNotes(text, latestNoteNo, date, time) {
  console.log("display notes para", text, latestNoteNo);
  // inputArea.value = "";

  let isHomePage = window.location.pathname.includes("home") ? true : false;

  if (text) {
    addANote();
  }

  function addANote() {
    const note = document.createElement("div");

    note.classList.add(`showNotes`);

    // note.setAttribute("id", `${latestNoteNo}`);

    const noteData = `
    <div class="showNotes__container" id = ${latestNoteNo}>
      <div class='notes_metaData'> 
      <p class = 'notes_date'> ${date || ""} </p>
      <p class = 'notes_time'> ${time || ""} </p>
      </div>
      <div class = 'seprator' > </div>

      <p id = 'note' class = ${text ? "" : "hideEdit"}>${text}</p>
      <textarea  class = ${text ? "hideEdit" : ""}>${text}</textarea>
      
     
      <div class="showNotes__options">
              <img
                class="deleteNotes"
                src="data:image/png;base64,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"
              />
              ${
                isHomePage
                  ? `
                  <img
                    class="editNotes"
                    src="data:image/png;base64,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"
                  />`
                  : `<div style = 'display : none'></div>`
              }
             
              <img
                class = 'changeColor'
                src = 'data:image/png;base64,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'
              />
            </div>
           
        `;

    note.insertAdjacentHTML("beforeend", noteData);

    const deleteNote = note.querySelector(".deleteNotes");
    const editNote = note.querySelector(".editNotes");
    const removeNote = note.querySelector(".removeNotes");
    const addedNote = note.querySelector("#note");
    const textArea = note.querySelector("textarea");
    const noteID = note.querySelector(".showNotes__container").id;
    const color = note.querySelector(".changeColor");

    console.log("noteID", noteID);

    deleteNote.addEventListener("click", async () => {
      note.remove();
      await DeleteNote(noteID, isHomePage);
    });

    isHomePage &&
      editNote.addEventListener("click", async () => {
        addedNote.classList.toggle("hideEdit");
        textArea.classList.toggle("hideEdit");
        // await EditNote(noteID, textArea.value);
      });

    textArea.addEventListener("change", async ({ target }) => {
      text = target.value;
      addedNote.innerHTML = text;
      addedNote.classList.toggle("hideEdit");
      textArea.classList.toggle("hideEdit");
      await EditNote(noteID, text);
      console.log("ID WHIKLE CLICK", noteID, text);
    });

    const section = document.querySelector(".showNotes__parent");

    color.addEventListener("click", () => {
      let getRandomNumber = Math.floor(Math.random() * colorArr.length);
      addedNote.style.color = colorArr[getRandomNumber];
    });

    section.appendChild(note);
  }
}
