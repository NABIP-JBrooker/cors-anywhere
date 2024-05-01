const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: '*' // This allows all domains. For security, you might want to specify your domain.
}));

app.use(express.json());

app.all('/proxy/:url*', async (req, res) => {
    const baseUrl = 'https://data.healthcare.gov/api/1/datastore/query/skyj-46j6/0';
    const url = baseUrl + req.params.url + (req.params[0] || '');
    const response = await fetch(url, {
        method: req.method,
        headers: req.headers,
        body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });
    const data = await response.json();
    res.send(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
