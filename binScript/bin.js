import checkUserLoggedIn from "../sharedScripts/checkAuth.js";
import { getTrashData } from "../firebase/firestore.js";
import { displayNotes } from "../scripts/modules/displayNotes.js";

const userExist = checkUserLoggedIn();
if (!userExist) {
  window.location = "index.html";
}

async function getSnapShotData() {
  const trashData = await getTrashData();

  console.log("trashdata", trashData);

  trashData.map((trash) =>
    displayNotes(trash?.note, trash?.noteNo, trash?.date, trash?.time)
  );
}

getSnapShotData();
