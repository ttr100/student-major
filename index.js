const express = require('express');
const html = require('./html/html_a');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
const port = 3000;

let students = [];
let majors = [];


function getMajorIndex(majorName){
  for(let i=0; i < majors.length ; i++){
    if(majors[i].majorName === majorName){
      return i;
    }
  }
  return -1;
}


app.get("/", (req, res) => {
  res.send(html.renderIndex({
    students: students,
    majors: majors
  }));
});

app.post('/create-student', function(req, res){
  let majorIndex = getMajorIndex(req.body.major);
  let newStudent = {
    name: req.body.name,
    age: req.body.age,
    semester: req.body.semester,
    majorIndex: majorIndex  
  }
  students.push(newStudent);
  res.redirect('/');
})

app.post('/update-major', (req, res) => {
  console.log(req.body);
  let i = parseInt(req.body.index);
  majors[i].majorName = req.body.majorName;
  majors[i].majorSemester = req.body.majorSemester;

  // search for student with majorName == originalMajorname
  // // for eavery student found, change student.major

  // for(let i=0; i < majors.length ; i++){
  //   if(majors[i].majorName === req.body.originalName){
  //     majors[i].majorName = req.body.majorName;
  //     majors[i].majorSemester = req.body.majorSemester;
  //     break;
  //   }
  // }

  res.redirect("/");
})

app.post("/create-major", (req, res) => {
  let alreadyExist = false;
  for(let i=0; i<majors.length; i++){
    if(majors[i].majorName.toUpperCase() === req.body.majorName.toUpperCase()){
      alreadyExist = true;
      break;
    }
  }

  // kalau nama major sudah ada, console.log('SUDAH ADA');
  // kalau tidak, push ke majors
  // req.body = {majorName: '', majorSemester: aasfa}
  if(alreadyExist){
    console.log('SUDAH ADA');
  }
  else{
    majors.push(req.body);
  }
  res.redirect("/");
});

// kalau yg diminta adalah /style.css, 
// jalankan function ini
app.get('/style.css', function(req, res){
  res.send(html.renderStyle());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})