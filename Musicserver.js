// Musicserver.js
const express = require('express');
const cors = require('cors');
const bodyp = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const ADMIN_PASSWORD = '12345';

const app = express();
app.use(cors());
app.use(bodyp.json());

// MySQL connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smdb'
});

// Nodemailer
const transportobj = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'b23ai121@kitsw.ac.in',
        pass: 'rgyn ynjp vmwj vkpa'
    }
});

// Admin login
app.post("/admin-login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) return res.send("Admin login successful");
    return res.status(401).send("Incorrect password");
});

app.post("/admin-forgot-password", (req, res) => {
    res.send("The default admin password is 12345. Please contact developer to change it securely.");
});

// Register student
app.post("/register", async (req, res) => {
    const { full_name, phone, email, joindate, course, password, confirm } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO userinfo(full_name, phone, Email, joindate, course, password, confirm)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        conn.query(sql, [full_name, phone, email, joindate, course, hashedPassword, confirm], (err) => {
            if (err) return res.status(500).send('Error occurred while registering');
            transportobj.sendMail({
                from: "b23ai121@kitsw.ac.in",
                to: email,
                subject: "Registration Successful",
                text: `Hey ${full_name}, your SMDB registration was successful!`
            });
            return res.send("Registration successful");
        });
    } catch (error) {
        return res.status(500).send('Server error during registration');
    }
});

// Student login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    conn.query("SELECT * FROM userinfo WHERE Email = ?", [email], async (err, results) => {
        if (err) return res.status(500).send("Server error");
        if (results.length === 0) return res.status(401).send("Invalid email or password");

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send("Invalid email or password");

        transportobj.sendMail({
            from: "b23ai121@kitsw.ac.in",
            to: email,
            subject: "Login Detected",
            text: `Hey ${user.full_name}, a new login was detected in your SMDB account.`
        });

        return res.json({
            message: "Login successful!",
            user: {
                name: user.full_name,
                email: user.Email,
                phone: user.phone,
                course: user.course,
                joindate: user.joindate
            }
        });
    });
});

app.get("/students", (req, res) => {
    conn.query("SELECT full_name, Email, phone, course FROM userinfo", (err, results) => {
        if (err) return res.status(500).send("Error fetching students");
        res.json(results);
    });
});

app.post("/mark-attendance", (req, res) => {
    const { student_email, date, status } = req.body;
    const sql = `INSERT INTO attendance(student_email, date, status)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE status = ?`;
    conn.query(sql, [student_email, date, status, status], (err) => {
        if (err) return res.status(500).send("Failed to mark attendance");
        res.send("Attendance marked");
    });
});

app.get("/attendance-stats", (req, res) => {
    const sql = `
      SELECT 
        student_email,
        COUNT(*) as total_days,
        SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present_days,
        ROUND(SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) / COUNT(*) * 100) as percentage
      FROM attendance
      GROUP BY student_email
    `;
    conn.query(sql, (err, results) => {
        if (err) return res.status(500).send("Error fetching attendance stats");
        const stats = {};
        results.forEach(row => {
            stats[row.student_email] = {
                total: row.total_days,
                present: row.present_days,
                percentage: row.percentage
            };
        });
        res.json(stats);
    });
});

app.get("/student-attendance", (req, res) => {
    const { email } = req.query;
    const sql = `
      SELECT 
        COUNT(*) as total_days,
        SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present_days,
        ROUND(SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) / COUNT(*) * 100) as percentage
      FROM attendance
      WHERE student_email = ?
    `;
    conn.query(sql, [email], (err, results) => {
        if (err) return res.status(500).send("Error fetching student attendance");
        res.json({
            total: results[0].total_days,
            present: results[0].present_days,
            percentage: results[0].percentage
        });
    });
});

app.listen(4000, () => {
    console.log('Application running on http://localhost:4000/');
});
