let majors = [];

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

  majors.push(newMajor);
  return newMajor;
}


function updateMajor(key, newData){
    majors[key].majorName = newData.majorName;
    majors[key].majorSemester = newData.majorSemester;
};

function getMajor(key){
  return majors[key];
}

module.exports = {
  createMajor: createMajor,
  listMajors: listMajors,
  updateMajor: updateMajor,
  getMajor: getMajor
}