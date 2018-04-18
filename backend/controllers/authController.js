const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const path = require('path');
let db = require('../models/index');
let secretString = "SecretString";
let signup = (req, res)=>{
    if(req.body && req.body.email &&req.body.password && req.body.name){
        db.db.query(`SELECT * FROM user WHERE email = '${req.body.email.toLowerCase()}'`,(error, results)=>{
            if(results && results[0]){
                console.log('User exists.  Sending failure');
                return res.status(403).json({success:false, msg:"Username already exists.  Please select another"});
            }else{
                let email = req.body.email.toLowerCase();
                let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
                let name = req.body.name;
                db.db.query(`INSERT INTO user(email, password, name) VALUES('${email}','${password}','${name}')`,(error,response)=>{
                    if(error){
                        console.log('error inserting user into table',error);
                        res.status(403).json({success:false, msg:"There has been an error creating your account.  Please try again"});
                    }else{
                        console.log('succesfully inserted user!',response.insertId);
                        let token = jwt.encode({id:response.insertId, email:email, password:password, name: name},secretString);
                        res.json({success:true, token: token, msg:"Welcome to FantasyF1 "+jwt.decode(token,secretString).name});
                        console.log("all done signing up, ending connection");
                    }
                });
            }
        });
    }else{
        console.log('Incomplete form on signup');
        res.json({success: false, msg:"Please complete all fields"});
    }
}

let getUpdatePassword = (req, res)=>{
    res.sendFile(path.resolve('./dist/index.html'));
}

let updatePassword = (req, res)=>{
    console.log('got to updatePassword!');
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
    db.db.query(`UPDATE user SET password = '${password}' WHERE email = 'antolindiaz@gmail.com';`,(error, results)=>{
        if(error){
            console.log('error updating password',error);
            res.status(403).json({success:false, msg:"There has been an error updating your password.  Please notify the administrator"});
        }else{
            console.log('Success updating password');
            res.redirect('/');
        }
    })
}

let login = (req, res)=>{
    if(req.body && req.body.email && req.body.password){
        db.db.query(`SELECT * FROM user WHERE email = '${req.body.email.toLowerCase()}'`,(error, results, other)=>{
            console.log(results);
            if(results&&!results[0]){
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
                        console.log('all done with login connection.  Ending connection');
                    }
                })
            }
        })
    }else{
        console.log('Incomplete form on login');
        res.json({success: false, msg:"Please complete all fields"});
    }
}

let hasGoodToken = (req, res, next)=>{
    if(req.headers.authorization&&req.headers.authorization.split(' ')[0]==="Bearer"){
        console.log('has a valide bearer token');
        let decodedToken = decodeToken(req);
        return next();
    }else{
        console.log('invalid bearer token');
        return res.json({success: false, msg:"Error, invalid token"});
    }
}

let decodeToken = (req)=>{
    return jwt.decode(req.headers.authorization.split(' ')[1],secretString);
}

module.exports.getUpdatePassword = getUpdatePassword;
module.exports.updatePassword = updatePassword;
module.exports.signup = signup;
module.exports.login = login;
module.exports.hasGoodToken = hasGoodToken;
module.exports.decodeToken = decodeToken;