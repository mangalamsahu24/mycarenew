const express = require('express');
const app = express();
const mysql = require('mysql');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const port = 3000;

app.use(cors()); // Enable CORS

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Middleware for parsing JSON in requests
app.use(bodyParser.json());

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const { originalname, filename } = req.file;

    // Insert file details into the database
    const query = 'INSERT INTO files (originalname, filename) VALUES (?, ?)';
    db.query(query, [originalname, filename], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json({ success: true, message: 'File uploaded successfully' });
    });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Serve files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));
// File list endpoint
app.get('/files', (req, res) => {
  // Retrieve list of files from the database
  const query = 'SELECT * FROM files';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const userQuery = 'SELECT * FROM login WHERE email = ?';
//     const user = await db.query(userQuery, [email]);

//     if (user.length === 0) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Validate the password
//     if (!user[0].password) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     const matched = await bcrypt.compare(password, user[0].password);
//     if (!matched) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     // If authentication succeeds, send success response without token
//     res.json({ success: true, message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });



// //Register user
// app.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   // Input validation
//   if (!name || !email || !password) {
//     return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
//   }
//   // Additional input validation logic...

//   try {
//     // Check if the email already exists
//     const checkQuery = 'SELECT * FROM login WHERE email = ?';
//     const existingUser = await db.query(checkQuery, [email]);

//     if (existingUser.length > 0) {
//       return res.status(400).json({ success: false, message: 'Email already registered' });
//     }

//     // Proceed with registration
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const insertQuery = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
//     await db.query(insertQuery, [name, email, hashedPassword]);

//     res.json({ success: true, message: 'Registration successful' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ success: false, message: 'Registration failed' });
//   }
// });

const crypto = require('crypto');

// Function to hash a password using SHA-256
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password
  try {
    // Check if the email already exists
    const existingUser = await db.query('SELECT * FROM login WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Proceed with registration
    const insertQuery = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
    await db.query(insertQuery, [name, email, password]);

    res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Perform a MySQL query to check username and password
  const query = 'SELECT * FROM login WHERE  email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      // Successful login
      res.json({ success: true, message: 'Login successful' });
    } else {
      // Invalid credentials
      res.json({ success: false, message: 'Invalid email or password' });
    }
  });
});


app.post('/appointments', (req, res) => {
  const formData = req.body;
  // const userEmail = req.session.email; 
  // Save the appointment data to the database
  // Replace this with your actual database logic
  db.query('INSERT INTO appointments (firstName, lastName, dob, phone, doctorType, appointmentType, preferredDateTime) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [formData.firstName, formData.lastName, formData.dob, formData.phone, formData.doctorType, formData.appointmentType, formData.preferredDateTime], 
    (err, result) => {
      if (err) {
        console.error('Error booking appointment:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
      res.json({ success: true, message: 'Appointment booked successfully' });
    });
});

app.use(bodyParser.urlencoded({ extended: true }));

// Route to fetch appointments
app.get('/appointments', (req, res) => {
  // Fetch appointments from the database
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});
// Endpoint to get profile data
app.get('/profile', (req, res) => {
  const sql = 'SELECT * FROM profile';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching profile data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
});

// Endpoint to save profile data
app.post('/profile', (req, res) => {
  const userProfile = req.body;
  /* The line `const sql = 'INSERT INTO profile (userProfile, column2, ...) VALUES (?, ?, ...)';` is
  defining a SQL query string that is used to insert data into a table named `profile`. 
  userProfile.first_name,userProfile.last_name,userProfile.mobile_number,userProfile.address_line1,userProfile.area,userProfile.email,userProfile.postcode,userProfile.state,userProfile.doctor,userProfile.disease*/
  const sql = 'INSERT INTO profile (first_name, last_name, mobile_number, address_line1, area, email, postcode, state, doctor, disease) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [userProfile.first_name, userProfile.last_name, userProfile.mobile_number, userProfile.address_line1, userProfile.area, userProfile.email, userProfile.postcode, userProfile.state, userProfile.doctor, userProfile.disease], (err, result) => {
    if (err) {
      console.error('Error saving profile:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Profile saved successfully' });
    }
  });
});

// Endpoint to update profile data
app.put('/profile', (req, res) => {
  const userProfile = req.body;
  const sql = 'UPDATE profile SET ? WHERE email = ?';
  db.query(sql, [userProfile, userProfile.email], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Profile updated successfully' });
    }
  });
});

// Endpoint to delete profile data
app.delete('/profile', (req, res) => {
  const sql = 'DELETE FROM profile';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error deleting profile:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Profile deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// 