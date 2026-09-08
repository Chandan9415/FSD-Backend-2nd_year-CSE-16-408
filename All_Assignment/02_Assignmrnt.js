import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    const userData = JSON.parse(
        fs.readFileSync("./data.json", "utf-8")
    );

    if (url == "/users" && method == "GET") {
        res.end(JSON.stringify(userData));
    }

    else if (url.startsWith("/users/") && method == "GET") {
        const id = url.split("/")[2];

        const user = userData.find((u) => u.id == id);

        if (!user) {
            return res.end("User Not Found");
        }

        res.end(JSON.stringify(user));
    }

    else if (url == "/create" && method == "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const newData = JSON.parse(body);

            const newUser = {
                id: newData.id,
                name: newData.name,
                email: newData.email
            };

            userData.push(newUser);

            fs.writeFileSync(
                "./data.json",
                JSON.stringify(userData, null, 2)
            );

            res.end("User Created Successfully");
        });
    }

    else if (url.startsWith("/users/") && method == "PUT") {
        const id = url.split("/")[2];

        const index = userData.findIndex((u) => u.id == id);

        if (index == -1) {
            return res.end("User Not Found");
        }

        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const updateData = JSON.parse(body);

            userData[index].name = updateData.name;
            userData[index].email = updateData.email;

            fs.writeFileSync(
                "./data.json",
                JSON.stringify(userData, null, 2)
            );

            res.end("User Updated Successfully");
        });
    }
    else if (url.startsWith("/users/") && method == "DELETE") {
        const id = url.split("/")[2];

        const index = userData.findIndex((u) => u.id == id);

        if (index == -1) {
            return res.end("User Not Found");
        }

        userData.splice(index, 1);

        fs.writeFileSync(
            "./data.json",
            JSON.stringify(userData, null, 2)
        );
        res.end("User Deleted Successfully");
    }else {
        res.statusCode = 404;
        res.end("Route Not Found");
    }
});
server.listen(3005, () => {
    console.log("Server is running on port number 3005");
});