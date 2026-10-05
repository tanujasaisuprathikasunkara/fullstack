const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// ================= NOTICES =================

let notices = [];

app.get("/notices", (req, res) => {
    res.json(notices);
});

app.post("/notices", (req, res) => {

    const notice = req.body.notice;

    if (!notice || notice.trim() === "") {
        return res.status(400).json({
            message: "Notice cannot be empty"
        });
    }

    const newNotice = {
        id: notices.length + 1,
        text: notice,
        date: new Date().toLocaleString()
    };

    notices.push(newNotice);

    res.json({
        message: "Notice posted successfully",
        notice: newNotice
    });
});


// ================= QUIZ LINKS =================

let quizLinks = [];

app.get("/quiz-links", (req, res) => {
    res.json(quizLinks);
});

app.post("/quiz-links", (req, res) => {

    const { title, url } = req.body;

    if (!title || !url) {
        return res.status(400).json({
            message: "Please enter quiz title and link"
        });
    }

    const newQuizLink = {
        id: quizLinks.length + 1,
        title: title,
        url: url,
        date: new Date().toLocaleString()
    };

    quizLinks.push(newQuizLink);

    res.json({
        message: "Quiz link added successfully",
        quiz: newQuizLink
    });
});


// ================= PAGES =================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/student/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "student.html"));
});

app.get("/teacher/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "teacher.html"));
});


// ================= SERVER =================

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});