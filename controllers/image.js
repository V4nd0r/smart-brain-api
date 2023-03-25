const Clarifai = require('clarifai');

// create a new Clarifai application instance with an API key
const app = new Clarifai.App({
    apiKey:'a5631b3fd6d648ee9b29d320e93cdbb0'
  });

// function that handles API calls to the Clarifai model
const handleApiCall = (req, res) => {  
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
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