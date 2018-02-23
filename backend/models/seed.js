let db = require('./index').db;
db.query('DROP TABLE IF EXISTS user, league, team, driver, constructor, race, result, user_league, team_driver, team_constructor', (error, results)=>{
    if(error) {
        console.log("error dropping tables",error);
    }else{
        console.log("Dropped Tables!");
        db.query('CREATE TABLE user (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, email varchar(45) NOT NULL, password varchar(255) NOT NULL, name varchar(45) NOT NULL);',(error, results)=>{
            if(error){
                console.log('error creating user table:',error);
            }else{
                console.log('Created user table!');
                db.query('CREATE TABLE league (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(45) NOT NULL, rules_id INT(11));',(error, results)=>{
                    if(error){
                        console.log('error creating league table:',error);
                    }else{
                        console.log('Created league table!');
                        db.query('CREATE TABLE team (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(45) NOT NULL, user_id INT(11), league_id INT(11), race_id INT (11))',(error, results)=>{
                            if(error){
                                console.log('error creating team table:',error);
                            }else{
                                console.log('Created team table!');
                                db.query('CREATE TABLE driver (id INT(11) NOT NULL PRIMARY KEY, driver_ref varchar(45), number INT(11), code varchar(3), forename varchar(45), surname varchar(45), nationality varchar(45))',(error, results)=>{
                                    if(error){
                                        console.log('error creating driver table:',error);
                                    }else{
                                        console.log('Created driver table!');
                                        db.query('CREATE TABLE constructor (id INT(11) NOT NULL, constructor_ref varchar(45), name varchar(45));',(error, results)=>{
                                            if(error){
                                                console.log('error creating constructor table:',error);
                                            }else{
                                                console.log('Created constructor tables!');
                                                db.query('CREATE TABLE race (id INT(11), year INT(11), round INT(11), circuit_id INT(11), name varchar(45), date DATE, time TIME)',(error, results)=>{
                                                    if(error){
                                                        console.log('error creating race table:',error);
                                                    }else{
                                                        console.log('Created race table!');
                                                        db.query('CREATE TABLE result (id INT(11) NOT NULL PRIMARY KEY, race_id INT(11), driver_id INT(11), constructor_id INT(11), position INT(11), position_order INT(11), points INT(11))',(error, results)=>{
                                                            if(error){
                                                                console.log('error creating result table:',error);
                                                            }else{
                                                                console.log('Created result table!');
                                                                db.query('CREATE TABLE user_league (user_id INT(11), league_id INT(11))',(error, results)=>{
                                                                    if(error){
                                                                        console.log('error creating user league table:',error);
                                                                    }else{
                                                                        console.log('Created user league table!');
                                                                        db.query('CREATE TABLE team_driver (team_id INT(11), driver_id INT(11))',(error, results)=>{
                                                                            if(error){
                                                                                console.log('error creating team driver table:',error);
                                                                            }else{
                                                                                console.log('Created team driver table!');
                                                                                db.query('CREATE TABLE team_constructor (team_id INT(11), constructor_id INT(11));',(error, results)=>{
                                                                                    if(error){
                                                                                        console.log('error creating team constructor table:',error);
                                                                                    }else{
                                                                                        console.log('Created team constructor table!');
                                                                                        console.log('Created ALL tables successfully!');
                                                                                        process.exit();
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
});
