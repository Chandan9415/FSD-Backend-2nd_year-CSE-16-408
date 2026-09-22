import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const userData = [
    {
        id: 101,
        name: "Abc",
        email: "cm@abes.call.in"
    }
];

// GET welcome message
app.get("/msg", (req, res) => {
    res.status(200).json({
        message: "Welcome user"
    });
});

// GET all users
app.get("/user", (req, res) => {
    res.status(200).json({
        message: "Data received",
        userData
    });
});

// POST multiple users
app.post("/user", (req, res) => {
    const users = req.body;

    if (!Array.isArray(users)) {
        return res.status(400).json({
            message: "Request body must be an array"
        });
    }

    for (const user of users) {
        userData.push(user);
    }

    res.status(201).json({
        message: "Users Created Successfully",
        users
    });
});

// GET single user
app.get("/user/:id", (req, res) => {
    const id = req.params.id;

    const user = userData.find((u) => u.id == id);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    res.status(200).json({
        user
    });
});

// POST one user
app.post("/create", (req, res) => {
    const { id, name, email } = req.body;

    const newUser = {
        id,
        name,
        email
    };

    userData.push(newUser);

    res.status(201).json({
        message: "User Created Successfully",
        newUser
    });
});

// PUT edit user
app.put("/edit/:id", (req, res) => {
    const id = req.params.id;

    const index = userData.findIndex((u) => u.id == id);

    if (index == -1) {
        return res.status(404).json({
            message: "User Not Found In Database"
        });
    }

    const { name, email } = req.body;

    if (name !== undefined) {
        userData[index].name = name;
    }

    if (email !== undefined) {
        userData[index].email = email;
    }

    res.status(200).json({
        message: "User Updated Successfully",
        user: userData[index]
    });
});

// PATCH user
app.patch("/user/:id", (req, res) => {
    const id = req.params.id;

    const index = userData.findIndex((u) => u.id == id);

    if (index == -1) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    const { name, email } = req.body;

    if (name !== undefined) {
        userData[index].name = name;
    }

    if (email !== undefined) {
        userData[index].email = email;
    }

    res.status(200).json({
        message: "User Updated Successfully",
        user: userData[index]
    });
});

// DELETE user
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    const index = userData.findIndex((u) => u.id == id);

    if (index == -1) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    const deletedUser = userData.splice(index, 1);

    res.status(200).json({
        message: "User Deleted Successfully",
        user: deletedUser[0]
    });
});

app.listen(4001, () => {
    console.log("Server is running on port number 4001");
});