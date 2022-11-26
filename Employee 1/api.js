function employee() {
  this.arr = [];

  this.post = function (obj, cb) {
    
    setTimeout(() => {
      this.arr.push(obj);
      cb(this.arr);
    }, 2000);
  };
  this.put = function (obj, cb) {
    console.log(obj.id);
    setTimeout(() => {
      let finId = this.arr.findIndex((a) => Number(a.id) == Number(obj.id));
      console.log(finId, "idd");
      this.arr[finId] = obj;
      cb(this.arr);
    }, 2000);
  };

  this.del = function (id, cb) {
    setTimeout(() => {
      this.arr.splice(
        this.arr.findIndex((a) => a.id === id),
        1
      );
      cb(this.arr);
    }, 2000);
  };

  this.get = function (id, cb) {
    setTimeout(() => {
      let index = this.arr.findIndex((a) => a.id === id);
      cb(this.arr[index]);
    }, 2000);
  };

  
}
