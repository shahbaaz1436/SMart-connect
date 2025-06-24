const mysql = require('mysql');

// Connect to database
const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'smdb'
});

conn.connect(err => {
    if (err) {
        console.error('Connection failed:', err);
        return;
    }
    console.log('Connected to database.');

    // Ensure userinfo table exists
    const userinfoSQL = `
        CREATE TABLE IF NOT EXISTS userinfo (
            full_name CHAR(25),
            phone VARCHAR(25),
            Email VARCHAR(25) PRIMARY KEY,
            joindate DATE,
            course VARCHAR(25),
            password VARCHAR(255),
            confirm VARCHAR(255)
        )
    `;

    conn.query(userinfoSQL, (err) => {
        if (err) {
            console.error('Failed to create userinfo table:', err);
            return;
        }
        console.log('userinfo table ensured.');

        // Now create attendance table with matching type & collation
        const attendanceSQL = `
            CREATE TABLE IF NOT EXISTS attendance (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_email VARCHAR(25) COLLATE utf8mb4_general_ci,
                date DATE,
                status ENUM('Present', 'Absent'),
                UNIQUE KEY unique_attendance (student_email, date),
                CONSTRAINT fk_student FOREIGN KEY (student_email)
                  REFERENCES userinfo(Email)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE
            )
        `;

        conn.query(attendanceSQL, (err) => {
            if (err) {
                console.error('Failed to create attendance table:', err);
            } else {
                console.log('attendance table created successfully');
            }
            conn.end();
        });
    });
});
