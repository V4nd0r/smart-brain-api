// function that handles a POST request to register a new user
const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }

    // generate a hash of the user's password using bcrypt
    const hash = bcrypt.hashSync(password);
     // use a database transaction to insert the new user into the 'login' and 'users' tables
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                // if the user was successfully inserted, send the user's data back to the client as a JSON object
                .then(user => {
                    res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}

// export the function so it can be used by other modules
module.exports = {
    handleRegister: handleRegister
}