const toservices = require("../services/todo");
const todomodel = require("../models/todo");
const uploadserv = require("../services/upload");

const uploadmodel = require("../models/upload");

//const toservices = require("../services/upload");


const toservicess = new toservices(todomodel);
const uploadservices = new uploadserv(uploadmodel);


class todocontrollers {
  async getAll(req, res, next) {
    try {

      const result = await toservicess.getAll();
      const result2 = await uploadservices.getAllimage();
     
     return result
     // res.status(200).json(result);
    } catch (ex) {

      console.log(ex)
      next(ex);
    }
  }

  async create(req, res, next) {
    try {



      const result = await toservicess.create(req.body);
      const getall = await toservicess.getAll();
      const result2 = await uploadservices.getAllimage();

      res.render('pages/account', {user:req.user.displayName,tasks:getall,images:result2})


    } catch (ex) {
      next(ex);
    }
  } 
  async upload(req, res, next) {
    try {
 


      const result = await uploadservices.upload(req);

      res.render('pages/account', {user:req.user.displayName,tasks:result})


    } catch (ex) {
      next(ex);
    }
  } 

  async update(req, res, next) {
    try {
      

      const result = await toservicess.update(req.params.id, req.body);
      const getall = await toservicess.getAll();
      const result2 = await uploadservices.getAllimage();

      res.render('pages/account', {user:req.user.displayName,tasks:getall,images:result2})

    } catch (ex) {
      next(ex);
    }
  }

  async delete(req, res, next) {
    try {

      const result = await toservicess.delete(req.params.id, req.body);
      const getall = await toservicess.getAll();
      const result2 = await uploadservices.getAllimage();

  
     res.render('pages/account', {user:req.user.displayName,tasks:getall,images:result2})

    } catch (ex) {
      next(ex);
    }
  }

 
}



module.exports = new todocontrollers(toservicess);
