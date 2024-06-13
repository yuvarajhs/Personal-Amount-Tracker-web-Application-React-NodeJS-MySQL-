const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Yuvaraj@123',
    database:'users'
})

app.get('/', (req, res)=>{
    return res.json("from backend side");
})

app.get('/getUser', (req,res)=>{
    const sql = "select * from user_details";
    con.query(sql, (err,data)=>{
        if(err)
            return res.json(err);
        else
            return res.json(data)
    })
})

app.get('/getCredits', (req,res)=>{
    const sql = "select * from Credits";
    con.query(sql, (err,data)=>{
        if(err)
            return res.json(err);
        else
            return res.json(data)
    })
})
app.get('/getDebits', (req,res)=>{
    const sql = "select * from debits";
    con.query(sql, (err,data)=>{
        if(err)
            return res.json(err);
        else
            return res.json(data)
    })
})

app.get('/totalCredits', (req,res)=>{
    const sql = "select sum(credit) as totalCredits from Credits";
    con.query(sql, (err,data)=>{
        if(err)
            return res.json(err);
        else
            return res.json(data)
    })
})

app.get('/totalDebits', (req,res)=>{
    const sql = "select sum(debit) as totalDebits from debits";
    con.query(sql, (err,data)=>{
        if(err)
            return res.json(err);
        else
            return res.json(data)
    })
})





app.post('/register', (req,res)=>{
    const values = [req.body.name, req.body.email, req.body.password];
    con.query('insert into user_details(name,email,password) values(?,?,?)' , values, (err,result)=>{
        if(err){
            res.json(err)
        }
        else
            res.json(result)
    })
} )

app.post('/login', (req,res)=>{
    const values = [ req.body.email, req.body.password];
    con.query('select * from user_details where email=? and password=?' , values, (err,result)=>{
        if(err){
            res.send({message:"Error"})
        }
        else
            {
                if(result.length>0)
                    res.send(result)
                else
                    res.send({message:"Enter a Correct Email or Password"})
            }
    })
} )

app.post('/addCredits', (req,res)=>{
    const values = [req.body.name, req.body.date, req.body.credit];
    con.query('insert into credits(name,date,credit) values(?,?,?)' , values, (err,result)=>{
        if(err){
            res.json(err)
        }
        else
            res.json(result)
    })
} )

app.post('/addDebits', (req,res)=>{
    const values = [req.body.name, req.body.date, req.body.debit];
    con.query('insert into debits(name,date,debit) values(?,?,?)' , values, (err,result)=>{
        if(err){
            res.json(err)
        }
        else
            res.json(result)
    })
} )

app.put('/updateEmail', (req,res)=>{
    const values = [req.body.email];
    con.query("update user_details set email=? " , values, (err,result)=>{
        if(err){
            res.json(err)
        }
        else
            res.json(result)
    })
} )

app.put('/updateName', (req,res)=>{
    const values = [req.body.name];
    con.query("update user_details set Name=? " , values, (err,result)=>{
        if(err){
            res.json(err)
        }
        else
            res.json(result)
    })
} )

app.put('/updatePassword', (req,res)=>{
    const values = [req.body.password];
    con.query("update user_details set password=? " , values, (err,result)=>{
        if(err){
            res.json(err)
        }
        else
            res.json(result)
    })
} )

app.put('/updateDebitAlert', (req,res)=>{
    const values = [req.body.amount];
    con.query("update debitAlert set amount = ? " , values, (err,result)=>{
        if(err){
            res.json(err)
        }
        else
            res.json(result)
    })
} )

app.get('/getDebitAlert', (req,res)=>{
    con.query("select * from debitAlert" ,(err,result)=>{
        if(err){
            res.json(err)
        }
        else
            res.json(result)
    })
} )

app.post('/createCategory',(req,res)=>{
    con.query('insert into category(category_name) values(?)',[req.body.name]),(err,result)=>{
        if(err)
            res.json(err)
        else
            res.json(result)
    }
})
app.get('/getCategory', (req,res)=>{
    con.query("select * from category" ,(err,result)=>{
        if(err){
            res.json(err)
        }
        else
            res.json(result)
    })
} )


app.listen(8081)




// app.post("/login", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     con.query("SELECT * FROM user_details WHERE username = ? AND password = ?", [email, password], 
//         (err, result) => {
//             if(err){
//                 req.setEncoding({err: err});
//             }else{
//                 if(result.length > 0){
//                     res.send(result);
//                 }else{
//                     res.send({message: "WRONG USERNAME OR PASSWORD!"})
//                 }
//             }
//         }
//     )
// })












// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();

// app.use(express.json());
// app.use(cors());

// const con = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "",
//     database: "register"
// })

// app.post('/register', (req, res) => {
//     const email = req.body.email;
//     const username = req.body.username;
//     const password = req.body.password;

//     con.query("INSERT INTO REGISTER_DETAILS (email, username, password) VALUES (?, ?, ?)", [email, username, password], 
//         (err, result) => {
//             if(result){
//                 res.send(result);
//             }else{
//                 res.send({message: "ENTER CORRECT ASKED DETAILS!"})
//             }
//         }
//     )
// })

// app.post("/login", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     con.query("SELECT * FROM REGISTER_DETAILS WHERE username = ? AND password = ?", [username, password], 
//         (err, result) => {
//             if(err){
//                 req.setEncoding({err: err});
//             }else{
//                 if(result.length > 0){
//                     res.send(result);
//                 }else{
//                     res.send({message: "WRONG USERNAME OR PASSWORD!"})
//                 }
//             }
//         }
//     )
// })

// app.listen(8081, () => {
//     console.log("running backend server");
// })







// const express = require('express');
// const axios = require('axios');
// const { OAuth2Client } = require('google-auth-library');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.json());

// const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
// const CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
// const REDIRECT_URI = 'YOUR_REDIRECT_URI';

// const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// // Endpoint to generate Google OAuth URL
// app.get('/auth/google', (req, res) => {
//     const url = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: ['https://www.googleapis.com/auth/gmail.readonly']
//     });
//     res.redirect(url);
// });

// // Endpoint to handle Google OAuth callback
// app.get('/auth/google/callback', async (req, res) => {
//     const { code } = req.query;
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);
//     res.json(tokens);
// });

// // Endpoint to fetch bank transaction emails
// app.get('/emails', async (req, res) => {
//     const { accessToken } = req.query;
//     oAuth2Client.setCredentials({ access_token: accessToken });

//     try {
//         const response = await axios.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             },
//             params: {
//                 q: 'from:yourbank.com subject:transaction', // Adjust the query to fit your needs
//             }
//         });
//         const messages = response.data.messages;

//         const emailDetailsPromises = messages.map(message => {
//             return axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             });
//         });

//         const emails = await Promise.all(emailDetailsPromises);
//         const emailData = emails.map(email => email.data);

//         res.json(emailData);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
