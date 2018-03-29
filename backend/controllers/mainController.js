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
            res.json(results);
            console.log("all done in getLeagues, ending connection");
        }
    });
}

let setUpUser = (user, leagueId, leagueName, req,res)=>{
    db.query(`INSERT INTO user_league(user_id, league_id) VALUES(${user.id}, ${leagueId})`,(error, results)=>{
        if(error){
            console.log('Error inserting new user_league pair:',error);
            res.json({success:false, msg:"Error creating new user_league pair"});
        }else{
            console.log('successfully created new user_league pair!:');
            db.query(`INSERT INTO team(name, user_id, league_id, race_id) VALUES("${user.name}",${user.id},${leagueId},0)`,(error, results)=>{
                if(error){
                    console.log('there has been an error creating your team:', error);
                    res.json({success:false, msg:"error creating team"});
                }else{
                    console.log('Created a team!');
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
                                    res.json({success:true, leagueId:leagueId, leagueName: leagueName});
                                    console.log("All done, ending connection");
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
            console.log('league inserted');
            let leagueId = results.insertId
            setUpUser(user,leagueId, req.body.name, req, res);
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
    console.log('connected');
    db.query(`SELECT * FROM league WHERE id=${req.body.leagueId}`,(error,results)=>{
        if(error){
            console.log("error checking if league exists!",error);
            res.json({success:false, msg:"error checking for league existence"});
        }else if(!results[0]){
            console.log("League doesn't exist!");
            res.json({success:false, msg:"Couldn't find league"});
        }else{
            let leagueName = results[0].name;
            db.query(`SELECT * FROM user_league WHERE user_id=${user.id} AND league_id=${req.body.leagueId}`,(error, results)=>{
                if(error){
                    console.log("error checking if user already exists in league:",error);
                    res.json({});
                }else if(results[0]){
                    console.log("User already in league!");
                    res.json({success:false, msg:"User already in league!"});
                }else{
                    console.log('putting user into league',results[0]);
                    setUpUser(user,req.body.leagueId, leagueName, req, res);
                }
            })
        }
    })
}

let getTeams = (req, res)=>{
    db.query(`SELECT * FROM team WHERE league_id=${req.params.leagueId} AND race_id=0 ORDER BY points DESC`, (error, results)=>{
        if(error){
            console.log('Error grabbing teams');
            res.json({success:false, msg:"Error retrieving teams. Please refresh the page"});
        }else{
            console.log('finished teamSearch');
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
    let teamId = req.params.teamId;
    let user = auth.decodeToken(req);
    canUserEdit(user.id, teamId,(canEdit)=>{
        if(canEdit){
            console.log('you can edit!',req.body);
            db.query(`UPDATE team_driver SET driver_id=(CASE
                WHEN position = 1 THEN ${req.body.d1}
                WHEN position = 2 THEN ${req.body.d2}
                WHEN position = 3 THEN ${req.body.d3}
                WHEN position = 4 THEN ${req.body.d4}
                WHEN position = 5 THEN ${req.body.d5}
                WHEN position = 6 THEN ${req.body.d6}
                WHEN position = 7 THEN ${req.body.d7}
                WHEN position = 8 THEN ${req.body.d8}
                WHEN position = 9 THEN ${req.body.d9}
                WHEN position = 10 THEN ${req.body.d10}
            END)
            WHERE team_id = ${teamId};`,(error, results)=>{
                if(error){
                    console.log('error updating drivers:',error);
                    res.json({success:false, msg:'we ran into an error updating your team'});
                }else{
                    console.log("SUCCESS UPDATING DRIVERS!",results);
                    res.json({success:true, msg:"team updated!"});
                    console.log("all done updating, ending connection now");
                }   
            })
        }else{
            res.json({success:false, msg:"Sorry, you are currently unable to edit this team"})
        }
    })
}

let canUserEdit = (userId, teamId, callback)=>{
    db.query(`SELECT * FROM team WHERE id=${teamId} AND user_id=${userId}`,(error,results)=>{
        if(error){
            console.log("there has been an error finding user/team combo",error);
            callback(false);
        }else if(results && results[0]){
            console.log('results of user/team search:',results);
            //make sure times look okay too then
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
                console.log('got constructors',results);
                // retObj.teamConstructors=results;
                db.query(`SELECT team_driver.position, driver.id, driver.number, driver.code, driver.surname FROM team_driver JOIN driver ON team_driver.driver_id = driver.id WHERE team_driver.team_id=${teamId}`,(error, results)=>{
                    if(error){
                        console.log("Error getting drivers for this team",error);
                        res.json({success:false, msg:"Error getting drivers for this team"});
                    }else{
                        console.log('got this teams drivers');
                        retObj.teamDrivers=results;
                        db.query('SELECT id, name FROM constructor',(error, results)=>{
                            if(error){
                                console.log("Error grabbing all constructors",error);
                                res.json({success:false, msg:"Error grabbing all constructors"});
                            }else{
                                console.log('got constructors');
                                retObj.constructors=results;
                                db.query('SELECT id, number, code, surname FROM driver',(error, results)=>{
                                    if(error){
                                        console.log("Error Grabbing Drivers",error);
                                        res.json({success:false, msg:"Error grabbing drivers"});
                                    }else{
                                        console.log('got all drivers and constructors');
                                        retObj.drivers=results;
                                        retObj.success=true;
                                        res.json(retObj);
                                        console.log("All done getting info, ending connection");
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

//server will check to see if race is in our DB.  If it isn't, it will score current race and go get the last race.
let checkResults = (req, res, next) =>{
    db.query(`SELECT * FROM race ORDER BY id DESC LIMIT 1`,(error,results)=>{
        if(error){
            console.log('Error getting most recent race:',error);
        }else{
            if(results[0]){
                console.log('new date:', new Date(results[0].date+" "+results[0].time));
                console.log('now:',Date.now());
            }
            if(!results[0]||(new Date(results[0].date+" "+results[0].time)<Date.now())){
                console.log('either no races in DB or latest race in DB is old.  Getting next race from Ergast');
                request.get('http://ergast.com/api/f1/current/next.json',(err,response,body)=>{
                    console.log('helloooooo world!');
                    if(err){
                        console.log('There has been an error getting next race',err);
                    }else{
                        raceObj=JSON.parse(body).MRData.RaceTable.Races[0];
                        let date = raceObj.date;
                        let time = raceObj.time;
                        let raceDate = new Date(date + ' '+ time); 
                        let raceId=raceObj.season+ (raceObj.round.length===1?"0"+raceObj.round:raceObj.round);
                        db.query(`INSERT INTO race (id, year, round, circuit_id, name, date, time) VALUES (${Number(raceId)},${Number(raceObj.season)},${Number(raceObj.round)},"${raceObj.Circuit.circuitId}","${raceObj.raceName}","${date}","${time}")`,(err,results)=>{
                            if(err){
                                console.log('Woops!  Error inserting new race!',err);
                            }else{
                                console.log('Put new race in!',results);
                                return next();
                            }
                        })
                    }
                })
            }else{
                console.log('Most recent results are later than now');
                console.log(results[0]);
                return next();
            }
        }
    })
}



module.exports.getTest = getTest;
module.exports.getLeagues = getLeagues;
module.exports.postLeague = postLeague;
module.exports.joinLeague = joinLeague;
module.exports.getTeams = getTeams;
module.exports.postTeam = postTeam;
module.exports.getTeam = getTeam;
module.exports.checkResults = checkResults;