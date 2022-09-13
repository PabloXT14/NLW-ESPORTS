import express from "express";
const app = express();
app.get("/", (request, response) => {
    return response.json({ id: 1, user_name: 'Pablo Freitas' });
});
app.listen(3333, () => console.log("Server is running!"));
