const mysql = require('mysql');
const express = require('express');
const app = express();
app.use(express.json())

 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
     database: 'coviddata'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("My sql connected...")
})

//create DB
app.get('/createDB', (req, res) => {
    let sql = 'Create DATABASE coviddata'
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        res.send('DataBase Created....')
    })
})




//created table
app.get('/create/table', (req, res) => {
    let sql = 'Create table Covid_Data(  _id varchar(100) ,aged_65_older int,aged_70_older int,cardiovasc_death_rate int,continent varchar(100),date DATE ,diabetes_prevalence int ,gdp_per_capita int ,handwashing_facilities int ,hospital_beds_per_thousand int ,human_development_index int ,iso_code varchar(100),life_expectancy int,location varchar(100),median_age int,new_cases int,new_cases_per_million int,new_cases_smoothed int,new_cases_smoothed_per_million int,new_deaths int,new_deaths_per_million int,new_deaths_smoothed int,new_deaths_smoothed_per_million int,population int,population_density int,reproduction_rate int,stringency_index int,total_cases int,total_cases_per_million int,total_deaths int,total_deaths_per_million int,  primary key(_id))'
  
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        res.send('table Created....')
    })


})
app.get('/add/file', (req, res) => {

              let sql=    `LOAD DATA LOCAL INFILE 'C:/Users/CyberFoxWS3/Desktop/covid-with-mysql/data.csv' 
                    INTO TABLE covid_data 
                    FIELDS TERMINATED BY ',' 
                    LINES TERMINATED BY '\n' 
                    IGNORE 1 ROWS 
                    (_id,aged_65_older,aged_70_older,cardiovasc_death_rate,continent,date,diabetes_prevalence,gdp_per_capita,handwashing_facilities,hospital_beds_per_thousand,human_development_index,iso_code,life_expectancy,location,median_age,new_cases,new_cases_per_million,new_cases_smoothed,new_cases_smoothed_per_million,new_deaths,new_deaths_per_million,new_deaths_smoothed,new_deaths_smoothed_per_million,population,population_density,reproduction_rate,stringency_index,total_cases,total_cases_per_million,total_deaths,total_deaths_per_million )`
                    // SET account_creation  = STR_TO_DATE(@account_creation, '%m/%d/%y');
                    db.query(sql, (err, result) => {
                        if (err) {
                            throw err;
                        }
                       console.log(result)
                        res.send('file added....')
                   })
})


/*********************************************************************************************************/
app.get('/get/Data', (req, res) => {
    
    let sql = `SELECT * from covid_data `
    db.query(sql, (err, result) => {
        if (err) return console.error(err);
        if(result.length < 1) return res.send("No Such Data Exist")
        console.log(result)
        res.send(result)
    })
})

app.get('/get/Data1', (req, res) => {
    
    let sql = `SELECT * from covid_data WHERE iso_code = "pak"`
    db.query(sql, (err, result) => {
        if (err) return console.error(err);
        if(result.length < 1) return res.send("No Such Data Exist")
        console.log(result)
        res.send(result)
    })
})


app.get('/get/Data2', (req, res) => {
    
    let sql = `SELECT COUNT(iso_code) AS CasesInPakistan FROM covid_data;`
    db.query(sql, (err, result) => {
        if (err) return console.error(err);
        if(result.length < 1) return res.send("No Such Data Exist")
        console.log(result)
        res.send(result)
    })
})
app.get('/get/Data3', (req, res) => {
    
    let sql = `SELECT iso_code,continent,location,date,total_cases,total_cases_per_million FROM covid_data ORDER BY total_cases DESC LIMIT 5;`
    db.query(sql, (err, result) => {
        if (err) return console.error(err);
        if(result.length < 1) return res.send("No Such Data Exist")
        console.log(result)
        res.send(result)
    })
})
app.get('/get/Data4', (req, res) => {
    
    let sql = `SELECT iso_code,continent,location,date,total_cases,total_cases_per_million FROM covid_data WHERE iso_code ="pak" ORDER BY total_cases DESC LIMIT 5;;`
    db.query(sql, (err, result) => {
        if (err) return console.error(err);
        if(result.length < 1) return res.send("No Such Data Exist")
        console.log(result)
        res.send(result)
    })
})


app.listen(9000, function (req, res) {
    console.log('running...')
});