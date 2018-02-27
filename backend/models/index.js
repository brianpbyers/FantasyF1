const mysql = require('mysql');
require('dotenv').config();

console.log('hit index.js!');
console.log(process.env.DB_HOST);
let sqlLogin = process.env.CLEARDB_DATABASE_URL || {
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
}

let connection = mysql.createConnection(sqlLogin);

connection.connect((err)=>{
    if(err){
        console.log("There was an error!",err);
        return;
    }
    console.log('connected to MysqlServer!');
});


module.exports.db = connection;

// tables used:
// constructor: all constructors competing for the F1 Championship 
//     id: numerical id linked to ergasts id
//     constructor_ref: ergasts way to search for constructor data in their database
//     name: constructor's name

// driver: all main drivers competing for the F1 Championship
//     id: numerical id linked to ergast id
//     driver_ref: how to reference driver in ergast
//     number: number driver drives under
//     code: 3-letter driver identifier
//     forename: driver's first name
//     surname: driver's last name
//     nationality: where driver is from

// league: fantasy league
//     id: league id
//     name: league name
//     rules_id: unused right now.  For future custom rules

// race: each individual race
//     id: numerical id
//     year: year of race
//     round: race order in season
//     circuit_id: references circuit driven in race.  unused
//     name: circuit name
//     date: date race will start(not race weekend) in UTC
//     time: time race will start(not weekend) in UTC

// result: how each driver does on each race
//     id: unique identifier.
//     race_id: foreign key for race
//     driver_id: foreign key for driver
//     constructor_id: foreign key for constructor
//     position: position finished in
//     position_order: all numerical positions regardless of finishing race
//     points: points given for this driver/constructor for this race

// team: a user's team in the league for a selected race.  Zero is default/current.
//     id: unique identifier
//     name: team name
//     user_id: FK to user
//     league_id: FK to league
//     race_id: FK to race
//     score: score based on rules for league for the race.  Zero/Default is total score
//     rank: rank is how team's score stacked up against competition.
//     points: how many points were awarded based on their rank/score
    
// team_constructor: links user's selected constructors to their team.
//     team_id: FK to team
//     constructor_id: FK to constructor
//     position: position user thought they would end up in

// team_driver: links user's selected drivers to their team
//     team_id: FK to team
//     driver_id: FK to driver
//     position: position user thought they would end up in

// user: user login info
//     id:unique identifier
//     email: login username
//     password: hash of pw
//     name: what user goes by

// user_league: links users and the leagues they belong to
//     user_id: FK to user
//     league_id: FK to league
    
