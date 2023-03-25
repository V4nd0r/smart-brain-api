// function that handles a POST request to sign in a user
const handleSignin = (req, res, db, bcrypt) => {
    const {email, password} =req.body;
    if (!email || !password){
        return res.status(400).json('incorrect form submission');
    }

    // query the database to find the user with the given email
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        // compare the user's password hash with the hash stored in the database using bcrypt
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            // if the password is valid, query the database for the user's data
            if (isValid) {
                return db.select('*').from('users')
                .where('email', '=', email)
                // send the user's data back to the client as a JSON object
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to load user'))
            } else {
            // if the password is invalid, send a 400 error response
            res.status(400).json('wrong credantials')
        }
    })
    .catch(err => res.status(400).json('wrong credantials'))
}

// export the function so it can be used by other modules
module.exports = {
    handleSignin: handleSignin
}