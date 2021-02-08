const mySqlConnection = require("../connection");

exports.getTodos = (req, res) => {
    mySqlConnection.query(
        `SELECT 
            t.id id,
            t.title title,
            t.description description,
            t.from_date from_date,
            t.to_date to_date,
            t.is_completed is_completed,
            t.batch_id batch_id,
            b.batch_name batch_name
        FROM 
            todo t, 
            batch b 
        WHERE 
            t.batch_id = b.id 
        ORDER BY batch_id`, 
        (err, rows) => {
        if(!err) {
            res.send(rows);
        }
        else {
            console.error(err);
            res.status(500).json({
                msg: 'Error fetching records. ' + err.message
            });
        }
    });
};

exports.getTodo = (req, res) => {
    const id = req.params.id;
    mySqlConnection.query(
        `SELECT
            batch_id batch,
            DATE_FORMAT(from_date,'%Y-%m-%d') fromDate,
            DATE_FORMAT(to_date,'%Y-%m-%d') toDate,
            title,
            description,
            is_completed isCompleted
        FROM todo 
        WHERE id=${id}`, 
        (err, rows) => {
        if(!err) {
            res.send(rows[0]);
        }
        else {
            console.error(err);
            res.status(500).json({
                msg: 'Error fetching todo. ' + err.message
            });
        }
    });
};

exports.createBatch = (req, res, next) => {
    try{
        const { batch, newBatch } = req.body;
        const userId = req.userData.userId;
        if(!newBatch) {
            next();
        }
        mySqlConnection.query(
            "INSERT INTO batch (batch_name, user_id) VALUES (?,?)", 
                [batch, userId],
            (err, result) => {
            if(!err) {
                req.userData.batch = result.insertId;
                next();
            }
            else {
                console.error("Error creating batch. ", err);
                res.status(500).json({
                    msg: "Error creating batch. " + err.message
                });
            }
        });
    }
    catch(err) {
        console.error('Create batch Server error. ', err);
        res.status(500).json({
            msg: 'Internal Server error. ' + err.message
        });
    }   
}

exports.createTodo = (req, res) => {
    const { title, description, fromDate, toDate, newBatch } = req.body;
    const { batch } = newBatch ? req.userData : req.body ;

    mySqlConnection.query(
        "INSERT INTO todo (title, description, batch_id, from_date, to_date) VALUES (?,?,?,?,?)", 
        [title, description, batch, fromDate, toDate],
        (err, result) => {
        if(!err) {
            res.send({msg: "Todo created successfully"});
        }
        else {
            console.error(err);
            res.status(500).json({
                msg: 'Error creating todo. '+err.message
            });
        }
    });    
}

exports.updateTodo = (req, res) => {
    const id = req.params.id;
    const { title, description, isCompleted, fromDate, toDate, newBatch } = req.body;
    const { batch } = newBatch ? req.userData : req.body ;

    mySqlConnection.query(
        `UPDATE todo 
        SET 
            title=?, 
            description=?,
            is_completed=?,
            batch_id=?,
            from_date=?,
            to_date=?
        WHERE id=?`, 
        [title, description, isCompleted, batch, fromDate, toDate, id],
        (err, result) => {
        if(!err) {
            res.send({msg: "Todo updated successfully"});
        }
        else {
            console.error('Error updating todo', err);
            res.status(500).json({
                msg: 'Error updating todo. '+err.message
            });
        }
    });
}

exports.deleteTodo = (req, res) => {
    const id = req.params.id;

    mySqlConnection.query(
        "DELETE FROM todo WHERE id=?", 
        [id],
        (err, result) => {
        if(!err) {
            res.send({msg: "Values deleted"});
        }
        else {
            console.error('Error deleting todo', err);
            res.status(500).json({
                msg: 'Error deleting todo. '+err.message
            });
        }
    });
}

exports.toggleCompleted = (req, res) => {
    const id = req.params.id;

    mySqlConnection.query(
        "UPDATE todo SET is_completed=? WHERE id=?", 
        [ req.body.isCompleted, id ],
        (err, result) => {
        if(!err) {
            res.send({msg: "Toggled completion status successfully"});
        }
        else {
            console.error("Error in updating complete status", err);
            res.status(500).json({
                msg: 'Error updating complete status. '+err.message
            });
        }
    });

}