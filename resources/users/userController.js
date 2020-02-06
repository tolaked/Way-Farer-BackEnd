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

   return res.status(201).json({
        status:201,
        message:'User created successfully',
        user:AuthHelper.Auth.toAuthJSON(doc)
    });
    
    }
catch(error){
    return res.status(500).json({
        status: 500,
        error:error.message || 'Something went wrong'
    }
    )}

}

const login = async (req,res) => {
    try{
        const {error} =validation.validateLogin(req.body)
        if(error){
            res.status(422).json({
                status:422,
                error:error.details[0].message
            })
        }
            const { email, password} = req.body

            const existingUser = await Users.findOne({email})
            if(!existingUser){
                res.status(400).json({
                    status:400,
                    message:'Invalid email or password'
                })
            }
            const userPassword = await bcrypt.compareSync(password,existingUser.password)
            if(!userPassword){
                res.status(400).json({
                    message:'invalid email or password'
                })
            }
            return res.status(200).json({
                message:'Logged in successfully',
                user:AuthHelper.Auth.toAuthJSON(existingUser)
            })
    }
    catch(error){
        return res.status(500).json({
            message: error.message || 'Could not login user',
          });
    }
}
module.exports = {register,login}