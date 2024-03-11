require("dotenv").config(); // import dotenv file//
const user = require("../model/UserSchema"); // Import user releted Schemas//
const bcrypt = require("bcrypt"); // bcrypt library for hashing password//
const jwt = require("jsonwebtoken"); // import jsonWebToken library//

// function for getting all users from database============================>//
const users = async (req, res) => {
  const mydata = await user.find({});
  res.status(200).json(mydata);
};

// function for Adding new user in database===========================>//
const adduser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    // validating user already exist or not//
    const userEmailExist = await user.findOne({ email: email });
    if (userEmailExist) {
      return console.log("user email Already Exist");
    }

    // hashing passsword with bcrypt library//
    const salt = 10;
    const hash_password = await bcrypt.hash(password, salt);
    // console.log(hash_password);

    const userData = {
      name: name,
      email: email,
      password: hash_password,
      mobile: mobile,
    };

    // if user not exist just create it new user//
    await user.create(userData);
    res.status(200).json("user Added");
  } catch (error) {
    console.log(error);
  }
};

// function for user login============================>//
const login = async (req, res) => {
  const { email, password } = req.body;
  const jwtSecretKey = process.env.jwt_secret_key;


  try {
    // checking user is available or not//
    const isUser = await user.findOne({ email: email });

    
    if (isUser) {
      // compaire user given password with increpted password//
      const isMatchPassword = await bcrypt.compare(password, isUser.password);
      if (isMatchPassword) {
        // res.send("user login");

        let jwttoken = await jwt.sign({isUser}, jwtSecretKey);

        await user.findOneAndUpdate({email:isUser.email},{$set:{token:jwttoken}});
        await res.status(200).send(jwttoken);
    
      } else {
        res.send("invalid credetial: password wrong");
      }

    } else {
      return console.log("Invalid user:Email not found");
    }

  } catch (error) {
    console.log(error);
  }
};

// exports all those function //
module.exports = { users, adduser, login };
