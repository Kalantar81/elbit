const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3005;

const server = require('http').Server(app);

app.use(bodyParser.urlencoded({limit: '500mb', extended: false}));
app.use(bodyParser.json({limit: '500mb'}));
app.use(cors());

app.use('/', require('../routes'));

server.listen(PORT, () => `Server started @ ${PORT}`);
