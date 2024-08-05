const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const bcrypt = require('bcryptjs')

const register = async (req , res) => {
    const {name , email , password} = req.body
    console.log(req.body);
    const salt = await bcrypt.genSalt(10)
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password , salt)
    console.log(hashedPassword);
    const user = await User.create({name ,email , password : hashedPassword})
    res.status(StatusCodes.CREATED).json({user})
}

const login = async (req , res) => {
    res.send('login router')
}

module.exports = {register , login}