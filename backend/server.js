const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.post('/convert', async (req, res) => {
    const text = req.body.text;
    const apiKey = "AIzaSyCAytoR-oa93_sASIiEcrp46qcZwKMozhg"; 
    const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
    const payload = {
        "audioConfig": {
            "audioEncoding": "MP3",
            "effectsProfileId": [
                "small-bluetooth-speaker-class-device"
            ],
            "pitch": 0,
            "speakingRate": 1
        },
        "input": {
            "text": text
        },
        "voice": {
            "languageCode": "en-US",
            "name": "en-US-Standard-A"
        }
    };

    try {
        const response = await axios.post(endpoint, payload);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
