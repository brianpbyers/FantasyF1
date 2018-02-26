const request = require('request');

const db = require('../models').db;

const auth = require('../controllers/authController');

let getTest = (req,res)=>{
    res.json('IT WORKS!');
}

let getLeagues = (req, res)=>{
    let user = auth.decodeToken(req);
    console.log('userid:',user.id);
    db.query(
        `SELECT * FROM (league JOIN user_league ON league.id = user_league.league_id AND user_league.user_id=${user.id});`,(error, results)=>{
        if(error){
            console.log('Error grabbing leagues!')
            res.json({success:false, msg:"Error obtaining leagues"});
        }else{
            console.log('results of leaguesearch:',results);
            res.json(results);
        }
    });
}

let setUpUser = (user, leagueId,req,res)=>{
    db.query(`INSERT INTO user_league(user_id, league_id) VALUES(${user.id}, ${leagueId})`,(error, results)=>{
        if(error){
            console.log('Error inserting new user_league pair:',error);
            res.json({success:false, msg:"Error creating new user_league pair"});
        }else{
            console.log('successfully created new user_league pair!:',results);
            db.query(`INSERT INTO team(name, user_id, league_id, race_id) VALUES("${user.name}",${user.id},${leagueId},0)`,(error, results)=>{
                if(error){
                    console.log('there has been an error creating your team:', error);
                    res.json({success:false, msg:"error creating team"});
                }else{
                    console.log('Created a team!', results);
                    let teamId=results.insertId;
                    db.query(`INSERT INTO team_driver (team_id, driver_id, position) VALUES (${teamId},1,1),(${teamId},20,2),(${teamId},822,3),(${teamId},8,4),(${teamId},817,5),(${teamId},830,6),(${teamId},815,7),(${teamId},839,8),(${teamId},832,9),(${teamId},825,10);`,(error,results)=>{
                        if(error){
                            console.log('there has been an error setting default drivers',error);
                            res.json({success:false, msg:"error defaulting drivers"});
                        }else{
                            console.log("Successfully defaulted drivers!");
                            db.query(`INSERT INTO team_constructor (team_id, constructor_id, position) VALUES (${teamId},131,1),(${teamId},6,2),(${teamId},9,3), (${teamId},10,4), (${teamId},3,5);`,(error,results)=>{
                                if(error){
                                    console.log("error defaulting constructors",error);
                                    res.json({success:false, msg:"error defaulting constructors"});
                                }else{
                                    console.log("Successfully defaulted Constructors!");
                                    res.json({success:true, leagueId:leagueId});
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
let postLeague = (req, res)=>{
    let user = auth.decodeToken(req);
    db.query(`INSERT INTO league(name) VALUES("${req.body.name}")`,(error,results)=>{
        if(error){
            console.log('Error inserting new league',error);
            res.json({success:false, msg:"Error inserting new league"});
        }else{
            console.log('league insert results:',results);
            let leagueId = results.insertId
            setUpUser(user,leagueId, req, res);
        }
    });
}

//neat code snippet.  Might help during refactor.
//IF (SELECT COUNT(*) FROM beta WHERE name = 'John' > 0)
// UPDATE alfa SET c1=(SELECT id FROM beta WHERE name = 'John')
// ELSE
// BEGIN
//   INSERT INTO beta (name) VALUES ('John')
//   INSERT INTO alfa (c1) VALUES (LAST_INSERT_ID())
// END
//joinLeague allows users to join an existing league based on their knowledge of the league name or id and automatically creates a race 0 team for them.  (race 0 is current team)
let joinLeague = (req, res)=>{
    let user = auth.decodeToken(req);
    console.log('in Join league');
    db.query(`SELECT * FROM league WHERE id=${req.body.leagueId}`,(error,results)=>{
        if(error){
            console.log("error checking if league exists!",error);
            res.json({success:false, msg:"error checking for league existence"});
        }else if(!results[0]){
            console.log("League doesn't exist!");
            res.json({success:false, msg:"Couldn't find league"});
        }else{
            db.query(`SELECT * FROM user_league WHERE user_id=${user.id} AND league_id=${req.body.leagueId}`,(error, results)=>{
                if(error){
                    console.log("error checking if user already exists in league:",error);
                    res.json({});
                }else if(results[0]){
                    console.log(results);
                    console.log("User already in league!");
                    res.json({success:false, msg:"User already in league!"});
                }else{
                    console.log('putting user into league',results[0]);
                    setUpUser(user,req.body.leagueId, req, res);
                }
            })
        }
    })
}

let getTeams = (req, res)=>{
    db.query(`SELECT * FROM team WHERE league_id=${req.params.leagueId}`, (error, results)=>{
        if(error){
            console.log('Error grabbing teams');
            res.json({success:false, msg:"Error retrieving teams. Please refresh the page"});
        }else{
            console.log('results of teamSearch:',results);
            res.json({success: true, results:results});
        }
    })
}

//update the team 0 to requested specifications.  Want an array of drivers and an array of constructors in req.body
// UPDATE team_constructor SET constructor_id=(CASE WHEN position = 1 THEN 1
//     WHEN position = 2 THEN 3
//     WHEN position = 3 THEN 4
//     WHEN position = 4 THEN 5
//     WHEN position = 5 THEN 6 END) WHERE team_id = 5;
let postTeam = (req, res)=>{
    res.json('WOOO!  YOU GOT TO POSTLEAGUETEAMS!');
}

let canUserEdit = (userId, teamId, callback)=>{
    db.query(`SELECT * FROM team WHERE id=${teamId} AND user_id=${userId}`,(error,results)=>{
        if(error){
            console.log("there has been an error finding user/team combo",error);
            callback(false);
        }else if(results && results[0]){
            console.log('results of user/team search:',results);
            callback(true);
        }else{
            console.log('user should not be able to edit this team',results);
            callback(false);
        }

    })
}

let getTeam = (req, res)=>{
    let user = auth.decodeToken(req);
    let teamId = req.params.teamId;
    let retObj={};
    canUserEdit(user.id, teamId,(canEdit)=>{
        retObj.canEdit=canEdit;
        db.query(`SELECT team_constructor.position, constructor.id, constructor.name FROM team_constructor JOIN constructor ON team_constructor.constructor_id = constructor.id WHERE team_constructor.team_id = ${teamId}`,(error, results)=>{
            if(error){
                console.log("Error getting constructors for this team",error);
                res.json({success:false, msg:"Error getting constructors for this team"});
            }else{
                console.log(results);
                retObj.teamConstructors=results;
                db.query(`SELECT team_driver.position, driver.id, driver.number, driver.code, driver.surname FROM team_driver JOIN driver ON team_driver.driver_id = driver.id WHERE team_driver.team_id=${teamId}`,(error, results)=>{
                    if(error){
                        console.log("Error getting drivers for this team",error);
                        res.json({success:false, msg:"Error getting drivers for this team"});
                    }else{
                        retObj.teamDrivers=results;
                        db.query('SELECT id, name FROM constructor',(error, results)=>{
                            if(error){
                                console.log("Error grabbing all constructors",error);
                                res.json({success:false, msg:"Error grabbing all constructors"});
                            }else{
                                retObj.constructors=results;
                                db.query('SELECT id, number, code, surname FROM driver',(error, results)=>{
                                    if(error){
                                        console.log("Error Grabbing Drivers",error);
                                        res.json({success:false, msg:"Error grabbing drivers"});
                                    }else{
                                        retObj.drivers=results;
                                        retObj.success=true;
                                        res.json(retObj);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    })
}



module.exports.getTest = getTest;
module.exports.getLeagues = getLeagues;
module.exports.postLeague = postLeague;
module.exports.joinLeague = joinLeague;
module.exports.getTeams = getTeams;
module.exports.postTeam = postTeam;
module.exports.getTeam = getTeam;