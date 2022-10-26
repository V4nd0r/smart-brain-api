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

module.exports = {
    handleProfileGet
}