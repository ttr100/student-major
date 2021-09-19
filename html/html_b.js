
function renderStudentRows(students) {
  return students
    .map(function (student) {
      return `<tr>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.major}</td>
      <td>${student.semester}</td>
    </tr>`;
    })
    .join("");
}

function renderMajorRows(majors) {
  return majors
    .map(function (major) {
      return `<tr>
      <td>${major.majorName}</td>
    </tr>`;
    })
    .join("");
}


function renderMajorsOption(majors){
  let majorsOption = majors.map(function(thatMajor){ // welp thatMajor is an object
    return `<option value="${thatMajor.majorName}">${thatMajor.majorName}</option>`;
  }).join('');

  console.log(majorsOption);
  return majorsOption;
}

function renderStudentForm(data){
  return `
    <form method="post" action="/create-student">
      <div class="field">
        <label>
          Name
          <div class="control">
            <input name="name" />
          </div>
        </label>
        <label>
          Age
          <div class="control">
            <input name="age" />
          </div>
        </label>
        <label>
          Major
          <div class="control">
            <select name="major">
            ${renderMajorsOption(data.majors)}
            </select>
          </div>
        </label>
        <label>
          Semester
          <div class="control">
            <input name="semester" />
          </div>
        </label>
        <button type="submit">Save</button>
      </div>
      
    </form>
  `
}

function renderIndex(data){
  const students = data.students;
  const majors = data.majors;
  return `
  <html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  </head>
  <body>
    <div class="columns">
      <div class="column">
        <h1>Student Form</h1>
        <div class="studentForm">
          ${renderStudentForm(data)}
          <table class="table">
          <thead>
            <th>Name</th>
            <th>Age</th>
            <th>Major</th>
            <th>Semester</th>
          <thead>
          <tbody>
            ${renderStudentRows(students)}
          </tbody>
        </table>
        </div>
      </div>

      <div class="column">
        <div class="majorForm">
        <form method="post" action="/create-major">
          <label>
            Major
            <input name="majorName" />
          </label>
          <button type="submit">Save</button>
        </form>
        </div>
        <table class="table">
          <thead>
            <th>Major</th>
          <thead>
          <tbody>
            ${renderMajorRows(majors)}
          </tbody>
        </table>
      </div>

    </div>
  </body>
  </html>
  `
}

module.exports = {
  renderIndex: renderIndex,
  renderStyle: function(){
    return `h1 {
      color: red;
    }
    .studentForm{
      width: 400px;
      margin: auto;
  
    }
    form{
      display: flex;
      flex-direction: column;
    }`
  }
}