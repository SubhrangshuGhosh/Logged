const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require("../Models/User");

const signup = async(req, res) => {
    try {
        const  {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user) {
            return res.status(409)
                      .json({message: 'User is registered', success: false});
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
           .json({
            message: "Signup Successfully",
            success: true
           })

    } catch (err) {
            res.status(500)
           .json({
            message: "Server Error",
            success: false
           })
    }

}

const login = async(req, res) => {
    try {
        const  {email, password} = req.body;
        const user = await UserModel.findOne({email});
        const errorMsg = 'Auth failed, Email or password is wrong';
        if(!user) {
            return res.status(403)
                      .json({message: errorMsg, success: false});
        }
        
        const isPasswordEqual = await bcrypt.compare(password, user.password)

        if(!isPasswordEqual) {
            return res.status(403)
                      .json({message: errorMsg, success: false});
        }

        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200)
           .json({
            message: "Login success",
            success: true,
            token: jwtToken,
            email: user.email,
            name: user.name
           })

    } catch (err) {
            res.status(500)
           .json({
            message: "Server Error",
            success: false
           })
    }

}

module.exports = {
    signup,
    login
}