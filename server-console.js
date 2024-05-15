require("dotenv").config();
const express = require('express');

const app = express();

app.get("/api/time", (request, response) => {
    const today = new Date();
    const now = today.toTimeString().substring(0,8); //chop off the timezone information
    const result = {
        time: now
    };
    console.info(`Time requested at ${now}`);
    
    response.set('Content-Type', 'application/json');
    return response.send(result);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.info(`Started on port ${PORT}`);
});
