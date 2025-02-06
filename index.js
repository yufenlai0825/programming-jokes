import express from "express"; 
import axios from "axios"; 

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist,sexist";

app.use(express.static("public")); 
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => { 
    try {
        const result = await axios.get(API_URL);
        const jokeContent = result.data.joke; 
        const setUpContent = result.data.setup; 
        const deliveryContent = result.data.delivery; 
        res.render("index.ejs", {joke: jokeContent, setup: setUpContent, delivery: deliveryContent});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    } 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
