const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
let db = require('../models').db;
let secretString = "SecretString";

let signup = (req, res)=>{
    console.log(req.body);
    db.query(`SELECT * FROM user WHERE email = '${req.body.email.toLowerCase()}'`,(error, results)=>{
        if(results && results[0]){
            console.log('User exists.  Sending failure');
            return res.status(403).json({success:false, msg:"Username already exists.  Please select another"});
        }else{
            let email = req.body.email.toLowerCase();
            let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
            let name = req.body.name;
            db.query(`INSERT INTO user(email, password, name) VALUES('${email}','${password}','${name}')`,(error,response, fields)=>{
                if(error){
                    console.log('error inserting user into table',error);
                    res.status(403).json({success:false, msg:"There has been an error creating your account.  Please try again"});
                }else{
                    console.log('succesfully inserted user!',response,"fields:",fields);
                    let token = jwt.encode({email:email, password:password, name: name},secretString);
                    res.json({success:true, token: token, msg:"Welcome to FantasyF1 "+jwt.decode(token,secretString).name})
                }
            });
        }
    });
}

let login = (req, res)=>{
    db.query(`SELECT * FROM user WHERE email = '${req.body.email.toLowerCase()}'`,(error, results, other)=>{
        if(!results[0]){
            console.log("Didn't find user on login");
            return res.status(403).json({success:false, msg:"Could not find username"});
        }else{
            bcrypt.compare(req.body.password, results[0].password, (err, isValid)=>{
                if(err){
                    console.log('error comparing passwords:',err);
                    res.status(403).json({success: false, msg:"There has been an error.  Please try again"});
                }else if(!isValid){
                    console.log("Incorrect password");
                    res.status(403).json({success: false, msg:"Incorrect password.  Please try again"});
                }else{
                    console.log("Valid Password!");
                    let token = jwt.encode(results[0], secretString);
                    res.json({success:true, token: token, msg:"Welcome back "+jwt.decode(token, secretString).name+"!"});
                }
            })
        }
    })
}

let hasGoodToken = (req, res, next)=>{
    if(req.headers.authorization||req.headers.authorization.split(' ')[0]==="Bearer"){
        console.log('has a valide bearer token');
        let decodedToken = decodeToken(req);
        return next();
    }else{
        console.log('invalid bearer token');
        return res.json({success: false, msg:"Error, invalid token"});
    }
}

let decodeToken = (req)=>{
    return jwt.decode(req.headers.authorization.split(' '[1],secretString));
}

module.exports.signup = signup;
module.exports.login = login;
module.exports.hasGoodToken = hasGoodToken;
module.exports.decodeToken = decodeToken;