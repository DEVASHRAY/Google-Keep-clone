import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  updateDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

const db = getFirestore();
let userName = JSON.parse(localStorage.getItem("userName"));

const getDate = () => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return {
    date,
    time,
  };
};

async function getSnapShot(newNote = "") {
  let ref = doc(db, "Notes", userName);

  let SnapshotExist = true;
  let snapshotData = [];

  try {
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      const data = docSnap?.data()?.data || [];

      let latestNoteNo = 0;
      data.forEach((note) => {
        console.log("noteno", note.noteNo, latestNoteNo);
        if (note.noteNo > latestNoteNo) {
          latestNoteNo = note.noteNo;
        }
      });

      let oldData = [...data];
      snapshotData = oldData;
      if (newNote) {
        UpdateNote(oldData, newNote, latestNoteNo);
      }
    } else {
      SnapshotExist = false;
    }
  } catch (er) {
    console.log(er);
  }
  return { SnapshotExist, snapshotData };
}

async function UpdateNote(oldNotes, newNote, latestNoteNo) {
  console.log("noteno updated", latestNoteNo);
  const { date, time } = getDate();
  let ref = doc(db, "Notes", userName);

  console.log("update ref", ref);

  await updateDoc(ref, {
    data: [
      ...oldNotes,
      {
        noteNo: latestNoteNo + 1,
        userName,
        note: newNote,
        date,
        time,
      },
    ],
  })
    .then((res) => console.log("upadted"))
    .catch((err) => console.log(err));
}

async function AddNotesToFirebase(enteredNote) {
  console.log("zxc", enteredNote);

  const Snapshot = await getSnapShot(enteredNote);

  if (!Snapshot.SnapshotExist) {
    const { date, time } = getDate();

    let ref = doc(db, "Notes", userName);
    const docRef = await setDoc(ref, {
      data: [
        {
          noteNo: 1,
          userName,
          note: enteredNote,
          date,
          time,
        },
      ],
    })
      .then(() => {})
      .catch((err) => alert("failed"));
  }
}

async function EditNote(noteID, editedNote) {
  console.log("edit not calling => ", noteID, editedNote);
  let ref = doc(db, "Notes", `${userName}`);

  const { snapshotData } = await getSnapShot();

  console.log("sp", snapshotData);

  const edit = snapshotData.map((snapshot) => {
    if (snapshot?.noteNo === parseInt(noteID)) {
      console.log("entered");
      return {
        ...snapshot,
        note: editedNote,
      };
    }
    return snapshot;
  });
  console.log(edit);

  await updateDoc(ref, {
    data: edit,
  })
    .then((res) => console.log("upadted"))
    .catch((err) => console.log(err));
}

async function DeleteNote(noteID) {
  console.log("delete  calling => ", noteID);
  let ref = doc(db, "Notes", `${userName}`);

  const { snapshotData } = await getSnapShot();

  console.log("sp", snapshotData);

  const deleted = snapshotData.filter(
    (snapshot) => snapshot?.noteNo !== parseInt(noteID)
  );

  console.log("deleteNote", deleted);

  await updateDoc(ref, {
    data: deleted,
  })
    .then((res) => console.log("upadted"))
    .catch((err) => console.log(err));
}

export { AddNotesToFirebase, getSnapShot, EditNote, DeleteNote };
