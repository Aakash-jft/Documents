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


btn.addEventListener("click",async () => {
  if (flag == true) {
    let obj = new data(name.value, job.value, salary.value, counter);
    counter++;


   let arr = await emp.post(obj);
   show(arr);
  
  } else {

    let obj = new data(name.value, job.value, salary.value, idd);
    let arr = await emp.put(obj);
    show(arr);
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
      <button onclick=delet(${e.id}) >delete</button>
      <button onclick=fetch(${e.id}) class="edit">edit</button>
      </td>
    </tr>`;
    document.getElementById("table").innerHTML =
      document.getElementById("table").innerHTML + tabb;
  });
}

async function fetch(a) {
    console.log(a)
  idd = Number(a);
  flag = false;

let obj = await emp.get(Number(a));

 
    name.value = obj.name;
    job.value = obj.job;
    salary.value = obj.salary;
    


}

async function delet(id){

    let arr = await emp.del(id);

    show(arr);
    
}


