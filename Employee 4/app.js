$(function () {
  let Name = $("#name");
  let Job = $("#job");
  let Salary = $("#salary");
  let id = null;
  let flag = true;

  let arr2 = JSON.parse(localStorage.getItem("Employees")) || [];

  function employee(name, job, salary) {
    this.name = name;
    this.job = job;
    this.salary = salary;
  }

  function apiCalls(method,data){
    if(method=="get"){
      let request = $.ajax({
        url: "http://localhost:3000/Employees",
        method: "GET",
        // data: JSON.stringify(data)
      });
       
      request.done(function( data ) {
        arr2 = data;
        localStorage.setItem("Employees",JSON.stringify(arr2));
        show(data);
      });
       
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
    }
    else if(method=="post"){
      let request = $.ajax({
        url: "http://localhost:3000/Employees",
        method: "POST",
        data: data
      });
       
      request.done(function( data ) {
        console.log(data);
        arr2 = [...arr2,data];

       localStorage.setItem("Employees", JSON.stringify(arr2));
       let tabb = `<tr id="rw-${data.id}"> 
       <td>${data.name}</td>
       <td>${data.job}</td>
       <td>${data.salary}</td>
       <td>
       <button  class="delete" id ="${data.id}" >delete</button>
       <button  class = "edit" id ="${data.id}" class="edit">edit</button>
       </td>
     </tr>`;
 
       $("#table").append(tabb);
      });
       
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
    }
    else if(method=="put"){
      let request = $.ajax({
        url: `http://localhost:3000/Employees/${id}`,
        method: "PUT",
        data: data
      });
       
      request.done(function( data ) {
        console.log(data);
        let index = arr2.findIndex(e=>e.id==data.id);
        arr2[index]=data;

       localStorage.setItem("Employees", JSON.stringify(arr2));
       show(arr2);
      });
       
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });

    }
    else if(method=="dele"){
      let request = $.ajax({
        url: `http://localhost:3000/Employees/${id}`,
        method: "DELETE"
      });
       
      request.done(function( data ) {
        console.log(data);
        
        arr2.splice(
          arr2.findIndex((a) => Number(a.id) === Number(id)),
          1
        );

       localStorage.setItem("Employees", JSON.stringify(arr2));
       $(`#rw-${id}`).remove();
      });
       
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
    }
      
    
  }
  
  // getData();
  getshow();
  // console.log(arr2)

  if (arr2.length > 0) {
    show(arr2);
  }

  $("#btn").click(async (e) => {
    if (flag == true) {
      let obj = new employee(Name.val(),Job.val(), Salary.val());

       apiCalls("post",obj)
      

      // let arr = await emp.post(obj);
    } else {
      let obj = new employee(Name.val(),Job.val(), Salary.val());
      
      apiCalls("put",obj)

      flag = true;
    }
  });

  

  $("#table").on("click", ".delete", async function () {
    console.log(this, this.id);
    id=this.id;
    console.log(id);
    apiCalls("dele");


    
  });

  $("#table").on("click", ".edit", async function () {
    $("#btn").html("edit");
    flag = false;
    id=this.id;
    let index = arr2.findIndex((e)=>e.id==this.id);
    obj = arr2[index];
    Name.val(obj.name);
    Job.val(obj.job);
    Salary.val(obj.salary);
  });

  function show(arr) {
    // document.getElementById("table").innerHTML = "";
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

  function getshow(){
    apiCalls("get");
  }
  
});
