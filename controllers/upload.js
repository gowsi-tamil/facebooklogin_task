const uploadserv = require("../services/upload");
const toservices = require("../services/todo");
const todomodel = require("../models/todo");
const uploadmodel = require("../models/upload");
const toservicess = new toservices(todomodel);

const uploadservices = new uploadserv(uploadmodel);

class uploadcontrollers {
    async upload(req, res, next) {
        try {
          
    
    
          const result = await uploadservices.upload(req);
          const getall = await toservicess.getAll();
          const result2 = await uploadservices.getAllimage();

          res.render('pages/account', {user:req.user.displayName,tasks:getall,images:result2})
    
    
        } catch (ex) {
          next(ex);
        }
      } 
      async getAllimages(req, res, next) {
        try {
    
          const result2 = await uploadservices.getAllimage();
    
         return result2
         // res.status(200).json(result);
        } catch (ex) {
    
          console.log(ex)
          next(ex);
        }
      }
      async deleteimage(req, res, next) {
        try {
    
          const result = await uploadservices.deleteimage(req.params.id, req.body);
          const getall = await toservicess.getAll();
          const result2 = await uploadservices.getAllimage();
    
     
         res.render('pages/account', {user:req.user.displayName,tasks:getall,images:result2})
    
        } catch (ex) {
          next(ex);
        }
      }
    
}

module.exports = new uploadcontrollers(uploadservices);
