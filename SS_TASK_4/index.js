const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

/* =========================
   GET ALL USERS
========================= */
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err
            });
        }

        res.json({
            success: true,
            count: results.length,
            data: results
        });
    });
});

/* =========================
   CREATE USER
========================= */
app.post("/users", (req, res) => {
    const { name, email, age } = req.body;

    // VALIDATION
    if (!name || !email || !age) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    if (age < 1) {
        return res.status(400).json({
            success: false,
            message: "Age must be positive"
        });
    }

    const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

    db.query(sql, [name, email, age], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Insert failed",
                error: err
            });
        }

        res.status(201).json({
            success: true,
            data: {
                id: result.insertId,
                name,
                email,
                age
            }
        });
    });
});

/* =========================
   UPDATE USER
========================= */
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body;

    if (email && !email.includes("@")) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    const sql = "UPDATE users SET name=?, email=?, age=? WHERE id=?";

    db.query(sql, [name, email, age, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Update failed",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User updated"
        });
    });
});

/* =========================
   DELETE USER
========================= */
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Delete failed",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User deleted"
        });
    });
});

/* =========================
   SERVER
========================= */
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});