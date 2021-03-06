const data = require('../data');

function renderStudentRows(students) {
  return students
    .map(function (student) {
      let studentMajor = data.getMajor(student.majorIndex);
      let remaining = parseInt(studentMajor.majorSemester) - parseInt(student.semester);
      if(remaining <= 0){
        remaining = 'overdue'
      }
      return `<tr>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${studentMajor.majorName}</td>
      <td>${student.semester}</td>
      <td>${remaining}</td>
    </tr>`;
    })
    .join("");
}

function renderMajorRows(majors) {
  return majors
    .map(function (major, index) {
      return `<tr>
      <form action="/update-major" method="POST">
        <td>
          <input type="hidden" name="index" value="${major.id}" />
          <input name="majorName" value="${major.majorName}" />
        </td>
        <td><input name="majorSemester" value="${major.majorSemester}" /></td>
        <td><button type="submit">Save</button></td>
      </form>
      <form action="/delete-major" method="POST">
        <td>
          <input type="hidden" name="id" value="${major.id}" />
        </td>
        <td><button type="submit">Delete</button></td>
      </form>
    </tr>`;
    })
    .join("");
}

function renderStudentForm(majors) {
  let disabledString = "";
  if(majors.length < 1){
    disabledString = "disabled"
  }

  return /*html*/`
    <form method="post" action="/create-student">

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input name="name" class="input" type="text" placeholder="Name">
        </div>
      </div>

      <div class="field">
        <label class="label">Age</label>
        <div class="control">
          <input name="age" class="input" type="text" placeholder="Name">
        </div>
      </div>

      <div class="field">
        <label class="label">Major</label>
        <div class="control">
          <div class="select">
            <select name="majorIndex">
                ${majors.map((major) => {
                  return `<option value="${major.id}">${major.majorName}</option>`;
                })}
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Semester</label>
        <div class="control">
          <input name="semester" class="input" type="text" placeholder="Name">
        </div>
      </div>

      <div class="control">
          <button ${disabledString} type="submit" class="button is-link">Submit</button>
      </div>   
      </form>`;
}

function renderMajorForm() {
  return `
          <h1 class="is-size-2">Major Form</h1>
          <div class="field majorForm">
            <form method="post" action="/create-major">
                <label class="name">Major</label>
                <input name="majorName" class="input" type="text" placeholder="Major">

                <div class="field">
                  <label class="label">Semester</label>
                  <div class="control">
                    <input name="majorSemester" class="input" type="text" placeholder="Semester">
                  </div>
                </div>
                
                <button type="submit">Save</button>
            </form>
          </div>
  `;
}


function renderError(errorMsg){
  if(errorMsg){
    return `<p class="notification is-danger">${errorMsg}</p>`;
  }
  else{
    return ''
  }
}

function renderIndex(data, errorMessage='') {
  const students = data.students;
  const majors = data.majors;
  return /*html*/`
      <html>
  <head>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  </head>
  <body>
    ${renderError(errorMessage)}
    <div class="columns">
      <div class="column">
          <h1 class="is-size-2">Student Form</h1>
          <div class="studentForm">
            ${renderStudentForm(majors)}
          </div>
      </div>
      <div class="column">
        ${renderMajorForm()}
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <table class="table">
          <thead>
            <th>Name</th>
            <th>Age</th>
            <th>Major</th>
            <th>Semester</th>
            <th>Remaining Semester</th>
          <thead>
        <tbody>
          ${renderStudentRows(students, majors)}
        </tbody>
      </table>
      </div>
      <div class="column">
        <table class="table">
          <thead>
              <th>Major</th>
              <th>Semesters</th>
              <th>Action</th>
          <thead>
          <tbody>
              ${renderMajorRows(majors)}
          </tbody>
        </table>
      </div>
    </div>
  </body>
  </html>`;
}

function renderStyle() {
  return `
  `;
}

module.exports = { renderIndex, renderStyle };
