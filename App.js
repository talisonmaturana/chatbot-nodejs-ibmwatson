const express = require('express');
const bodyParser = require('body-parser');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const app = express();
app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;

const assistant = new AssistantV1({
    username: 'your_username',
    password: 'your_password',
    url: 'https://gateway.watsonplatform.net/assistant/api/',
    version: '2019-05-30',
});

app.post('/conversation', (req, res) => {
    const { text, context = {} } = req.body;

    const params = {
        input: { text },
        workspace_id: 'your-workspace_id',
        context,
    }

    assistant.message(params, (error, response) => {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            res.json(response);
        }
    });
});

app.get('/conversation/:text*?', (req, res) => {
    const { text } = req.params;

    res.json(text);
});

app.listen(port, () => console.log(`Running on port ${port}`));