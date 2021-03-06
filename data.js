// list => sequential access
// object => direct access

// simpan sbg int, dan setiap data yg datang dari HTML harus parseInt
// simpang sbg string

let majors = [
];
let runningNumbers = 0;

function listMajors(){
  return majors;
}

// Create and stores new major.
// return new major if created, return null if not
function createMajor(newMajor){
  for(let i=0; i<majors.length; i++){
    if(majors[i].majorName.toUpperCase() === newMajor.majorName.toUpperCase()){
      return null;
    }
  }

  let key = generateKey();



  newMajor['id'] = key;
  majors.push(newMajor)
  return newMajor;
}

function generateKey(){
  let id = runningNumbers;
  runningNumbers += 1;
  return String(id);
}

function updateMajor(key, newData){
  let index = getIndex(key);
  if(index !== null){
    majors[index].majorName = newData.majorName;
    majors[index].majorSemester = newData.majorSemester;
  }
};

function getIndex(key){
  for(let i=0;i<majors.length;i++){
    if(majors[i].id === key){
      return i;
    }
  }

  return null;
}

function getMajor(key){
  let index = getIndex(key);
  if(index !== null){
    return majors[index];
  }
  return null;
}

function deleteMajor(majorId, students)
{
    for(let i = 0; i<students.length; i++)
    {
        if(majorId === students[i].majorIndex)
        {
            return null;
        }
    }
    let index = getIndex(majorId);
    majors.splice(index, 1);
    return index;
}

module.exports = {
  createMajor: createMajor,
  listMajors: listMajors,
  updateMajor: updateMajor,
  getMajor: getMajor,
  deleteMajor: deleteMajor
}