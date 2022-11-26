let name = document.getElementById("name");
let job = document.getElementById("job");
let salary = document.getElementById("salary");
let btn = document.getElementById("btn");
let table = document.getElementById("table");
let flag = true;
let idd = null;
let emp = new employee();
let counter = 0;

let arr2 = [];

function data(name, job, salary, id) {
  this.id = id;
  this.name = name;
  this.job = job;
  this.salary = salary;
}


btn.addEventListener("click", () => {
  if (flag == true) {
    let obj = new data(name.value, job.value, salary.value, counter);

    counter++;
    emp.post(obj, show);
    emp.getAll()
  } else {
    let obj = new data(name.value, job.value, salary.value, idd);
    emp.put(obj, show);
    flag = true;
  }
});

function show(arr) {
  document.getElementById("table").innerHTML = "";
  arr.forEach((e) => {
    let tabb = `<tr> 
      <td>${e.name}</td>
      <td>${e.job}</td>
      <td>${e.salary}</td>
      <td>
      <button onclick=emp.del(${e.id},show) >delete</button>
      <button onclick=fetch(${e.id}) class="edit">edit</button>
      </td>
    </tr>`;
    document.getElementById("table").innerHTML =
      document.getElementById("table").innerHTML + tabb;
  });
}

function fetch(a) {
  idd = Number(a);
  flag = false;
  emp.get(Number(a), (e) => {
    name.value = e.name;
    job.value = e.job;
    salary.value = e.salary;
  });
}

function fetchAll(arr){
    arr
}