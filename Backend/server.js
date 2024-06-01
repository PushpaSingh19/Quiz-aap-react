const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const pool = require("./db");

app.post("/login", (req, res) => {
  const { email, password, userType } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
  pool.query(query, [email, password], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }

    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Login successful." });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }
  });
});

app.get("/", async (request, response) => {
  const client = await pool.connect();
  const subject_id = request.query.subject_id;
  try {
    const res = await client.query(
      `select * from quiz_data where subject_id = $1;`,
      [subject_id]
    );
    response.json({ data: res.rows, message: "Data found" });
  } catch (e) {
    response.json({
      error: e,
    });
  } finally {
    console.log("hey");
    client.release();
  }
});

// app.get("/correctOption", async (request, response) => {
//   const client = await pool.connect();
//   const correct_option = req.body.correct_option;
//   const subject_id = req.body.subject_id;

//   try {
//     const res = await client.query(
//       `select correct_option from quiz_data where subject_id = $1`,
//       [subject_id, correct_option]
//     );
//     response.json({ data: res.rows, message: "Correct Option" });
//   } catch (e) {
//     response.json({
//       error: e,
//     });
//   } finally {
//     console.log("Quiz");
//     client.release();
//   }
// });

// app.post("/subject", async (request, response) => {
//   const client = await pool.connect();
//   const subject_id = request.body.subject_id;

//   try {
//     const res = await client.query(
//       `select * from quiz_data where subject_id = $1`,
//       [subject_id]
//     );
//     response.json({ data: res.rows, message: "Data found" });
//   } catch (e) {
//     response.json({
//       error: e,
//     });
//   } finally {
//     console.log("Quiz");
//     client.release();
//   }
// });

app.post("/addData", async (req, res) => {
  const client = await pool.connect();

  const subject_id = req.body.subject_id;

  const question = req.body.question;
  const option1 = req.body.option1;
  const option2 = req.body.option2;
  const option3 = req.body.option3;
  const option4 = req.body.option4;
  const correct_option = req.body.correct_option;

  try {
    const result = await client.query(
      `INSERT INTO quiz_data (subject_id, question, option1, option2, option3, option4, correct_option)

        VALUES ($1, $2, $3, $4, $5, $6,$7)`,
      [subject_id, question, option1, option2, option3, option4, correct_option]
    );
    res.json({
      message: "Data added successfully",
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  } finally {
    console.log("hey");
    client.release();
  }
});
app.put("/updateData", async (req, res) => {
  const client = await pool.connect();
  const {
    ques_no,
    subject_id,
    question,
    option1,
    option2,
    option3,
    option4,
    correct_option,
  } = req.body;

  try {
    const result = await client.query(
      `UPDATE quiz_data SET subject_id = $1, question = $2, option1 = $3, option2 = $4, option3 = $5, option4 = $6, correct_option = $7 WHERE ques_no = $8`,
      [
        subject_id,
        question,
        option1,
        option2,
        option3,
        option4,
        correct_option,
        ques_no,
      ]
    );
    res.status(200).json({ message: "Question updated successfully" });
  } catch (e) {
    console.error("Error updating question:", e);
    res
      .status(500)
      .json({ error: "An error occurred while updating question." });
  } finally {
    client.release();
    console.log("Question updated");
  }
});

// app.post("/userInfo", async (req, res) => {
//   const client = await pool.connect();

//   const first_name = req.body.first_name;
//   const last_name = req.body.last_name;
//   const email_id = req.body.email_id;
//   const otp = req.body.otp;
//   try {
//     const checkEmailQuery = `SELECT * FROM signup_info WHERE email_id = $1`;
//     const existingEmail = await client.query(checkEmailQuery, [email_id]);
//     if (existingEmail.rowCount > 0) {
//       return res.status(400).json("Email already in use");
//     }

//     const result = await client.query(
//       `INSERT INTO signup_info (first_name, last_name, email_id,otp)
//         VALUES ($1, $2, $3, $4)`,
//       [first_name, last_name, email_id, otp]
//     );
//   } finally {
//     client.release();
//   }
// });

// app.post("/verifyOTP", async (req, res) => {
//   const { otp } = req.body;
//   const email = req.session.email;

//   if (!email || !otp) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Email and OTP are required." });
//   }

//   try {
//     const result = await pool.query(
//       "SELECT * FROM signup_info WHERE email_id = $1",
//       [email]
//     );
//     if (result.rowCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found." });
//     }

//     const userOTP = result.rows[0].otp;
//     if (userOTP !== otp) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid OTP. Please try again." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "OTP verified successfully." });
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// });

// app.put("/userInfo", async (req, res) => {
//   const client = await pool.connect();

//   const password = req.body.password;

//   try {
//     const result = await client.query(
//       `UPDATE signup_info SET password = $1 WHERE password = $2`,
//       [password]
//     );
//     res.json({
//       message: "Password updated successfully",
//     });
//   } catch (e) {
//     res.json({
//       error: e.message,
//     });
//   } finally {
//     client.release();
//   }
// });

app.post("/insertData", async (req, res) => {
  const client = await pool.connect();
  const username = req.body.username;
  const email = req.body.email;
  const otp = req.body.otp;
  try {
    const result = await client.query(
      `INSERT INTO users (username, email, otp)
      VALUES ($1, $2, $3)`,
      [username, email, otp]
    );
    res.json({
      message: "Data added successfully",
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  } finally {
    console.log("hey");
    client.release();
  }
});

app.post("/verifyOTP", async (req, res) => {
  const { username, email, otp } = req.body;

  const query =
    "SELECT * FROM users WHERE username = $1 AND email = $2 AND otp = $3";
  pool.query(query, [username, email, otp], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }

    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "OTP verified successfully." });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid OTP. Please try again." });
    }
  });
});

app.post("/verifynewotp", async (req, res) => {
  const { email, otp } = req.body;

  const query = "SELECT * FROM users WHERE email = $1 AND otp = $2";
  pool.query(query, [email, otp], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }

    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "OTP verified successfully." });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid OTP. Please try again." });
    }
  });
});

app.post("/checkMail", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(`select * from users where email = $1`, [
      email,
    ]);
    res.json({ exists: result.rowCount > 0 });
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "An error occured." });
  }
});

app.put("/updatePassword", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET password = $1 WHERE email = $2`,
      [password, email]
    );
    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating password." });
  } finally {
    console.log("Password Updated");
  }
});
app.put("/updateotp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET otp = $1 WHERE email = $2`,
      [otp, email]
    );
    res.json({
      message: "otp updated successfully",
    });
  } catch (error) {
    console.error("Error updating otp:", error);
    res.status(500).json({ error: "An error occurred while updating otp." });
  } finally {
    console.log("otp Updated");
  }
});
// app.post("/subject", async (request, response) => {
//   const client = await pool.connect();
//   const subject_id = parseInt(request.body.subject_id);
//   console.log(parseInt(request.body.subject_id), "************");
//   try {
//     const res = await client.query(
//       `select * from quiz_data where subject_id = $1`,
//       [subject_id]
//     );
//     response.json({ data: res.rows, message: "Data found" });
//   } catch (e) {
//     response.json({
//       error: e,
//     });
//   } finally {
//     console.log("Quiz===");
//     client.release();
//   }
// });
app.post("/subject", async (request, response) => {
  const client = await pool.connect();
  const subject_id = parseInt(request.body.subject_id);

  try {
    const res = await client.query(
      `SELECT q.*, s.* 
       FROM quiz_data AS q
       JOIN subjects As s ON q.subject_id = s.subject_id
       WHERE q.subject_id = $1`,
      [subject_id]
    );
    response.json({ data: res.rows, message: "Data found" });
  } catch (e) {
    response.json({
      error: e,
    });
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running on this port ${port}`);
});
