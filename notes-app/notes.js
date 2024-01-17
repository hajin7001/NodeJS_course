const fs = require('fs');

const getNotes = () => {
  return "What is the matter with you!!";
}

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  debugger

  if(!duplicateNote){

    notes.push({
      title: title,
      body: body
    });
  
    saveNotes(notes);
    console.log('New note added');
  } else {
    console.log('Note title taken');
  }

}

const removeNote = (title) => {
  // 지금껏 작성한 note들을 모두 가져온다
  const notes = loadNotes();
  
  // 우리가 검색한 title의 Note가 존재하면 제거하고 안그러면 그대로 놨두기 
  const filteredNotes = notes.filter((note) => note.title !== title);
  
  if (notes.length > filteredNotes) {
    console.log('Note is removed');
    saveNotes(filteredNotes);
  } else {
    console.log('No note that matched the title: ', title);
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log("Your Notes");

  notes.forEach((note) => {console.log("Title: ", note.title)});
}

const readNote = (title) => {
  const notes = loadNotes();
  // 이렇게 하면 array가 나오는 것
  const chosenNote = notes.find((note) => note.title === title);

  // chosenNote에 Object가 있는 경우 
  if (chosenNote){
    console.log("Title: ", chosenNote.title, "Body: ", chosenNote.body);
  } else {
    console.log("There is no note with the title ", title);
  }
  
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);

}

const loadNotes = () => {

  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);

  } catch(error) {
    return [];
  }
  
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote
};
