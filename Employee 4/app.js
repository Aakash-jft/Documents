$(function () {
  let Name = $("#name");
  let Job = $("#job");
  let Salary = $("#salary");
  let id = null;
  let flag = true;

  let arr2 = JSON.parse(localStorage.getItem("Employees")) || [];

  function getshow() {
    apiCalls("get");
  }

  function employee(name, job, salary) {
    this.name = name;
    this.job = job;
    this.salary = salary;
  }

  function show(arr) {
    $("#table").html(`<tr>
    <th>Name</th>
    <th>Job</th>
    <th>Salary</th>
    <th>Action</th>
  </tr>`);
    arr.forEach((e) => {
      let tabb = `<tr id="rw-${e.id}"> 
        <td>${e.name}</td>
        <td>${e.job}</td>
        <td>${e.salary}</td>
        <td>
        <button  class="delete" id ="${e.id}" >delete</button>
        <button  class = "edit" id ="${e.id}" class="edit">edit</button>
      </td>
    </tr>`;

      $("#table").append(tabb);
    });
  }

  function apiCalls(method, data) {
    if (method == "get") {
      let request = $.ajax({
        url: "http://localhost:3000/Employees",
        method: "GET",
      });

      request.done(function (data) {
        arr2 = data;
        show(arr2);
      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
    } else if (method == "post") {
      let request = $.ajax({
        url: "http://localhost:3000/Employees",
        method: "POST",
        data: data,
      });

      request.done(function (data) {
        console.log(data);
        let tabb = `<tr id="rw-${data.id}"> 
          <td>${data.name}</td>
            <td>${data.job}</td>
            <td>${data.salary}</td>
            <td>
            <button  class="delete" id ="${data.id}" >delete</button>
            <button  class = "edit" id ="${data.id}" class="edit">edit</button>
          </td>
       </tr>`;
        console.log(data);

        $("#table").append(tabb);
      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
    } else if (method == "put") {
      let request = $.ajax({
        url: `http://localhost:3000/Employees/${id}`,
        method: "PUT",
        data: data,
      });

      request.done(function (data) {
        console.log(data);
        getshow();
      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
    } else if (method == "dele") {
      let request = $.ajax({
        url: `http://localhost:3000/Employees/${id}`,
        method: "DELETE",
      });

      request.done(function (data) {
        $(`#rw-${id}`).remove();
      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });
    }
  }

  getshow();

  if (arr2.length > 0) {
    show(arr2);
  }

  $("#btn").click(async (e) => {
    if (flag == true) {
      let obj = new employee(Name.val(), Job.val(), Salary.val());

      apiCalls("post", obj);
    } else {
      let obj = new employee(Name.val(), Job.val(), Salary.val());

      apiCalls("put", obj);
      $("#btn").html("Add");

      flag = true;
    }
  });

  $("#table").on("click", ".delete", async function () {
    console.log(this, this.id);
    id = this.id;
    console.log(id);
    apiCalls("dele");
  });

  $("#table").on("click", ".edit", async function () {
    $("#btn").html("Edit");
    flag = false;
    id = this.id;
    let request = $.ajax({
      url: `http://localhost:3000/Employees/${id}`,
      method: "GET",
    });

    request.done(function (data) {
      Name.val(data.name);
      Job.val(data.job);
      Salary.val(data.salary);
    });

    request.fail(function (jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
  });
});
