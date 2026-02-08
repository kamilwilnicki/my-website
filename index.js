import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import env from "dotenv";
import axios from "axios";

env.config();


const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Static with URL prefixes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/script", express.static(path.join(__dirname, "script")));
app.use("/", express.static(path.join(__dirname, "pages")));

app.get("/", (req, res) => {
    res.status(200).sendFile(process.cwd()+"/pages/index.html")
});

app.get("/about-me", (req, res) => {
    res.status(200).sendFile(process.cwd()+"/pages/about-me.html")
});
app.get("/contact-me", (req, res) => {
    res.status(200).sendFile(process.cwd()+"/pages/contact-me.html")
});
app.get("/skills", (req, res) => {
    res.status(200).sendFile(process.cwd()+"/pages/skills.html")
});
app.get("/experience", (req, res) => {
    res.status(200).sendFile(process.cwd()+"/pages/experience.html")
});

app.get("/chat", async (req, res) => {
    try {
        const response = await axios.get(process.env.BACKEND_URL+"/api/obtain_history/"+ req.sessionID);
        const history = response.data.history;
        if (history.length > 0 ){
            res.status(200).render("chat.ejs", {history:history});
        } else {
            res.status(200).render("chat.ejs", {history:[]});
        }
    } catch (err) {
        console.log(err);
        res.status(200).render("chat.ejs", {history:[]});
    }
})

app.get("/agentic-ai", (req, res) => {
    res.status(200).sendFile(process.cwd()+"/pages/agenticai.html")
})

app.post("/agentic-ai", async (req, res) => {
    const stocks = req.body.stocks;
    let textPrompt = "Please provide an analysis of those stocks: ";
    let i = 0;
    for (const stock of stocks){
        textPrompt = textPrompt + stock + ",";
        i++;
    }
    if (i > 5){
        res.status(200).json({reply:"<h1>You have asked for an analysis based on to many stocks. Please use up to 5 stocks</h1>"});
    } else if (i == 0){
        res.status(200).json({reply:"<h1>You have asked for an analysis based on no stocks. Please use up to 5 stocks</h1>"});
    }
    try {
        const response = await axios.post(process.env.BACKEND_URL+"/api/generate_agenticai"+req.sessionID,
            {"user_input":textPrompt});
        const agenticOutput = reply.data.llm_output;
        if (agenticOutput == textPrompt){
            return res.status(200).json({reply:"<h1>Your prompt is not related to the stocks. Please include real stocks in you form</h1>"})
        }
        return res.status(200).json({reply:agenticOutput});
    } catch (err) {
        console.log(err);
        res.status(200).json({reply:"<h1> There is something wrong with agentic-ai service. Please try later! :( </h1>"});
    }
})

app.post("/chat-generate", async (req, res) => {
    const question = req.body.question;
    if (question.length > 500){
        return res.status(200).json({reply:"You question is to large! Please summarize your input in fewer words!!"});
    }
    try {
        const reply = await axios.post(process.env.BACKEND_URL+"/api/generate_llm/"+req.sessionID, 
            {"user_input":question});
        const llmOutput = reply.data.llm_output;
        return res.status(200).json({reply:llmOutput});    
    } catch (err) {
        res.status(200).json({reply:"You have asked too many questions. Please start new conversation!"});
    }
    
})

app.post("/chat-delete-history", async (req, res) => {
    const sessionID = req.sessionID;
    try {
        const reply = await axios.delete(process.env.BACKEND_URL+"/api/delete_session/"+sessionID);
        res.status(200).redirect("/chat");
    } catch (err) {
        console.log(err);
        res.status(200).redirect("/chat");
    }
})

app.listen(
    port,
    () => console.log(`it's live on http://localhost:${port}`)
)