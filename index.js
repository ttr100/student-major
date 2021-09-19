const express = require('express');
const html = require('./html/html_a');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
const port = 3000;

let students = [];
let majors = [];

app.get("/", (req, res) => {
  console.log('INDEX');
  res.send(html.renderIndex({
    students: students,
    majors: majors
  }));
});

app.post('/create-student', function(req, res){
  console.log(req.body);
  students.push(req.body);
  res.redirect('/');
})

app.post("/create-major", (req, res) => {
  console.log('CREATE-MAJOR');
  majors.push(req.body);
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