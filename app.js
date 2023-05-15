const https = require("https");

const express = require("express");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// get the dynamic data based on what the user typed into the user.
app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
});

//catch the data in our app.post
app.post("/", function(req, res){


    // use query(by using body-parser module), apiKey and unit to structure our API url 
    const query = req.body.cityName;
    const apiKey = "25c9c246c264096dff348ede4dffe150";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey + "&units=" + unit + "";


    //get the data for the particular location using https.get
    https.get(url, function(response){
        console.log(response.statusCode);


        response.on("data", function(data){

            // parse the JSON data(systematic view of the data)
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const feelsLike = weatherData.main.feels_like;
            const weatherDescription = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp);
            console.log(feelsLike);
            console.log(weatherDescription);


            //send it to our browser using express and node modules
            res.write("<h1>Temperature in "+ query +" is :- " + temp + " Degrees Celsius.</h1>");
            res.write("The weather is currently " + weatherDescription);
            res.write("<img src=" + imageURL + ">")
            res.send();

        })
    })
})




app.listen(3000, function(){
    console.log("Server is running on Port 3000");
});