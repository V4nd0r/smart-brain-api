const Clarifai = require('clarifai');
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const PAT = '08d1011ad0a74b9686fa3fe779dac1d4';
const USER_ID = 'bryjlhrvhdt2';
const APP_ID = 'my-first-application';
const MODEL_ID = 'face-detection';
const IMAGE_URL = imageUrl;

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);

stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        inputs: [
            { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        // Since we have one input, one output will exist here
        const output = response.outputs[0];

        console.log("Predicted concepts:");
        for (const concept of output.data.concepts) {
            console.log(concept.name + " " + concept.value);
        }
    }

);

// create a new Clarifai application instance with an API key
//const app = new Clarifai.App({
//    apiKey:'a5631b3fd6d648ee9b29d320e93cdbb0'
//  });

// function that handles API calls to the Clarifai model
const handleApiCall = (req, res) => {  
    app.models
        .predict(
            {
                id: 'face-detection', //If you want general concepts about image: 'general-image-recognition'
                name: 'face-detection', //If you want general concepts about image: 'general-image-recognition'
                version: '6dc7e46bc9124c5c8824be4822abe105', //If you want general concepts about image: 'aa7f35c01e0642fda5cf400f543e7c40'
                type: 'visual-detector',
              }, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

// function that handles image uploads and updates the user's entry count in the database
const handleImage = (req, res, db) => {
    const { id } = req.body; 
    db('users').where('id', '=', id)
    .increment('entries', 1 )
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

// export the two functions so they can be used by other modules
module.exports = {
    handleImage,
    handleApiCall
}