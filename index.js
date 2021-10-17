const express = require('express');
const html = require('./html/html_a');
const data = require('./data');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
const port = 3000;

let students = [];
let hasError = false;


app.get("/", (req, res) => {
  let currentlyHasError = hasError;
  hasError = false;
  res.send(html.renderIndex({
    students: students,
    majors: data.listMajors()
  }, currentlyHasError));
});

app.post('/create-student', function(req, res){
  let newStudent = {
    name: req.body.name,
    age: req.body.age,
    semester: req.body.semester,
    majorIndex: req.body.majorIndex
  }
  students.push(newStudent);
  res.redirect('/');
})

app.post('/update-major', (req, res) => {
  let i = req.body.index;
  data.updateMajor(i, req.body);

  res.redirect("/");
})

app.post("/delete-major", (req, res) => {
  let result = data.deleteMajor(req.body.id, students);
  if(result == null){
    hasError = true;
  }
  res.redirect("/");
});

app.post("/create-major", (req, res) => {
  data.createMajor(req.body);
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