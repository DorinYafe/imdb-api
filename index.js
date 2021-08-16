const express = require('express');
const { PORT } = require('./constants/constants');
const router = require('./controllers/movieController');
const cors = require('cors')
require('./services/cache');

const app = express();

const port = process.env.PORT || PORT

app.use(cors())

app.use('/movies', router);

app.listen(port, () => console.log('Started...'))