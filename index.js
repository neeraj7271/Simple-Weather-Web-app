import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";
import { errorMonitor } from "events";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const port = 3000;
const apiKey = "c6319691087491cc8cb73f4497b3040c";
const url = "https://api.weatherbit.io/v2.0/current";

app.get("/", async (req, res) => {
  try {
    
    res.render("index.ejs");
  } catch (error) {
    res.render("index.ejs", {
      error: JSON.stringify(error.response.data),
    });
  }
});

app.post("/get", async (req, res) => {

  const city = req.body.city;
  const country = req.body.country;

  try {
    
    const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=451abeb1dd72430e9dcee9a4ed847cfd&include=minutely`);
    
    // console.log(response.data.data[0].temp);
    // console.log(response.data.data[0].city_name);
    // console.log(response.data.data[0].weather.description);

    // res.render("index.ejs");

    const icon = response.data.data[0].weather.icon;
    console.log(icon);

    const imageUrl = `https://cdn.weatherbit.io/static/img/icons/${icon}.png`

    res.render("index.ejs", {
      temperature: response.data.data[0].temp,
      city : response.data.data[0].city_name,
      description : response.data.data[0].weather.description,
      image: imageUrl,
    });

  } catch (error) {
    res.render("index.ejs", {
      error: JSON.stringify(error.response.data),
    });
  }

});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
