const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
    res.send("PING");
});

app.listen(3000, () => {
    console.log("Server on 3000");
});