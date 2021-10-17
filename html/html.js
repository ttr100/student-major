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

function renderStudentForm(majors){
  return /*html*/`
    <form method="post" action="/create-student">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" name="name" />
        </div>
      </div>
      <div class="field">
        <label class="label">Age</label>
        <div class="control">
          <input class="input" name="age" />
        </div>
      </div>
      <div class="field">
        <label class="label">Major</label>
        <div class="control">
          <div class"select">
            <select name="major">
            ${
              majors.map((major) => `<option value="${major.majorName}">${major.majorName}</option>`)
              .join('')
            }
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Semester</label>
        <div class="control">
          <input class="input" name="semester" />
        </div>
      </div>
      <div class="control">
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

      <h2>Delete Failed</h2>
      <div class="column">
        <h1>Student Form</h1>
        <div class="studentForm">
          ${renderStudentForm(majors)}
          <table>
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
        <table>
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
    return /*css*/`h1 {
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