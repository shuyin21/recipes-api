const PORT = process.env.PORT || 3001
const express = require('express');
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "/<front end app folder name>/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/<front end app folder name>/build', 'index.html'));
});
app.get('/recipes', (req, res) => {


    const options = {
        method: 'GET',
        url: `https://api.edamam.com/api/recipes/v2?query`,
        params: { q: req.query.q, app_id: APP_ID, app_key: APP_KEY, type: 'public' }
    }
    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((err) => {
        console.error(err)
    })
}
)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


