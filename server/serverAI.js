const express = require('express');
const cors = require('cors');
/*
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
*/
//import OpenAI from 'openai';
const OpenAI = require('openai');

const app = express();
const port = 3002;

/*
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this matches your .env file variable
});
const openai = new OpenAIApi(configuration);
*/

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

app.use(cors());
app.use(express.json());

app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.images.generate({
        //const response = await openai.createImage({
            prompt,
            n: 1,
            size: '512x512',
        });
        res.json(response.data);
    }
    catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error(error.status);  // e.g. 401
            console.error(error.message); // e.g. The authentication token you passed was invalid...
            console.error(error.code);  // e.g. 'invalid_api_key'
            console.error(error.type);  // e.g. 'invalid_request_error'
        } else {
            // Non-API error
            console.log(error);
        }
        res.status(500).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});