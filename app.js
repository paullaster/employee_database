import express from 'express';
import * as dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config ();
const app = express ();

app.use ( express.json ());
app.use ( express.urlencoded ( {extended: true} ));

//DB connection:
const db = mysql.createConnection ( {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//TEST connection
db.connect ( (err) => {
    if (err) {
        throw err;
    };
    console.log ( 'database connection established');
});

app.post ( '/insert', (req, res) => {
    const dataToInsert = { ...req.body};
    db.query ('INSERT INTO SET?', dataToInsert, (err, rows) => {
        if (err) {
            res
            .status (500)
            .json ( {
                status: 'error',
                error: err.message,
            });
            return;
        };
        res
        .status (200)
        .json ( {
            status: 'success',
            message: 'Inserted employee record',
        });
    });
} );

app.listen ( process.env.PORT, () => {
    console.log ( 'listening on port ' + process.env.PORT );
});