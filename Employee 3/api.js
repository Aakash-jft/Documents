function employee() {
    this.arr = [];
  
    this.post =function (obj) {

      let p = new Promise((res,rej)=>{
        

        setTimeout(()=>{
          this.arr.push(obj)
          res(this.arr)
        },2000)

      })

      return p;

      
      // setTimeout(() => {
      //   this.arr.push(obj);
      //   cb(this.arr);
      // }, 2000);
    };
    this.put = function (obj, cb) {
      console.log(obj.id);

      let  p = new Promise((resolve, reject) => {
        
        setTimeout(()=>{
          let finId = this.arr.findIndex((a) => Number(a.id) == Number(obj.id));
        console.log(finId, "idd");
        this.arr[finId] = obj;
        resolve(this.arr);
        },2000)
      })

      return p;
      // setTimeout(() => {
      //   let finId = this.arr.findIndex((a) => Number(a.id) == Number(obj.id));
      //   console.log(finId, "idd");
      //   this.arr[finId] = obj;
      //   cb(this.arr);
      // }, 2000);
    };
  
    this.del = function (id) {

      let p  = new Promise((resolve, reject) => {
        
        setTimeout(()=>{
          this.arr.splice(
            this.arr.findIndex((a) => a.id === id),
            1
          );
          resolve(this.arr)
        },2000)
      })

      return p
      // setTimeout(() => {
      //   this.arr.splice(
      //     this.arr.findIndex((a) => a.id === id),
      //     1
      //   );
      //   cb(this.arr);
      // }, 2000);
    };
  
    this.get = function (id) {

      let  p = new Promise((resolve, reject) => {
        setTimeout(()=>{
          let index = this.arr.findIndex((a) => a.id === id);
            resolve(this.arr[index])
        },2000)
      })
      return p;
    //   setTimeout(() => {
    //     let index = this.arr.findIndex((a) => a.id === id);
    //     cb(this.arr[index]);
    //   }, 2000);
    // };
  
    
  }

}
  