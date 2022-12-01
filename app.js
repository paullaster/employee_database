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


app.get ( '/dept/search/all', (req, res) => {
    db.query ( `SELECT * FROM ${process.env.DATABASE}.department`, ( err, rows) => {
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
            message: 'Retrieved all department record successfully',
            data: rows,
        });
    });
});

app.get ( '/dept/search/', (req, res) => {
    const {deptId} = req.body;
    db.query ( `SELECT deptName, deptManager FROM ${process.env.DATABASE}.department
    WHERE deptId = '${deptId}'`, ( err, rows) => {
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
            message: 'Retrieved department record successfully',
            data: rows,
        });
    });
});


app.get ( '/dept/search/all', (req, res) => {
    db.query ( `SELECT * FROM ${process.env.DATABASE}.department`, ( err, rows) => {
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
            message: 'Retrieved all department record successfully',
            data: rows,
        });
    });
});

app.get ( '/staff/search/', (req, res) => {
    const {staffId} = req.body;
    db.query ( `SELECT fname, lname, title, supervisor, salary, startDate,
      FROM ${process.env.DATABASE}.department
    WHERE staffId = '${staffId}'`, ( err, rows) => {
        if (err) {
            res
            .status (500)
            .json ( {
                status: 'error',
                error: err.message,
            });
            return;
        };
        department =db.query ( `SELECT deptName FROM ${process.env.DATABASE}.department
            WHERE deptId = '${rows[0].deptName}'`)
    
        res
        .status (200)
        .json ( {
            status: 'success',
            message: 'Retrieved staff record successfully',
            data: rows,
            dept: department,
        });
    });
});



app.post ( '/dept/insert', (req, res) => {
    const dataToInsert = { ...req.body};
    db.query (`INSERT INTO ${process.env.DATABASE}.department SET?`, dataToInsert, (err, rows) => {
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
            message: 'Inserted department record',
            data: rows,
        });
    });
} );


app.post ( '/staff/insert', (req, res) => {
    const dataToInsert = { ...req.body};
    db.query (`INSERT INTO ${process.env.DATABASE}.staff SET?`, dataToInsert, (err, rows) => {
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
            message: 'Inserted department record',
            data: rows,
        });
    });
} );

app.put ( '/dept/update', (req, res) => {
    const {deptName, deptManager} = req.body;
    db.query (`UPDATE ${process.env.DATABASE}.department SET deptName='${deptName}',
    deptManager = '${deptManager}' WHERE deptId='${req.body.deptId}'`, 
    (err, rows) => {
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
            message: 'department record updated successfully',
            data: rows,
        });
    });
} );

app.put ( '/staff/update', (req, res) => {
    const {supervisor, salary, deptId, staffId, title } = req.body;
    db.query (`UPDATE ${process.env.DATABASE}.staff SET 
    supervisor = '${supervisor}', salary ='${salary}',
    deptId = '${deptId}', title ='${title}' WHERE staffId ='${staffId}'`, 
    (err, rows) => {
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
            message: 'staff record updated successfully',
            data: rows,
        });
    });
} );



app.listen ( process.env.PORT, () => {
    console.log ( 'listening on port ' + process.env.PORT );
});