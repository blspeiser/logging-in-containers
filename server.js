require("dotenv").config();
const express = require('express');
const { logger, readLog } = require('./utils/logger');

const app = express();

app.get("/api/time", (request, response) => {
  const today = new Date();
  const now = today.toTimeString().substring(0,8); //chop off the timezone information
  const result = {
    time: now
  };
  logger.info(`Time requested at ${now}`);
  
  response.set('Content-Type', 'application/json');
  return response.send(result);
});
app.get("/api/logs", (request, response) => {
  try {
    const auth = "Bearer " + process.env.ACCESS_KEY;
    if(request.headers.authorization == auth) {
      const result = readLog();
      response.set('Content-Type', 'text/plain');
      return response.send(result);
    } else {
      return response.sendStatus(401);
    }
  } catch(e) {
    return response.sendStatus(500);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Started on port ${PORT}`);
});
