import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static with URL prefixes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/script", express.static(path.join(__dirname, "script")));
app.use("/", express.static(path.join(__dirname, "pages"))); // serves index.html too

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



app.listen(
    port,
    () => console.log(`it's live on http://localhost:${port}`)
)