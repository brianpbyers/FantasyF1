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

let postLeague = (req, res)=>{
    let user = auth.decodeToken(req);
    db.query(`INSERT INTO league(name) VALUES("${req.body.name}")`,(error,results)=>{
        if(error){
            console.log('Error inserting new league',error);
            res.json({success:false, msg:"Error inserting new league"});
        }else{
            console.log('league insert results:',results);
            let leagueId = results.insertId
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
                            res.json(results);
                        }
                    })
                }
            })
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
                    db.query(`INSERT INTO user_league(user_id, league_id) VALUES(${user.id}, ${req.body.leagueId});`,(error, results)=>{
                        if(error){
                            console.log('there has been an error putting user into league:',error);
                            res.json({success:false, msg:"there has been an error putting user into league"});
                        }else{
                            console.log('successfully inserted user into league');
                            db.query(`INSERT INTO team(name, user_id, league_id, race_id) VALUES("${user.name}",${user.id},${req.body.leagueId},0)`,(error, results)=>{
                                if(error){
                                    console.log('there has been an error creating your team:', error);
                                    res.json({success:false, msg:"There has been an error creating your team"});
                                }else{
                                    console.log('Created a team!', results);
                                    res.json({success:true, msg:"Team Created!"});
                                }
                            })
                        }
                    })
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
            res.json(results);
        }
    })
}

//update the team 0 to requested specifications.  Want an array of drivers and an array of constructors in req.body
let postTeam = (req, res)=>{
    res.json('WOOO!  YOU GOT TO POSTLEAGUETEAMS!');
}



module.exports.getTest = getTest;
module.exports.getLeagues = getLeagues;
module.exports.postLeague = postLeague;
module.exports.joinLeague = joinLeague;
module.exports.getTeams = getTeams;
module.exports.postTeam = postTeam;