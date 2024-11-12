const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;
    console.log(prompt);
    console.log('API Key:', process.env.LIMEWIRE_API_KEY);

    const fetch = (await import('node-fetch')).default;
    try {
        const response = await fetch(
            `https://api.limewire.com/api/image/generation`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Version': 'v1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${process.env.LIMEWIRE_API_KEY}`
                },
                body: JSON.stringify({
                    prompt: prompt,
                    aspect_ratio: '1:1'
                })
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response from Limewire API:', data); // Log the response data

        if (data.status === 'COMPLETED' && data.data && data.data.length > 0) {
            res.json({ success: true, images: data.data.map(asset => asset.asset_url) });
        } else if (data.status === 'IN_PROGRESS') {
            res.status(202).json({ success: false, message: 'Image generation in progress. Please try again later.' });
        } else {
            res.status(404).json({ success: false, message: 'No image found.' });
        }
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ success: false, message: 'An error occurred while generating the image.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
