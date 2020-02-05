const bcrypt = require('bcryptjs');
const validation = require('./user.validation');
const Users = require('./users.model')
const AuthHelper = require('./auth')

const { genSaltSync, hashSync } =bcrypt
const register = async (req,res) =>{
    try{
    const { error } = validation.validateUser(req.body)
    if(error){
        res.status(422).json({
            status:422,
            error:error.details[0].message
        })
    }

    const { first_name, last_name, email, password } = req.body
    let doc = await Users.findOne({email})

    if(doc){
        res.status(409).json({
            status:409,
            message:'email already exists'
        })
    }
    // Insert a new user
    let salt = genSaltSync(10)
    const hash = hashSync(password,salt);
    
    doc = new Users({
        first_name,
        last_name,
        email,
        password:hash
    })
    await doc.save();

    res.status(201).json({
        status:201,
        message:'User created successfully',
        user:AuthHelper.Auth.toAuthJSON(doc)
    });
    }
catch(error){
    return res.status(500).json({
        status: 500,
        error,
    }
    )}


}

module.exports = {register}