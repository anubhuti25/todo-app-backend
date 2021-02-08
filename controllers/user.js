const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mySqlConnection = require("../connection");

generateJWT = fetchedUser => {

    const { id, name, email } = fetchedUser;

    const token = jwt.sign(
        { email: email, userId: id, username: name },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
    )

    return {
        token,
        user: { id, name },
        expiresIn: 3600
    }
}

exports.checkUserLoggedIn = (req, res) => {
    res.send({ id: req.userData.userId, name: req.userData.username });
}

exports.createUser = (req, res) => {

    const { name, email, password } = req.body;

    bcrypt.hash(password, 10)
        .then((hash) => {
            mySqlConnection.query(
                "INSERT INTO users (name, email, password) VALUES (?,?,?)",
                [name, email, hash],
                (err, result) => {
                    if (!err) {
                        const id = result.insertId;
                        const data = generateJWT({ email, id, name });
                        res.send(data);
                    }
                    else {
                        console.error(err);
                        let { code, message } = err;
                        switch(code) {
                            case 'ER_DUP_ENTRY': message = 'Email id already exists.'; break;
                            default: message = '';
                        }
                        res.status(500).json({
                            msg: 'Please enter a valid user. '+ message,
                        });
                    }
                });
        });
};

exports.userLogin = (req, res) => {

    let fetchedUser;
    const email = req.body.email;
    const password = req.body.password;
    mySqlConnection.query(`SELECT * FROM users WHERE email='${email}'`,
        (err, rows) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    msg: 'There was an internal server error.'
                });
            }

            if (!rows || (rows.length === 0)) {
                return res.status(401).json({
                    msg: 'Invalid authentication credentials.'
                });

            }
            fetchedUser = rows[0];
            const { name, id } = fetchedUser;
            bcrypt.compare(password, fetchedUser.password)
                .then((result) => {
                    if (!result) {
                        return res.status(401).json({
                            msg: 'Password is incorrect.'
                        });
                    }

                    const data = generateJWT(fetchedUser);
                    res.status(200).json(data);
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(401).json({
                        msg: 'Invalid authentication credentials.',
                    });
                });
        });
};