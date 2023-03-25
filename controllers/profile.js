// function that handles a GET request for a user's profile
const handleProfileGet = (req, res, db) => {
    const { id } = req.params; 
    db.select('*').from('users').where({id})
    .then(user => {
        if (user.lenghth){
          response.json(user[0])  
        }else{
            res.status(404).json('Not found')
        }
    })
    .catch( err => res.status(404).json('no such user'))
}


// export the function so it can be used by other modules
module.exports = {
    handleProfileGet
}