const fs = require('fs');
const multer = require('multer');
const upload = multer();

class uploadservices{
    constructor(model2) {
      this.model2 = model2;
    }
  
  
    /**Get all employees */
  
  
    async upload(data) {
     
  const obj = {
    name:data.file.originalname,
    image:{
      data:data.file.buffer,
      contentType:data.file.mimetype
    }
  }
        try {
        
          const saved = await this.model2.create(obj);
       
  
          return saved;
        } catch (ex) {
            console.log(ex)
          throw ex;
        }
      }

      async getAllimage() {
        try {
          const result = await this.model2.find({});
  
          return result;
        } catch (ex) {
          throw ex;
        }
      }

      async deleteimage(id, data) {
        try {
       

          const item = await this.model2.findOneAndDelete({ _id: id },data);

          return item;
        } catch (ex) {
          throw ex;
        }
      }
  }
    
  module.exports = uploadservices;