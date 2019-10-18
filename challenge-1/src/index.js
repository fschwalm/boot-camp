const express = require('express');
const routes = require('./routes');
const middlewares = require('./middleware');

const app = express();

app.use(express.json());
app.use(middlewares.requestCounter);

app.use(routes);
app.listen(3333);



