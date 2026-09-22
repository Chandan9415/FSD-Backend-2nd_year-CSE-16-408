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

app.get("/msg", (req, res) => {
    res.status(200).json({
        message: "Welcome user"
    });
});

app.get("/user", (req, res) => {
    res.status(200).json({
        message: "Data received",
        userData
    });
});

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

app.put("/edit/:id", (req, res) => {
    const id = req.params.id;

    const index = userData.findIndex((u) => u.id == id);

    const { name, email } = req.body;

    if (index == -1) {
        return res.status(404).json({
            message: "User Not Found In Database"
        });
    }

    userData[index] = {
        id: userData[index].id,
        name,
        email
    };

    res.status(200).json({
        message: "User Updated Successfully",
        user: userData[index]
    });
});

app.listen(4001, () => {
    console.log("Server is running on port number 4001");
});