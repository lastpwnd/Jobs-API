const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const register = async (req, res) => {

    // replaced by mongoose .pre
    // const { name, email, password } = req.body
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)
    // const tempUser = { name, email, password: hashedPassword} 

    // Optional, using mongoose validator instead
    // if (!name || !email || !password) {
    //     throw new BadRequestError("Name, E-mail and Password are required!")
    // } 

     
    const user = await User.create({ ...req.body})
    //const token = jwt.sign({userID: user._id, name: user.name}, "jwtSecret", {expiresIn:'1d'})
    const token = user.createJWT()

    // in case of using instances
    //res.status(StatusCodes.CREATED).json({user:{name: user.getName()}, token})
    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token})
}

const login = async (req, res) => {
    const { email, password } = req.body    
    if (!email || !password) {
        throw new BadRequestError("Please provide email / password")
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new UnauthenticatedError("Username doesn't exist")
    }
    const correctPassword = await user.checkPassword(password)
    if (!correctPassword) {
        throw new UnauthenticatedError("Invalid password")
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token})
}

module.exports = {
    register,
    login
}