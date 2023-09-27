const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');

const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');

app.use(express.json());
app.use(cors({
    origin: "*"
}))

dotenv.config({ path: './config.env' })

require('./db/conn')

const PORT = process.env.PORT || 8000;

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => { console.log(`Server running successfully on port ${PORT}`); })