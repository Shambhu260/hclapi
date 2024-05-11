const transactionModel = require("./transaction.model");
// const jwt = require('jsonwebtoken');
exports.register = async function (req,res){
    try {
        var newTransaction = new transactionModel(req.body)
            var saveTransaction = await newTransaction.save()
            if(saveTransaction) {
                res.send({status: true, code: 200, message: "Transaction created Successfully", data: saveTransaction})
            } else {
                res.send({status: true, code: 405, message: "Oops something went wrong", data: {}})
            }
        }catch(e) {
            res.send({status: true, code: 400, message: "Oops something went wrong"+ e})
        }
        
  
}
exports.getAllEmployee = async function (req,res){
    try {
        var employee  = await empModel.find({});
        if(employee) {
            res.send({status: true, code: 200, message: "Get All Employee", data: employee})
        } else {
            res.send({status: false, code: 405, message: "Oops something went wrong", data: {}})
        }
    } catch (error) {
        res.send({status: true, code: 200, message: "Oops something went wrong"+ error})
    }
   
    }

exports.updateEmployee = async function (req,res) {
    try {
        var updateData = req.body    //params
    var updateEmp = await empModel.findOneAndUpdate({ empId: req.params.empId }, {$set: updateData}, {new: true});
    if(updateEmp){
        res.send({status: true, code: 200, message: "Updte Emplyee Successfullt", data: updateData})
    } else {
        res.send({status: false, code: 405, message: "Oops something went wrong", data: {}})
    }
    } catch (error) {
        res.send({status: false, code: 405, message: "Oops someying went wrong"+ error})
    }
    
}
exports.deleteEmployee = async function (req,res){
    console.log("delete");
    try {
        var employee = await empModel.findOneAndDelete({empId: req.params.empId})
    if(employee){
        console.log("employee");
        res.send({status: true, code: 200, message: "Employee Delete Successfully"})
    } else {
        res.send({status: false, code: 405, message: "Oops something went wrong"})
    }
    } catch (error) {
        res.send({status: false, code: 405, message: "Oops something went wrong"+ error})
    }
    
}

exports.getTransactionById = async function (req,res){
    try {
        var transaction = await transactionModel.findOne({_id: req.params.transactionId})
        if(transaction){
            res.send({status: true, code: 200, message: "Get Single Transaction", data: transaction})
        } else {
            res.send({status: true, code: 200, message: "Oops something went wrong"})
        }
    } catch (error) {
        res.send({status: true, code: 200, message: "Oops something went wrong" + error})
    }
}

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// Sample user model and storage (in-memory for simplicity)
const users = [];

// Secret key for JWT signing (should be stored securely, not hardcoded)
const JWT_SECRET = 'your_jwt_secret';

// User Model
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

// Function to create a default user
function createDefaultUser() {
  const defaultUsername = 'admin';
  const defaultEmail = 'admin@example.com';
  const defaultPassword = 'adminpassword';

  // Hash the default password
  bcrypt.hash(defaultPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing default password:', err);
      return;
    }

    // Create and add the default user
    const defaultUser = new User(defaultUsername, defaultEmail, hashedPassword);
    users.push(defaultUser);
    console.log('Default user created successfully');
  });
}

// User login
exports.login = async function(req,res) {
    try {
        const users = [
            { username: 'admin', password: 'password' }
        ];
        const { username, password } = req.body;
        const user = users.find(user => user.username === username && user.password === password);
    
        if (user) {
            const token = await jwt.sign({ user }, 'secret', { expiresIn: 60 * 60 });
                user.token = token;
                console.log(user)
           return res.send({status: true, code: 200, message: "Login Successfully", data: user})
            
        } else {
            res.status(401).json({status: false, code: 405, message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Oops something went wrong' + error });
    }
    
}
