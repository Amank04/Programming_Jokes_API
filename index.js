import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-joke", async (req, res) => {
    const name = req.body.userName;
    console.log(name);
    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Programming`);
        const jokes = response.data;
        let content = "";
        // console.log(jokes);
        if(jokes.joke) {
            content= jokes.joke;
            // console.log(content);
        } else {
            content = jokes.setup + jokes.delivery;
            // console.log(content);
        }
        

        res.render("index.ejs", { content });
    }
    catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});