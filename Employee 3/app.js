$(function () {
  let Name = $("#name");
  let Job = $("#job");
  let Salary = $("#salary");

  function data(name, job, salary, id) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.salary = salary;
  }

  function catche(arr, count) {
    (this.arr = arr), (this.count = count);
  }

  let flag = true;
  let idd = null;

  let mem = JSON.parse(localStorage.getItem("Employees")) || new catche([], 0);

  let counter = mem.count;

  let arr2 = mem.arr;

  let emp = new employee(arr2);

  if (arr2.length > 0) {
    show(arr2);
  }

  $("#btn").click(async (e) => {
    // e.preventDefault();
    console.log($("#name").val());
    if (flag == true) {
      let obj = new data(Name.val(), Job.val(), Salary.val(), counter);
      counter++;

      let arr = await emp.post(obj);
      let employeeData = new catche(arr, counter);

      localStorage.setItem("Employees", JSON.stringify(employeeData));
      show(arr);
    } else {
      let obj = new data(Name.val(), Job.val(), Salary.val(), idd);
      let arr = await emp.put(obj);

      let employeeData = new catche(arr, counter);
      localStorage.setItem("Employees", JSON.stringify(employeeData));
      
      $("#btn").html("add")

      show(arr);
      flag = true;

    }
  });

  function show(arr) {
    // document.getElementById("table").innerHTML = "";
    $("#table").html("");
    arr.forEach((e) => {
      let tabb = `<tr> 
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

  $("#table").on("click", ".delete", async function () {
    console.log(this, this.id);
    let arr = await emp.del(this.id);
    let employeeData = new catche(arr, counter);
    localStorage.setItem("Employees", JSON.stringify(employeeData));

    show(arr);
  });

  $("#table").on("click", ".edit", async function () {
    $("#btn").html("edit");
    idd = Number(this.id);
    flag = false;

    let obj = await emp.get(Number(this.id));
    Name.val(obj.name);
    Job.val(obj.job);
    Salary.val(obj.salary);
  });

  // async function fetch(a) {
  //     console.log(a)
  //   idd = Number(a);
  //   flag = false;

  // let obj = await emp.get(Number(a));
  //     name.value = obj.name;
  //     job.value = obj.job;
  //     salary.value = obj.salary;
  // }

  // async function delet(id){

  // let arr = await emp.del(id);
  // localStorage.setItem("Employees",JSON.stringify(arr));

  // show(arr);

  // }
});
// let name = document.getElementById("name");
// let job = document.getElementById("job");
// let salary = document.getElementById("salary");
// let btn = document.getElementById("btn");
// let table = document.getElementById("table");
// let flag = true;
// let idd = null;
// let emp = new employee();
// let counter = 0;

// let arr2  = JSON.parse(localStorage.getItem("Employees"))||[];
// console.log($)
// if(arr2.length>0){
//   show(arr2);
// }

// function data(name, job, salary, id) {
//   this.id = id;
//   this.name = name;
//   this.job = job;
//   this.salary = salary;
// }

// btn.addEventListener("click",async () => {
//   if (flag == true) {
//     let obj = new data(name.value, job.value, salary.value, counter);
//     counter++;

//    let arr = await emp.post(obj);
//    localStorage.setItem("Employees",JSON.stringify(arr));
//    show(arr);

//   } else {

//     let obj = new data(name.value, job.value, salary.value, idd);
//     let arr = await emp.put(obj);
//     localStorage.setItem("Employees",JSON.stringify(arr));
//     show(arr);
//     flag = true;

//   }
// });

// function show(arr) {
//   document.getElementById("table").innerHTML = "";
//   arr.forEach((e) => {
//     let tabb = `<tr>
//       <td>${e.name}</td>
//       <td>${e.job}</td>
//       <td>${e.salary}</td>
//       <td>
//       <button onclick=delet(${e.id}) >delete</button>
//       <button onclick=fetch(${e.id}) class="edit">edit</button>
//       </td>
//     </tr>`;
//     document.getElementById("table").innerHTML =
//       document.getElementById("table").innerHTML + tabb;
//   });
// }

// async function fetch(a) {
//     console.log(a)
//   idd = Number(a);
//   flag = false;

// let obj = await emp.get(Number(a));
//     name.value = obj.name;
//     job.value = obj.job;
//     salary.value = obj.salary;
// }

// async function delet(id){

//     let arr = await emp.del(id);
//     localStorage.setItem("Employees",JSON.stringify(arr));

//     show(arr);

// }
