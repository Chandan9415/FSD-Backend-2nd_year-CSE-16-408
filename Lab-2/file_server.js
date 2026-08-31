import fs from "node:fs/promises";
const filePath = "data.txt" ;
async function create_file(content) {
    await fs.writeFile("data.txt", content, "utf8");
}
async function read_file() {
    try {
        const data = await fs.readFile(filePath , "utf8") ;
        console.log("File content :\n",data) ;
    } catch (error) {
        console.error("Error reading file:", error);
    }
}
async function update_file(content) {
    await fs.appendFile("data.txt", content, "utf8");
}

async function delete_file() {
    await fs.unlink("data.txt");
}


await create_file("Hello\n");
await update_file("My name is Chandan\n");
await update_file("Also my friend name is chandan " ) ;
await read_file() ;