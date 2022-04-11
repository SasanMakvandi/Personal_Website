const app = require('express');

app.get("/", (req, res) => {
    res.status(200).send("status: lets go");
});