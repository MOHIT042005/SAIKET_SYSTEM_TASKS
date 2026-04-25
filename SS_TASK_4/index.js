const express = require("express");
const app = express();

app.use(express.json());

// In-memory database
let users = [];

// GET all users
app.get("/users", (req, res) => {
    res.json({
        success: true,
        count: users.length,
        data: users
    });
});

// POST create user
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

    const newUser = {
        id: users.length + 1,
        name,
        email,
        age
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        data: newUser
    });
});

// PUT update user
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const { name, email, age } = req.body;

    if (email && !email.includes("@")) {
        return res.status(400).json({
            success: false,
            message: "Invalid email"
        });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    res.json({
        success: true,
        data: user
    });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const exists = users.some(u => u.id === id);

    if (!exists) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    users = users.filter(u => u.id !== id);

    res.json({
        success: true,
        message: "User deleted"
    });
});

// SERVER
app.listen(3003, () => {
    console.log("Server running on http://localhost:3003");
});