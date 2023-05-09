const fs = require('fs');
const multer = require('multer');
const upload = multer();

/** Base service class*/
class todoservices {
    constructor(model) {
      this.model = model;
    }


    /**Get all employees */
    async getAll() {
      try {
        console.log("finding")
        const result = await this.model.find({});

        return result;
      } catch (ex) {
        throw ex;
      }
    }
  
    async create(data) {
      

        try {
        var obj={
            "taskname":data.taskname,
            "desc":data.desc,
            "completed":data.completed,
          
        }
    
          const saved = await this.model.create(obj);
          const result = await this.model.find({});
       

          return result;
        } catch (ex) {
            console.log(ex)
          throw ex;
        }
      }



      async getLastId() {
        try {
          return await this.model.count();
        } catch (ex) {
          throw ex;
        }
      }
  
      async update(id, data) {
        try {
        
          const item = await this.model.findOneAndUpdate({ _id: id  }, data);
          console.log(item)
          return item;
        } catch (ex) {
          throw ex;
        }
      }
    
      async delete(id, data) {
        try {
       

          const item = await this.model.findOneAndDelete({ _id: id },data);

          return item;
        } catch (ex) {
          throw ex;
        }
      }
  }



  module.exports = todoservices;
  