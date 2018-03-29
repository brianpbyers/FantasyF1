let db = require('./index').db;

// x={
// 	"data":
// 	[
// 		{
// 			"driverId": 4,
// 			"driverRef": "alonso",
// 			"number": 14,
// 			"code": "ALO",
// 			"forename": "Fernando",
// 			"surname": "Alonso",
// 			"nationality": "Spanish"
// 		},
// 		{
// 			"driverId": 822,
// 			"driverRef": "bottas",
// 			"number": 77,
// 			"code": "BOT",
// 			"forename": "Valtteri",
// 			"surname": "Bottas",
// 			"nationality": "Finnish"
// 		},
// 		{
// 			"driverId": 843,
// 			"driverRef": "brendon_hartley",
// 			"number": 39,
// 			"code": "HAR",
// 			"forename": "Brendon",
// 			"surname": "Hartley",
// 			"nationality": "New Zealander"
// 		},
// 		{
// 			"driverId": 828,
// 			"driverRef": "ericsson",
// 			"number": 9,
// 			"code": "ERI",
// 			"forename": "Marcus",
// 			"surname": "Ericsson",
// 			"nationality": "Swedish"
// 		},
// 		{
// 			"driverId": 842,
// 			"driverRef": "gasly",
// 			"number": 10,
// 			"code": "GAS",
// 			"forename": "Pierre",
// 			"surname": "Gasly",
// 			"nationality": "French"
// 		},
// 		{
// 			"driverId": 154,
// 			"driverRef": "grosjean",
// 			"number": 8,
// 			"code": "GRO",
// 			"forename": "Romain",
// 			"surname": "Grosjean",
// 			"nationality": "French"
// 		},
// 		{
// 			"driverId": 1,
// 			"driverRef": "hamilton",
// 			"number": 44,
// 			"code": "HAM",
// 			"forename": "Lewis",
// 			"surname": "Hamilton",
// 			"nationality": "British"
// 		},
// 		{
// 			"driverId": 807,
// 			"driverRef": "hulkenberg",
// 			"number": 27,
// 			"code": "HUL",
// 			"forename": "Nico",
// 			"surname": "Hülkenberg",
// 			"nationality": "German"
// 		},
// 		{
// 			"driverId": 825,
// 			"driverRef": "kevin_magnussen",
// 			"number": 20,
// 			"code": "MAG",
// 			"forename": "Kevin",
// 			"surname": "Magnussen",
// 			"nationality": "Danish"
// 		},
// 		{
// 			"driverId": 844,
// 			"driverRef": "leclerc",
// 			"number": 16,
// 			"code": "LEC",
// 			"forename": "Charles",
// 			"surname": "Leclerc",
// 			"nationality": "Monegasque"
// 		},
// 		{
// 			"driverId": 830,
// 			"driverRef": "max_verstappen",
// 			"number": 33,
// 			"code": "VER",
// 			"forename": "Max",
// 			"surname": "Verstappen",
// 			"nationality": "Dutch"
// 		},
// 		{
// 			"driverId": 839,
// 			"driverRef": "ocon",
// 			"number": 31,
// 			"code": "OCO",
// 			"forename": "Esteban",
// 			"surname": "Ocon",
// 			"nationality": "French"
// 		},
// 		{
// 			"driverId": 815,
// 			"driverRef": "perez",
// 			"number": 11,
// 			"code": "PER",
// 			"forename": "Sergio",
// 			"surname": "Pérez",
// 			"nationality": "Mexican"
// 		},
// 		{
// 			"driverId": 8,
// 			"driverRef": "raikkonen",
// 			"number": 7,
// 			"code": "RAI",
// 			"forename": "Kimi",
// 			"surname": "Räikkönen",
// 			"nationality": "Finnish"
// 		},
// 		{
// 			"driverId": 817,
// 			"driverRef": "ricciardo",
// 			"number": 3,
// 			"code": "RIC",
// 			"forename": "Daniel",
// 			"surname": "Ricciardo",
// 			"nationality": "Australian"
// 		},
// 		{
// 			"driverId": 832,
// 			"driverRef": "sainz",
// 			"number": 55,
// 			"code": "SAI",
// 			"forename": "Carlos",
// 			"surname": "Sainz",
// 			"nationality": "Spanish"
// 		},
// 		{
// 			"driverId": 845,
// 			"driverRef": "sirotkin",
// 			"number": 35,
// 			"code": "SIR",
// 			"forename": "Sergey",
// 			"surname": "Sirotkin",
// 			"nationality": "Russian"
// 		},
// 		{
// 			"driverId": 840,
// 			"driverRef": "stroll",
// 			"number": 18,
// 			"code": "STR",
// 			"forename": "Lance",
// 			"surname": "Stroll",
// 			"nationality": "Canadian"
// 		},
// 		{
// 			"driverId": 838,
// 			"driverRef": "vandoorne",
// 			"number": 2,
// 			"code": "VAN",
// 			"forename": "Stoffel",
// 			"surname": "Vandoorne",
// 			"nationality": "Belgian"
// 		},
// 		{
// 			"driverId": 20,
// 			"driverRef": "vettel",
// 			"number": 5,
// 			"code": "VET",
// 			"forename": "Sebastian",
// 			"surname": "Vettel",
// 			"nationality": "German"
// 		}
// 	]
// }
// x=x.data;
// let myStr='';
// for(let i = 0; i<x.length; ++i){
//     myStr+='('+x[i].driverId+', '+x[i].driverRef+', '+x[i].number+', '+x[i].code+', '+x[i].forename+', '+x[i].surname+', '+x[i].nationality+')';
// }


//seeds database with all necessary tables
// db.query('DROP TABLE IF EXISTS user, league, team, driver, constructor, race, result, user_league, team_driver, team_constructor', (error, results)=>{
//     if(error) {
//         console.log("error dropping tables",error);
//     }else{
//         console.log("Dropped Tables!");
//         db.query('CREATE TABLE user (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, email varchar(45) NOT NULL, password varchar(255) NOT NULL, name varchar(45) NOT NULL);',(error, results)=>{
//             if(error){
//                 console.log('error creating user table:',error);
//             }else{
//                 console.log('Created user table!');
//                 db.query('CREATE TABLE league (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(45) NOT NULL, rules_id INT(11));',(error, results)=>{
//                     if(error){
//                         console.log('error creating league table:',error);
//                     }else{
//                         console.log('Created league table!');
//                         db.query('CREATE TABLE team (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(45) NOT NULL, user_id INT(11), league_id INT(11), race_id INT (11), score INT(11) DEFAULT 0, rank INT(11) DEFAULT 0, points INT(11) DEFAULT 0)',(error, results)=>{
//                             if(error){
//                                 console.log('error creating team table:',error);
//                             }else{
//                                 console.log('Created team table!');
//                                 db.query('CREATE TABLE driver (id INT(11) NOT NULL PRIMARY KEY, driver_ref varchar(45), number INT(11), code varchar(3), forename varchar(45), surname varchar(45), nationality varchar(45))',(error, results)=>{
//                                     if(error){
//                                         console.log('error creating driver table:',error);
//                                     }else{
//                                         console.log('Created driver table!');
//                                         db.query('CREATE TABLE constructor (id INT(11) NOT NULL, constructor_ref varchar(45), name varchar(45));',(error, results)=>{
//                                             if(error){
//                                                 console.log('error creating constructor table:',error);
//                                             }else{
//                                                 console.log('Created constructor tables!');
//                                                 db.query('CREATE TABLE race (id INT(11), year INT(11), round INT(11), circuit_id INT(11), name varchar(45), date DATE, time TIME)',(error, results)=>{
//                                                     if(error){
//                                                         console.log('error creating race table:',error);
//                                                     }else{
//                                                         console.log('Created race table!');
//                                                         db.query('CREATE TABLE result (id INT(11) NOT NULL PRIMARY KEY, race_id INT(11), driver_id INT(11), constructor_id INT(11), position INT(11), position_order INT(11), points INT(11))',(error, results)=>{
//                                                             if(error){
//                                                                 console.log('error creating result table:',error);
//                                                             }else{
//                                                                 console.log('Created result table!');
//                                                                 db.query('CREATE TABLE user_league (user_id INT(11), league_id INT(11))',(error, results)=>{
//                                                                     if(error){
//                                                                         console.log('error creating user league table:',error);
//                                                                     }else{
//                                                                         console.log('Created user league table!');
//                                                                         db.query('CREATE TABLE team_driver (team_id INT(11), driver_id INT(11), position INT(11))',(error, results)=>{
//                                                                             if(error){
//                                                                                 console.log('error creating team driver table:',error);
//                                                                             }else{
//                                                                                 console.log('Created team driver table!');
//                                                                                 db.query('CREATE TABLE team_constructor (team_id INT(11), constructor_id INT(11), position INT(11));',(error, results)=>{
//                                                                                     if(error){
//                                                                                         console.log('error creating team constructor table:',error);
//                                                                                     }else{
//                                                                                         console.log('Created team constructor table!');
//                                                                                         console.log('Created ALL tables successfully!');
//                                                                                         db.query(`INSERT INTO driver (id, driver_ref, number, code, forename, surname, nationality) VALUES (4, 'alonso', 14, 'ALO', 'Fernando', 'Alonso', 'Spanish'), (822, 'bottas', 77, 'BOT', 'Valtteri', 'Bottas', 'Finnish'), (843, 'brendon_hartley', 39, 'HAR', 'Brendon', 'Hartley', 'New Zealander'), (828, 'ericsson', 9, 'ERI', 'Marcus', 'Ericsson', 'Swedish'), (842, 'gasly', 10, 'GAS', 'Pierre', 'Gasly', 'French'), (154, 'grosjean', 8, 'GRO', 'Romain', 'Grosjean', 'French'), (1, 'hamilton', 44, 'HAM', 'Lewis', 'Hamilton', 'British'), (807, 'hulkenberg', 27, 'HUL', 'Nico', 'Hülkenberg', 'German'), (825, 'kevin_magnussen', 20, 'MAG', 'Kevin', 'Magnussen', 'Danish'), (844, 'leclerc', 16, 'LEC', 'Charles', 'Leclerc', 'Monegasque'), (830, 'max_verstappen', 33, 'VER', 'Max', 'Verstappen', 'Dutch'), (839, 'ocon', 31, 'OCO', 'Esteban', 'Ocon', 'French'), (815, 'perez', 11, 'PER', 'Sergio', 'Pérez', 'Mexican'), (8, 'raikkonen', 7, 'RAI', 'Kimi', 'Räikkönen', 'Finnish'), (817, 'ricciardo', 3, 'RIC', 'Daniel', 'Ricciardo', 'Australian'), (832, 'sainz', 55, 'SAI', 'Carlos', 'Sainz', 'Spanish'), (845, 'sirotkin', 35, 'SIR', 'Sergey', 'Sirotkin', 'Russian'), (840, 'stroll', 18, 'STR', 'Lance', 'Stroll', 'Canadian'), (838, 'vandoorne', 2, 'VAN', 'Stoffel', 'Vandoorne', 'Belgian'), (20, 'vettel', 5, 'VET', 'Sebastian', 'Vettel', 'German')`,(error, results)=>{
//                                                                                             if(error){
//                                                                                                 console.log('error seeding drivers',error);
//                                                                                             }else{
//                                                                                                 console.log('drivers inserted!');
//                                                                                                 db.query(`INSERT INTO constructor (id, constructor_ref, NAME) VALUES (1,'mclaren', 'McLaren'), (3,'williams', 'Williams'), (4, 'renault', 'Renault'), (5, 'toro_rosso', 'Toro Rosso'), (6, 'ferrari', 'Ferrari'), (9, 'red_bull', 'Red Bull'), (10, 'force_india', 'Force India'), (15, 'sauber', 'Sauber'), (131, 'mercedes', 'Mercedes'), (210, 'haas', 'Haas F1 Team')`,(error, results)=>{
//                                                                                                     if(error){
//                                                                                                         console.log('error seeding constructors',error);
//                                                                                                     }else{
//                                                                                                         console.log('constructors seeded!');
//                                                                                                         console.log('all done!')
//                                                                                                         process.exit();
//                                                                                                     }
//                                                                                                 })
//                                                                                             }
                                                                                            
//                                                                                         })
//                                                                                     }
//                                                                                 })
//                                                                             }
//                                                                         })
//                                                                     }
//                                                                 })
//                                                             }
//                                                         })
//                                                     }
//                                                 })
//                                             }
//                                         })
//                                     }
//                                 })
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     }
// });

db.query('ALTER TABLE race MODIFY circuit_id VARCHAR(50), MODIFY date VARCHAR(50), MODIFY time VARCHAR(50)',(error,results)=>{
    if(error){
        console.log('error altering table:',error);
    }else{
        console.log('success altering table.  moving on:',results);
        db.query('INSERT INTO race (id, year, round, circuit_id, name, date, time) VALUES ("201801", "2018", "1", "albert_park", "Australian Grand Prix", "2018-03-25","05:10:00Z")',(err,res)=>{
            if(err){
                console.log("error putting race 1 in:",err)
            }else{
                console.log('put race 1 in:',res);
                process.exit();
            }
        });
    }
})
