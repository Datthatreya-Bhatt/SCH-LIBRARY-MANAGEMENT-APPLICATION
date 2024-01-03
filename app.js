const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const role = require('./routes/role');
const login = require('./routes/login');


const app = express();

app.use(cors());


app.use(express.static('view'));

app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

app.use(role);
app.use(login);


app.listen(process.env.PORT || 3000); 